import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

import lang, { getEnumSelectValues, getEnumTitleValue, sprintf } from "lang";
import { Confirm, GoodTable, type IGoodTableField, type IGoodTableToolbarAction } from "components";
import type { ISendUserNotificationProps } from "components/SendUserNotification";
import SendUserNotification from "components/SendUserNotification";

import { taxes, webApiResultData } from "api/data";

import { useAppSelector, useLoader } from "api/hooks/redux";
import { TaxeStatusEnum } from "api/enums/TaxeStatusEnum";
import type { ITaxeDto } from "api/interfaces/user/ITaxeDto";
import { MessageStatusEnum } from "api/enums/MessageStatusEnum";
import { useNotifier } from "api/hooks/useNotifier";
import { checkFlagIncludes, getValuesByFlag } from "api/common/enumHelper";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";

import type { IConfirmProps } from "components/Confirm";

import { SortOrderEnum } from "api/interfaces/components/GoodTable";

import TaxesEdit from "./Edit";
import TaxesAdd from "./Add";

interface IProps {
    userId?: number;
}

interface ISendUserNotificationPropsWithStatus extends ISendUserNotificationProps {
    status: MessageStatusEnum;
}
export default function Taxes({ userId }: IProps) {
    const langPage = lang.pages.taxes;
    const [notificationData, setNotificationData] = useState<null | ISendUserNotificationPropsWithStatus>(null);
    const { setIsLoading } = useLoader();
    const { showError, showSuccess } = useNotifier();
    const [tableValue, setTableValue] = useState<ITaxeDto[]>([]);
    const currentUserParams = useAppSelector((s) => s.user.user?.role?.params);
    const currentUserIsAdmin = useAppSelector((s) => s.user.tg?.isAdmin);
    const [editData, setEditData] = useState<ITaxeDto | null>(null);
    const [confirmData, setConfirmData] = useState<IConfirmProps | null>(null);
    const [updateTableKey, setUpdateTableKey] = useState(0);
    useEffect(() => {
        loadData();
    }, [currentUserParams, userId]);
    const tableFields = useMemo<IGoodTableField[]>(() => {
        const newFields: IGoodTableField[] = [
            { name: "id", title: langPage.fields.id, width: "30px" },
            { name: "userName", title: langPage.fields.uid, wrap: true, hidden: !!userId },
            { name: "money", title: langPage.fields.value },
            { name: "title", title: langPage.fields.title, wrap: true },
            {
                name: "taxesTypeName",
                title: langPage.fields.taxesTypeId,
            },

            {
                name: "status",
                title: langPage.fields.status,
                format: "list",
                formatProps: getEnumSelectValues(TaxeStatusEnum, "TaxeStatusEnum"),
            },
            { name: "endDate", title: langPage.fields.endDate, format: "date" },
        ];
        if (currentUserIsAdmin) {
            newFields.push({ name: "nickname", title: "", hidden: true });
        }
        return newFields;
    }, [userId, currentUserIsAdmin]);
    const tableActions = useMemo<IGoodTableToolbarAction<ITaxeDto>[]>(() => {
        const newActions: IGoodTableToolbarAction<ITaxeDto>[] = [];
        if (currentUserParams?.taxes) {
            if (checkFlagIncludes(currentUserParams.taxes, RolePermissionFlag.View)) {
                newActions.push({
                    name: "refresh",
                    icon: "refresh",
                    onClick: loadData,
                });
            }
            if (checkFlagIncludes(currentUserParams.taxes, RolePermissionFlag.Add)) {
                newActions.push({
                    name: "add",
                    icon: "add",
                    onClick: toAdd,
                });
            }
            if (checkFlagIncludes(currentUserParams.taxes, RolePermissionFlag.Edit)) {
                newActions.push({
                    name: "edit",
                    icon: "edit",
                    onClick: (items: ITaxeDto[]) => toEdit(items[0]),
                    disable: (items: ITaxeDto[]) => items.length !== 1,
                });
            }
            if (checkFlagIncludes(currentUserParams.taxes, RolePermissionFlag.Delete)) {
                newActions.push({
                    name: "delete",
                    icon: "delete",
                    color: "error",
                    onClick: (items: ITaxeDto[]) => toDeleteConfirm(items[0]),
                    disable: (items: ITaxeDto[]) => items.length !== 1,
                });
            }
        }
        return newActions;
    }, [currentUserParams]);
    function loadData() {
        if (!currentUserParams?.taxes || !checkFlagIncludes(currentUserParams.taxes, RolePermissionFlag.View)) return;
        const cb = userId ? taxes.crudUserList(userId) : taxes.crudList();
        setIsLoading(true);
        cb.then((res) => {
            const { error, result } = webApiResultData<ITaxeDto[]>(res);
            if (error) {
                throw error;
            }
            if (result) {
                setTableValue(
                    result.map((x) => ({
                        ...x,
                        taxesTypeName: x.taxesType?.title || "",
                        userName: x.user?.firstName || lang.unknown,
                        nickname: x.user?.nickname || "",
                        money: sprintf(lang.money, x.value),
                    }))
                );
            }
        })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : lang.error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    function toAdd() {
        if (!checkFlagIncludes(currentUserParams?.taxes || 0, RolePermissionFlag.Add)) return;
        let defaultType = 1;
        if (currentUserParams?.taxesTypesEdit && currentUserParams?.taxesTypesEdit > 0) {
            const availableTypes = getValuesByFlag(currentUserParams?.taxesTypesEdit || 0);
            defaultType = availableTypes[0];
        }

        setEditData({
            id: 0,
            value: 1,
            title: "",
            uid: userId || 0,
            status: TaxeStatusEnum.Active,
            creatorId: 0,
            endDate: dayjs().add(8, "hour").toDate(),
            taxesTypeId: defaultType,
        });
    }
    function toEdit(data: ITaxeDto) {
        if (!checkFlagIncludes(currentUserParams?.taxes || 0, RolePermissionFlag.Edit)) return;
        if (currentUserParams?.taxesTypesEdit && currentUserParams?.taxesTypesEdit > 0) {
            const availableTypes = getValuesByFlag(currentUserParams?.taxesTypesEdit || 0);
            if (!availableTypes.includes(data.taxesTypeId)) {
                showError(langPage.errors.taxesTypeNotAllowed);
                return;
            }
        }
        setEditData(data);
    }
    function toDelete(confirm: boolean, data: ITaxeDto) {
        if (confirm) {
            if (!checkFlagIncludes(currentUserParams?.taxes || 0, RolePermissionFlag.Delete)) return;
            setIsLoading(true);
            taxes
                .crudDelete([data.id])
                .then((res) => {
                    const { error, result } = webApiResultData<any>(res);
                    if (error) {
                        throw error;
                    }
                    if (result) {
                        showSuccess(langPage.delete.success);
                        loadData();
                        setUpdateTableKey((prev) => prev + 1);
                    }
                })
                .catch((err) => {
                    showError(err?.name === "webApiResultError" ? err.message : langPage.errors.delete);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        setConfirmData(null);
    }
    function toDeleteConfirm(data: ITaxeDto) {
        if (!checkFlagIncludes(currentUserParams?.taxes || 0, RolePermissionFlag.Delete)) return;
        if (currentUserParams?.taxesTypesEdit && currentUserParams?.taxesTypesEdit > 0) {
            const availableTypes = getValuesByFlag(currentUserParams?.taxesTypesEdit || 0);
            if (!availableTypes.includes(data.taxesTypeId)) {
                showError(langPage.errors.taxesTypeNotAllowed);
                return;
            }
        }
        setConfirmData({
            title: langPage.delete.title,
            text: sprintf(langPage.delete.text, sprintf(lang.money, data.value), data.user?.firstName || lang.unknown),
            okText: langPage.delete.okText,
            open: true,
            onClose: toDelete,
            otherProps: data,
        });
    }
    const hideModal = () => {
        setEditData(null);
    };
    function onSave(data: ITaxeDto) {
        setIsLoading(true);
        taxes
            .crudSave(data)
            .then((res) => {
                const { error, result } = webApiResultData<any>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    let status = MessageStatusEnum.Taxes;
                    switch (data.taxesTypeId) {
                        case 2:
                            status = MessageStatusEnum.Taxes2;
                            break;
                        case 3:
                            status = MessageStatusEnum.Taxes3;
                            break;
                    }
                    setNotificationData({
                        uid: data.uid,
                        title: langPage.message.title,
                        status: status,
                        text: sprintf(
                            langPage.message.text,
                            data.title,
                            sprintf(lang.money, data.value),
                            getEnumTitleValue(TaxeStatusEnum, "TaxeStatusEnum", data.status)
                        ),
                    });
                    loadData();
                    hideModal();
                }
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.save);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    function onAdd(data: any) {
        setIsLoading(true);
        taxes
            .add(data)
            .then((res) => {
                const { error, result } = webApiResultData<any>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    loadData();
                    hideModal();
                }
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.save);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    const hideNotificationData = () => {
        setNotificationData(null);
    };
    return (
        <>
            {!!confirmData && <Confirm {...confirmData} />}
            {editData ? (
                editData.id === 0 && !userId ? (
                    <TaxesAdd
                        data={editData}
                        onSave={onAdd}
                        onCancel={hideModal}
                        filterTypes={currentUserParams?.taxesTypesEdit}
                    />
                ) : (
                    <TaxesEdit
                        data={editData}
                        onSave={onSave}
                        onCancel={hideModal}
                        filterTypes={currentUserParams?.taxesTypesEdit}
                    />
                )
            ) : null}
            {!!notificationData && (
                <SendUserNotification
                    {...notificationData}
                    onClose={hideNotificationData}
                />
            )}
            <GoodTable
                key={updateTableKey}
                fields={tableFields}
                values={tableValue}
                actions={tableActions}
                onRowDoubleClick={toEdit}
                order={{ direction: SortOrderEnum.Descending, sort: "id" }}
                mobileBottomAction={!userId}
            />
        </>
    );
}
