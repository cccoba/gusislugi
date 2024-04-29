import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import lang, { sprintf } from "lang";
import { Form, IconButton, KeyValueList, Modal, Page } from "components";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { money, webApiResultData } from "api/data";
import { IUserMoneyDto } from "api/interfaces/Money/IUserMoneyDto";
import useParamsId from "api/hooks/useParamsId";
import { useNotifier } from "api/hooks/useNotifier";
import { IUserDto } from "api/interfaces/user/IUserDto";
import { IMoneyDto } from "api/interfaces/user/IMoneyDto";
import { IMoneyAddDto } from "api/interfaces/user/IMoneyAddDto";

import UserHistoryTable from "./UserHistory/UserHistoryTable";

import { moneyEditConfig } from ".";

const langPage = lang.pages.money;

function MoneyUser({ roles, icon }: IPageWithRoles) {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<IUserDto | null>(null);
    const [history, setHistory] = useState<any[]>([]);
    const [addValues, setAddValues] = useState<null | IMoneyAddDto>(null);
    const { showError, showSuccess } = useNotifier();
    const userId = useParamsId();
    useEffect(() => {
        if (userId) {
            loadData(userId);
        }
    }, [userId]);
    function loadData(id: number) {
        setIsLoading(true);
        money
            .getUserData(id)
            .then((res) => {
                const { error, result } = webApiResultData<IUserMoneyDto>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    setUserData(result.user);
                    setHistory(result.history);
                }
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.loadData);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    const updateData = () => {
        if (userId) {
            loadData(userId);
        }
    };
    const toAdd = () => {
        setAddValues({ fromUid: 1, toUid: [userId], value: 0, hidden: false, id: 0 });
    };
    const toHideAdd = () => {
        setAddValues(null);
    };
    const toUserMoneyAdd = (data: IMoneyDto) => {
        setIsLoading(true);
        money
            .crudSave(data)
            .then((res) => {
                const { error, result } = webApiResultData<boolean>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    showSuccess(sprintf(langPage.success.toUserMoneyAdd, sprintf(lang.money, data.value)));
                    updateData();
                    toHideAdd();
                }
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.toUserMoneyAdd);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <Page
            title={langPage.userTitle}
            isLoading={isLoading}
            roles={roles}
            icon={icon}
            backUrl={"/users"}
        >
            {!!addValues && (
                <Modal
                    open
                    withCloseButton
                    onClose={toHideAdd}
                >
                    <Form
                        fields={moneyEditConfig.fields}
                        values={addValues}
                        onSubmit={toUserMoneyAdd}
                        onCancel={toHideAdd}
                    />
                </Modal>
            )}
            <Box>
                {!!userData && (
                    <KeyValueList
                        withDivider
                        values={[
                            {
                                title: langPage.userName,
                                value: userData.firstName,
                            },
                            {
                                title: langPage.fields.value,
                                value: (
                                    <Box display="flex">
                                        <Typography variant="h4">
                                            {sprintf(lang.money, userData.money || 0)}{" "}
                                        </Typography>
                                        <IconButton
                                            name="refresh"
                                            color="primary"
                                            onClick={updateData}
                                        />
                                        <IconButton
                                            name="add"
                                            color="primary"
                                            onClick={toAdd}
                                        />
                                    </Box>
                                ),
                            },
                        ]}
                    />
                )}
                {!!history?.length && (
                    <UserHistoryTable
                        history={history}
                        userId={userId}
                        isLoading={isLoading}
                    />
                )}
            </Box>
        </Page>
    );
}
export default MoneyUser;
