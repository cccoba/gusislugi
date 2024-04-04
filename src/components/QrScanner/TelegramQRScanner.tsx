import { Box, Button } from "@mui/material";
import { useScanQrPopup } from "@vkruglikov/react-telegram-web-app";

import lang from "lang";
import { useEffect } from "react";

const langPage = lang.components.qrScanner;
interface IProps {
    onRead: (message: string) => void;
    onCancel: () => void;
}

const TelegramQRScanner = ({ onRead, onCancel }: IProps) => {
    const [showQrPopup, closeQrPopup] = useScanQrPopup();
    useEffect(() => {
        const startScan = () => {
            showQrPopup({ text: langPage.hint }, (text) => {
                closeQrPopup();
                alert(text);
                onRead(text);
            });
        };
        startScan();
    }, []);

    return null;
};

export default TelegramQRScanner;
