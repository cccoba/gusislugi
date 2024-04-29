import { useEffect } from "react";
import { useScanQrPopup } from "@vkruglikov/react-telegram-web-app";

interface IProps {
    onRead: (message: string) => void;
    onCancel: () => void;
}

const TelegramQRScanner = ({ onRead, onCancel }: IProps) => {
    const [showQrPopup, closeQrPopup] = useScanQrPopup();
    useEffect(() => {
        const startScan = () => {
            showQrPopup({ text: "" }, (text) => {
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
