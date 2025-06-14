import { useEffect, useMemo, useState } from "react";

import { Confirm, IconButton, PageOrModal, GoodTable, type IGoodTableField } from "components";

import lang, { getEnumTitle, sprintf } from "lang";

import { getEnumValue } from "api/common/enumHelper";
import { claims, users } from "api/data";
import { ClaimStatusEnum } from "api/enums/ClaimStatusEnum";
import useLoadApiData from "api/hooks/useLoadApiData";
import { useNotifier } from "api/hooks/useNotifier";
import type { IClaimDto } from "api/interfaces/user/IClaimDto";
import type { IConfirmProps } from "components/Confirm";
import { webApiResultData } from "api/data/dataProvider";

import ClaimEdit from "pages/Claims/ClaimEdit";
import { useAppSelector } from "api/hooks/redux";
import ClaimView from "pages/Claims/ClaimView";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

const langPage = lang.pages.profile.claims;
const fields: IGoodTableField[] = [
    { name: "id", title: langPage.fields.id },
    { name: "title", title: langPage.fields.title },
    { name: "status", title: langPage.fields.status },
    { name: "date", title: langPage.fields.updatedDate, format: "date", maxWidth: "120px" },
    { name: "actions", title: langPage.fields.actions, format: "component", maxWidth: "50px" },
];
function ProfileClaims() {
    const { data = [], error, isLoading: usersIsLoading, refetch } = useLoadApiData(users.getClaims, []);
    const [deleteConfirm, setDeleteConfirm] = useState<null | IConfirmProps>(null);
    const { showError, showSuccess } = useNotifier();
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState<null | IClaimDto>(null);
    const [showedAddModal, setShowedAddModal] = useState(false);
    const currentUserId = useAppSelector((u) => u.user.user?.id);
    useEffect(() => {
        if (error) {
            showError(error);
        }
    }, [error, showError]);
    const values = useMemo(() => {
        if (data?.length) {
            return data.map((x) => ({
                id: x.id,
                title: x.title,
                status: getEnumTitle("ClaimStatusEnum", getEnumValue(ClaimStatusEnum, x.status) || ""),
                date: x.updated_at ? x.updated_at : x.created_at,
                actions: (
                    <>
                        {x.status === ClaimStatusEnum.Created && (
                            <IconButton
                                name="delete"
                                onClick={(e) => toDeleteConfirm(x, e)}
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
    function toDeleteConfirm(row: IClaimDto, e: any) {
        e.stopPropagation();
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
                .userRemove(row.id)
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
    if (!currentUserId || usersIsLoading) {
        return null;
    }
    const showSelected = ({ id }: IClaimDto) => {
        setSelected(data?.find((x) => x.id === id) || null);
    };
    const hideSelected = () => {
        setSelected(null);
    };
    const showAddModal = () => {
        setShowedAddModal(true);
    };
    const hideAddModal = () => {
        setShowedAddModal(false);
    };
    const toAdd = (data: IClaimDto) => {
        setIsLoading(true);
        claims
            .userAdd(data)
            .then((res) => {
                const { error, result } = webApiResultData<boolean>(res);
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
                    isLoading={isLoading}
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
            {!!selected && (
                <PageOrModal
                    title={langPage.claim}
                    isLoading={isLoading}
                    modalProps={{
                        onClose: hideSelected,
                        withCloseButton: true,
                        responsiveWidth: true,
                    }}
                >
                    <ClaimView {...selected} />
                </PageOrModal>
            )}
            {deleteConfirm && (
                <Confirm
                    {...deleteConfirm}
                    onClose={toDelete}
                />
            )}
            <GoodTable
                fields={fields}
                values={values as any}
                loading={isLoading}
                order={{ direction: SortOrderEnum.Descending, sort: "id" }}
                onRowClick={showSelected}
                noRecordsText={langPage.noRecordsText}
                actions={[
                    { icon: "add", name: "add", onClick: showAddModal, color: "primary" },
                    { icon: "refresh", name: "refresh", onClick: refetch },
                ]}
            />
        </>
    );
}
export default ProfileClaims;
