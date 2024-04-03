import { useAppSelector } from "api/hooks/redux";

import TelegramQRScanner from "./TelegramQRScanner";
import BrowserQRScanner from "./BrowserQRScanner";

interface IProps {
    onRead: (message: string) => void;
    onCancel: () => void;
}

function QrScanner({ onRead, onCancel }: IProps) {
    const withTelegram = useAppSelector((s) => s.components.withTelegram);
    return withTelegram ? (
        <TelegramQRScanner
            onRead={onRead}
            onCancel={onCancel}
        />
    ) : (
        <BrowserQRScanner
            onRead={onRead}
            onCancel={onCancel}
        />
    );
}

export default QrScanner;
