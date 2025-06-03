import { useEffect, useMemo, useState } from "react";

import lang, { sprintf } from "lang";
import { Confirm, Page } from "components";
import type { ISendUserNotificationProps } from "components/SendUserNotification";
import SendUserNotification from "components/SendUserNotification";
import type { IGoodTableToolbarAction } from "components/GoodTable";

import { MessageStatusEnum } from "api/enums/MessageStatusEnum";
import { company, webApiResultData } from "api/data";
import { useAppSelector, useLoader } from "api/hooks/redux";
import type { ICompanyDto } from "api/interfaces/user/ICompanyDto";
import { CompanyPermissionActionFlag } from "api/enums/CompanyPermissionActionFlag";
import { useNotifier } from "api/hooks/useNotifier";

import type { IConfirmProps } from "components/Confirm";

import type { ICompanyMoneyDto } from "api/interfaces/user/ICompanyMoneyDto";
import { CompanyMoneyTypeEnum } from "api/enums/CompanyMoneyTypeEnum";
import { useNavigate } from "react-router-dom";
import type { IPage } from "api/interfaces/components/Page/IPage";

import CompanyMoneyAdd from "./AddMoney";
import CompaniesEdit from "./Edit";
import CompanyList from "./List";

interface IProps extends IPage {
    userId?: number;
}

export default function Companies({ userId, ...pageProps }: IProps) {
    const langPage = lang.pages.companies;
    const { setIsLoading } = useLoader();
    const { showError, showSuccess } = useNotifier();
    const [data, setData] = useState<ICompanyDto[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<ICompanyDto | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<null | IConfirmProps>(null);
    const [isAddMoneyShowed, setIsAddMoneyShowed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadList();
    }, [userId]);

    function loadList() {
        const cb = userId ? company.crudUserList(userId) : company.crudList();
        setIsLoading(true);
        cb.then((res) => {
            const { error, result } = webApiResultData<ICompanyDto[]>(res);
            if (error) {
                throw error;
            }
            if (result) {
                setData(result);
            }
        })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : lang.error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const currentUserRoleParams = useAppSelector((s) => s.user.user?.role?.params?.company);
    const [notificationData, setNotificationData] = useState<null | ISendUserNotificationProps>(null);
    const actions = useMemo<IGoodTableToolbarAction<ICompanyDto>[]>(() => {
        const newActions: IGoodTableToolbarAction<ICompanyDto>[] = [];
        if (!currentUserRoleParams) {
            return newActions;
        }
        if (currentUserRoleParams & CompanyPermissionActionFlag.View) {
            newActions.push({ icon: "refresh", name: "refresh", onClick: loadList });
        }
        if (
            currentUserRoleParams & CompanyPermissionActionFlag.MoneyAdd ||
            currentUserRoleParams & CompanyPermissionActionFlag.MoneySubtract
        ) {
            newActions.push({ icon: "history", name: "history", onClick: () => navigate("/company/history") });
        }
        if (currentUserRoleParams & CompanyPermissionActionFlag.Add) {
            newActions.push({ icon: "add", name: "add", onClick: toAddRecord });
        }
        if (currentUserRoleParams & CompanyPermissionActionFlag.Delete) {
            newActions.push({
                icon: "delete",
                name: "delete",
                color: "error",
                onClick: toDeleteRecordConfirm,
                disable: (selectedRows) => !selectedRows?.length,
            });
        }
        return newActions;
    }, [currentUserRoleParams]);
    function onSaveStart(data: ICompanyDto) {
        setIsLoading(true);
        company
            .crudSave(data)
            .then((res) => {
                const { error, result } = webApiResultData<any>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    setSelectedRecord(null);
                    setNotificationData({
                        uid: data.addUserId,
                        title: langPage.message.title,
                        text: data.id
                            ? sprintf(langPage.message.editText, data.title)
                            : sprintf(langPage.message.addText, data.title),
                    });
                    loadList();
                }
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : lang.error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    function toAddRecord() {
        setSelectedRecord({
            id: 0,
            title: "",
            description: "",
            money: 0,
            address: "",
            addUserId: userId || 0,
            deputyUserId: null,
        });
    }
    function toDeleteRecordConfirm([selectedRow]: ICompanyDto[]) {
        setDeleteConfirm({
            open: true,
            title: langPage.delete.title,
            text: sprintf(langPage.delete.text, selectedRow.title),
            okText: langPage.delete.okText,
            otherProps: selectedRow,
        });
    }
    const hideNotificationData = () => {
        setNotificationData(null);
    };
    const toEditRecord = (record: ICompanyDto) => {
        if (currentUserRoleParams && currentUserRoleParams & CompanyPermissionActionFlag.Edit) {
            setSelectedRecord(record);
        }
    };
    const toDeleteRecord = (confirm: boolean, record: ICompanyDto) => {
        if (confirm && record && currentUserRoleParams && currentUserRoleParams & CompanyPermissionActionFlag.Delete) {
            setIsLoading(true);
            company
                .crudDelete([record.id])
                .then((res) => {
                    const { error, result } = webApiResultData<boolean>(res);
                    if (error) {
                        throw error;
                    }
                    if (result) {
                        setNotificationData({
                            uid: record.addUserId,
                            title: langPage.message.title,
                            text: sprintf(langPage.message.deleteText, record.title),
                        });
                        loadList();
                    }
                })
                .catch((err) => {
                    showError(err?.name === "webApiResultError" ? err.message : lang.error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        setDeleteConfirm(null);
    };
    const toAddClick = () => {
        setIsAddMoneyShowed(true);
    };
    const onAddMoneySave = (data: ICompanyMoneyDto) => {
        if (selectedRecord) {
            if (data.type === CompanyMoneyTypeEnum.Subtract && data.value > selectedRecord.money) {
                showError(langPage.errors.subtract);
                return;
            }
            setIsLoading(true);
            company.money
                .add(data)
                .then((res) => {
                    const { error, result } = webApiResultData<number>(res);
                    if (error) {
                        throw error;
                    }
                    showSuccess(sprintf(langPage.success.addMoney, selectedRecord.title, result || 0));
                    loadList();
                    setIsAddMoneyShowed(false);
                    setSelectedRecord(null);
                    setNotificationData({
                        uid: selectedRecord.addUserId,
                        title: langPage.message.title,
                        text: sprintf(langPage.message.addUserText, selectedRecord.title, result || 0),
                    });
                })
                .catch((err) => {
                    showError(err?.name === "webApiResultError" ? err.message : langPage.errors.addMoney);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };
    return (
        <Page
            title={langPage.title}
            icon="company"
            {...pageProps}
        >
            {!!deleteConfirm && (
                <Confirm
                    {...deleteConfirm}
                    onClose={toDeleteRecord}
                />
            )}
            {!!isAddMoneyShowed && !!selectedRecord && (
                <CompanyMoneyAdd
                    companyId={selectedRecord.id}
                    onSave={onAddMoneySave}
                    onCancel={() => setIsAddMoneyShowed(false)}
                    withAdd={
                        !!currentUserRoleParams && !!(currentUserRoleParams & CompanyPermissionActionFlag.MoneyAdd)
                    }
                    withSubtract={
                        !!currentUserRoleParams && !!(currentUserRoleParams & CompanyPermissionActionFlag.MoneySubtract)
                    }
                />
            )}
            {!!notificationData && (
                <SendUserNotification
                    {...notificationData}
                    status={MessageStatusEnum.Companies}
                    onClose={hideNotificationData}
                />
            )}
            {!!selectedRecord && (
                <CompaniesEdit
                    data={selectedRecord}
                    onCancel={() => setSelectedRecord(null)}
                    onSave={onSaveStart}
                    onAddClick={toAddClick}
                    withAdd={
                        !!currentUserRoleParams && !!(currentUserRoleParams & CompanyPermissionActionFlag.MoneyAdd)
                    }
                    withSubtract={
                        !!currentUserRoleParams && !!(currentUserRoleParams & CompanyPermissionActionFlag.MoneySubtract)
                    }
                />
            )}
            <CompanyList
                data={data}
                onRowDoubleClick={toEditRecord}
                actions={actions}
            />
        </Page>
    );
}
