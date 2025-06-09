import { useEffect } from "react";
import { useScanQrPopup } from "@vkruglikov/react-telegram-web-app";
import { useNotifier } from "api/hooks/useNotifier";
import lang from "lang";

interface IProps {
    onRead: (message: string) => void;
    onCancel: () => void;
}

const TelegramQRScanner = ({ onRead, onCancel }: IProps) => {
    const [showQrPopup, closeQrPopup] = useScanQrPopup();
    const { showError } = useNotifier();
    useEffect(() => {
        try {
            const startScan = () => {
                showQrPopup({ text: "" }, (text) => {
                    closeQrPopup();
                    //alert(text);
                    onRead(text);
                });
            };
            startScan();
        } catch (error) {
            showError(lang.error + JSON.stringify(error));
        }
    }, []);

    return null;
};

export default TelegramQRScanner;
