import { useState } from "react";

import lang from "lang";
import { Icon, Page } from "components";
import QrScanner from "components/QrScanner";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { Button } from "@mui/material";

const langPage = lang.pages.qrScanner;

function QrScannerPage({ roles, icon }: IPageWithRoles) {
    const [isLoading, setIsLoading] = useState(false);
    const [reader, setReader] = useState("");
    const [isShowedReader, setIsShowedReader] = useState(true);
    const toCheck = (message: string) => {
        hideReader();
        setReader(message);
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
            isLoading={isLoading}
            roles={roles}
            icon={icon}
        >
            {reader}
            {!!isShowedReader && (
                <QrScanner
                    onRead={toCheck}
                    onCancel={hideReader}
                />
            )}
            <Button
                startIcon={<Icon name="qr_code_scanner" />}
                onClick={showReader}
                variant="outlined"
            >
                {langPage.startScan}
            </Button>
        </Page>
    );
}
export default QrScannerPage;
