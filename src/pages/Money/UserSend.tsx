import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";

import lang, { sprintf } from "lang";
import { setMoneyMinus } from "store/reducers/UserSlice";
import { InputUser, Loader, PageOrModal, Alert, Form } from "components";

import { IPageOrModal } from "api/interfaces/components/Page/IPageOrModal";
import { IUserShortDto } from "api/interfaces/user/IUserShortDto";
import { useAppDispatch, useAppSelector } from "api/hooks/redux";

import { money, webApiResultData } from "api/data";
import { useNotifier } from "api/hooks/useNotifier";
import { checkFlagIncludes } from "api/common/enumHelper";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";
import { TFormField } from "components/Form/FormAdapters";
import { IFormFieldCounter } from "components/Form/Adapters/Counter";
import { IMoneyDto } from "api/interfaces/user/IMoneyDto";

const langPage = lang.pages.money.send;
interface IFormValues {
    firstName: string;
    moneyCount?: number;
    hidden: boolean;
    message: string;
}
const defFields: TFormField[] = [
    { name: "firstName", title: langPage.user, type: "text", fieldProps: { inputProps: { readOnly: true } } },
    {
        name: "moneyCount",
        title: langPage.moneyCount,
        type: "counter",
        minValue: 1,
        required: true,
        validateFn: (value) => {
            return (!!value && value > 0) || langPage.errors.positiveCount;
        },
        fieldProps: {
            autoFocus: true,
        },
    },
    { name: "message", title: langPage.message, type: "text", fieldProps: { multiline: true } },
    { name: "hidden", title: "", type: "switcher", text: langPage.hiddenText, hidden: true },
];
const defValues: IFormValues = {
    firstName: "",
    moneyCount: 1,
    hidden: false,
    message: "",
};
interface ISuccessResult {
    firstName: string;
    money: number;
    show: boolean;
    id: number;
}
interface IProps extends IPageOrModal {}
function MoneyUserSend({ modalProps }: IProps) {
    const [isLoading, setIsLoading] = useState(false);
    const currentUserMoney = useAppSelector((s) => s.user.user?.money);
    const currentUserAdminPermissions = useAppSelector((s) => s.user.user?.role.params.admins);
    const [successResult, setSuccessResult] = useState<ISuccessResult>({
        firstName: "",
        money: 0,
        show: false,
        id: 0,
    });
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<null | IUserShortDto>(null);
    const { showError } = useNotifier();
    const toCancel = () => {
        setUser(null);
        if (!!modalProps?.onClose) {
            modalProps.onClose();
        }
    };
    const fields = useMemo(() => {
        const newFields = [...defFields];
        if (checkFlagIncludes(currentUserAdminPermissions || 0, RolePermissionFlag.Edit)) {
            const hiddenField = newFields.find((x) => x.name === "hidden");
            if (hiddenField) {
                hiddenField.hidden = false;
            }
        }
        const moneyCountField = newFields.find((x) => x.name === "moneyCount") as IFormFieldCounter;
        if (moneyCountField) {
            moneyCountField.maxValue = currentUserMoney || 0;
        }
        return newFields;
    }, [currentUserAdminPermissions, currentUserMoney]);

    const values = useMemo(() => {
        const newValues = { ...defValues };
        if (!user) {
            return newValues;
        }
        newValues.firstName = user.firstName;

        return newValues;
    }, [user]);
    const toSend = (data: IFormValues) => {
        if (!!data?.moneyCount && user) {
            setIsLoading(true);
            money
                .userSendMoney(user.id, data.moneyCount, data.hidden, data.message)
                .then((res) => {
                    const { error, result } = webApiResultData<number[]>(res);
                    if (error) {
                        throw error;
                    }

                    if (!!result?.length) {
                        dispatch(setMoneyMinus(data.moneyCount || 0));
                        setSuccessResult({
                            firstName: user.firstName,
                            money: data.moneyCount || 0,
                            id: result[0],
                            show: true,
                        });
                    }
                })
                .catch((err) => {
                    showError(err?.name === "webApiResultError" ? err.message : langPage.errors.userSendMoney);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    return (
        <PageOrModal
            title={langPage.title}
            modalProps={modalProps}
            isLoading={isLoading}
        >
            {successResult.show ? (
                <SuccessResult {...successResult} />
            ) : !user ? (
                <InputUser
                    onSelectUser={setUser}
                    withScan
                />
            ) : (
                <Box>
                    <Loader isLoading={isLoading} />
                    <Form
                        fields={fields}
                        values={values}
                        onSubmit={toSend}
                        onCancel={toCancel}
                        submitBtnText={langPage.send}
                        autoCompleteForm="on"
                    >
                        <Typography>{sprintf(langPage.maxMoney, currentUserMoney || 0, lang.moneyValue)}</Typography>
                    </Form>
                </Box>
            )}
        </PageOrModal>
    );
}

function SuccessResult({ money, firstName, id }: ISuccessResult) {
    return (
        <Alert
            type="success"
            title={langPage.success}
            text={
                <Box>
                    <Box>
                        <Typography display="inline">{langPage.successResult.money}</Typography>{" "}
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: "bold" }}
                            display="inline"
                        >
                            {sprintf(lang.money, money)}
                        </Typography>{" "}
                        <Typography display="inline">{langPage.successResult.money2}</Typography>{" "}
                        <Typography
                            display="inline"
                            sx={{ fontWeight: "bold" }}
                        >
                            {langPage.successResult.money3}
                        </Typography>
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <Typography display="inline">{langPage.successResult.user}</Typography>{" "}
                        <Typography
                            display="inline"
                            variant="h4"
                            sx={{ fontWeight: "bold" }}
                        >
                            {firstName}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography display="inline">{langPage.successResult.id}</Typography>{" "}
                        <Typography
                            display="inline"
                            variant="h4"
                            sx={{ fontWeight: "bold" }}
                        >
                            {id}
                        </Typography>
                    </Box>
                </Box>
            }
        />
    );
}
export default MoneyUserSend;
