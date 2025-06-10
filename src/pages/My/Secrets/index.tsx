import { useState } from "react";

import lang from "lang";
import { Alert, Confirm, Icon, IconButton, Page } from "components";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import type { IPage } from "api/interfaces/components/Page/IPage";
import useLoadApiData from "api/hooks/useLoadApiData";
import { users } from "api/data";
import type { IUserSecretsDto } from "api/interfaces/user/IUserSecretsDto";

import { isMobile } from "react-device-detect";

import SecretsMedicalInfo from "./MedicalInfo";

interface IProps extends IPage {
    userId?: number;
}
export default function Secrets({ userId, ...pageProps }: IProps) {
    const langPage = lang.pages.secrets;
    const [isAlertShowed, setIsAlertShowed] = useState(true);
    const { data, isLoading, refetch } = useLoadApiData<IUserSecretsDto>(users.getSecrets, [userId]);
    const navigate = useNavigate();
    const onConfirmClick = (result: boolean) => {
        setIsAlertShowed(false);
        if (!result) {
            navigate("/");
        }
    };
    return (
        <Page
            title={langPage.title}
            isLoading={isLoading}
            {...pageProps}
        >
            <Confirm
                open={isAlertShowed}
                text={langPage.description}
                onClose={onConfirmClick}
                okText={langPage.confirm}
                noText={lang.back}
            />
            <Box display={isAlertShowed ? "none" : "block"}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                >
                    <Alert
                        type="warning"
                        text={langPage.description2}
                    />
                    <IconButton
                        onClick={() => refetch()}
                        name="refresh"
                        color="primary"
                    />
                </Box>
                {!data?.medicalSickness?.length && <Typography variant="body1">{langPage.noData}</Typography>}
                {!!data?.medicalSickness?.length && <SecretsMedicalInfo data={data.medicalSickness} />}
            </Box>
        </Page>
    );
}
