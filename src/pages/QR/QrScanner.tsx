import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import lang from "lang";
import { Icon, Page } from "components";
import QrScanner, { qrResultParser } from "components/QrScanner";

import type { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { useNotifier } from "api/hooks/useNotifier";

export default function QrScannerPage({ roles, icon }: IPageWithRoles) {
    const langPage = lang.pages.qrScanner;
    const [isShowedReader, setIsShowedReader] = useState(true);
    const navigate = useNavigate();
    const { showError } = useNotifier();
    const toCheck = (message: string) => {
        hideReader();
        const result = qrResultParser(message);
        switch (result.type) {
            case "guid":
                navigate(`/passport/${result.value}`);
                break;
            case "telegram":
                navigate(`/passport-tg/${result.value}`);
                break;
            default:
                showError(langPage.errors.notDetect);
        }
    };
    const showReader = () => {
        setIsShowedReader(true);
    };
    const hideReader = () => {
        setIsShowedReader(false);
    };
    return (
        <Page
            title={langPage.title}
            roles={roles}
            icon={icon}
            backUrl={"/"}
        >
            {!!isShowedReader && (
                <QrScanner
                    onRead={toCheck}
                    onCancel={hideReader}
                />
            )}
            <Button
                startIcon={<Icon name="qrScanner" />}
                onClick={showReader}
                variant="outlined"
            >
                {langPage.startScan}
            </Button>
        </Page>
    );
}
