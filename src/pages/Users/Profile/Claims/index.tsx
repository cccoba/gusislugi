import { useEffect, useMemo, useState } from "react";

import { Confirm, IconButton, PageOrModal, Table } from "components";
import { ITableField } from "components/Table";
import lang, { getEnumTitle, sprintf } from "lang";

import dateTime from "api/common/dateTime";
import { enumGetValue } from "api/common/enumHelper";
import { claims, users } from "api/data";
import { ClaimStatusEnum } from "api/enums/ClaimStatusEnum";
import useLoadApiData from "api/hooks/useLoadApiData";
import { useNotifier } from "api/hooks/useNotifier";
import { SortOrderEnum } from "api/enums/SortOrderEnum";
import { IClaimDto } from "api/interfaces/user/IClaimDto";
import { IConfirmProps } from "components/Confirm";
import { webApiResultData } from "api/data/dataProvider";
import { title } from "process";
import ClaimEdit from "pages/Claims/ClaimEdit";
import { useAppSelector } from "api/hooks/redux";

interface IProps {
    userId: number;
}
const langPage = lang.pages.profile.claims;
const fields: ITableField[] = [
    { name: "id", title: langPage.fields.id },
    { name: "title", title: langPage.fields.title },
    { name: "status", title: langPage.fields.status },
    { name: "date", title: langPage.fields.updatedDate, format: "date", width: "120px" },
    { name: "actions", title: langPage.fields.actions, format: "component", width: "50px" },
];
function ProfileClaims({ userId }: IProps) {
    const { data = [], error, isLoading: usersIsLoading, refetch } = useLoadApiData(users.getClaims, []);
    const [deleteConfirm, setDeleteConfirm] = useState<null | IConfirmProps>(null);
    const { showError, showSuccess } = useNotifier();
    const [isLoading, setIsLoading] = useState(false);
    const [showedAddModal, setShowedAddModal] = useState(false);
    const currentUserId = useAppSelector((u) => u.user.user?.id);
    useEffect(() => {
        if (error) {
            showError(error);
        }
    }, [error]);
    const values = useMemo(() => {
        if (data?.length) {
            return data.map((x) => ({
                id: x.id,
                title: x.title,
                status: getEnumTitle("ClaimStatusEnum", enumGetValue(ClaimStatusEnum, x.status) || ""),
                date: x.updatedDate
                    ? new Date(x.updatedDate * 1000).toISOString()
                    : new Date(x.addDate * 1000).toISOString(),
                actions: (
                    <>
                        {x.status === ClaimStatusEnum.Created && (
                            <IconButton
                                name="delete"
                                onClick={() => toDeleteConfirm(x)}
                                size="small"
                                color="error"
                            />
                        )}
                    </>
                ),
            }));
        }
        return [];
    }, [data]);
    function toDeleteConfirm(row: IClaimDto) {
        setDeleteConfirm({
            open: true,
            title: langPage.deleteConfirm.title,
            okText: langPage.deleteConfirm.okText,
            text: sprintf(langPage.deleteConfirm.text, row.title),
            otherProps: row,
        });
    }
    const toDelete = (result: boolean, row: IClaimDto) => {
        if (result && !!row?.id) {
            setIsLoading(true);
            claims
                .remove(row.id)
                .then((res) => {
                    const { error, result } = webApiResultData<boolean>(res);
                    if (error) {
                        throw error;
                    }
                    if (result) {
                        refetch();
                        showSuccess(langPage.success.removeClaim);
                    }
                })
                .catch((err) => {
                    showError(err?.name === "webApiResultError" ? err.message : langPage.errors.removeClaim);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        setDeleteConfirm(null);
    };
    if (!userId || usersIsLoading) {
        return null;
    }
    const toSelect = (data: any) => {};
    const showAddModal = () => {
        setShowedAddModal(true);
    };
    const hideAddModal = () => {
        setShowedAddModal(false);
    };
    const toAdd = (data: IClaimDto) => {
        setIsLoading(true);
        claims
            .add(data)
            .then((res) => {
                const { error, result } = webApiResultData<number>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    setIsLoading(false);
                    refetch();
                    showSuccess(langPage.success.addClaim);
                    hideAddModal();
                }
            })
            .catch((err) => {
                setIsLoading(false);
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.addClaim);
            });
    };
    return (
        <>
            {showedAddModal && (
                <PageOrModal
                    title={langPage.add}
                    modalProps={{
                        onClose: hideAddModal,
                        withCloseButton: true,
                        responsiveWidth: true,
                    }}
                >
                    <ClaimEdit
                        id={0}
                        userId={currentUserId || 0}
                        onCancel={hideAddModal}
                        onSave={toAdd}
                    />
                </PageOrModal>
            )}
            {deleteConfirm && (
                <Confirm
                    {...deleteConfirm}
                    onClose={toDelete}
                />
            )}
            <Table
                fields={fields}
                values={values}
                order={{ direction: SortOrderEnum.Descending, sort: "id" }}
                onSelect={toSelect}
                noRecordsText={langPage.noRecordsText}
                actions={[{ icon: "add", name: "add", onClick: showAddModal, color: "primary" }]}
            />
        </>
    );
}
export default ProfileClaims;
