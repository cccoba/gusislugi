import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";

import lang from "lang";
import { Form } from "components";
import { TFormField } from "components/Form/FormAdapters";

import { users } from "api/data";
import { IUserRegistrationDto } from "api/interfaces/user/IUserRegistrationDto";
import { useNotifier } from "api/hooks/useNotifier";
import { webApiResultData } from "api/data/dataProvider";
import { useAppDispatch } from "api/hooks/redux";
import { userInit } from "store/reducers/UserSlice";

const langPage = lang.pages.registration;
const fields: TFormField[] = [
    { type: "text", name: "firstName", title: langPage.fields.firstName, required: true },
    { type: "text", name: "passport", title: langPage.fields.passport, required: true },
];

const defValues: IUserRegistrationDto = {
    firstName: "",
    passport: "",
};
function Registration() {
    const [isLoading, setIsLoading] = useState(false);
    const { showError, showSuccess } = useNotifier();
    const dispatch = useAppDispatch();
    const toSave = (data: IUserRegistrationDto) => {
        setIsLoading(true);
        users
            .registration(data)
            .then((res) => {
                const { error, result } = webApiResultData<boolean>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    dispatch(userInit());
                    showSuccess(langPage.success.registration);
                }
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.registration);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <Box
            sx={{
                textAlign: "center",
                m: 2,
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 5,
                }}
            >
                <Typography>{langPage.text}</Typography>
                <Form
                    fields={fields}
                    values={defValues}
                    submitBtnType="save"
                    onSubmit={toSave}
                    isLoading={isLoading}
                />
            </Paper>
        </Box>
    );
}
export default Registration;
