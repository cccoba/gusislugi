import { useAppSelector } from "api/hooks/redux";

import TelegramQRScanner from "./TelegramQRScanner";
import BrowserQRScanner from "./BrowserQRScanner";
import { isGuid } from "api/common/helper";

interface IProps {
    onRead: (message: string) => void;
    onCancel: () => void;
}
interface IQrResultParser {
    type: "unknown" | "guid" | "telegram";
    value: string;
}
export function qrResultParser(message: string): IQrResultParser {
    const result: IQrResultParser = {
        value: message,
        type: "unknown",
    };
    if (isGuid(message)) {
        result.type = "guid";
    } else if (message.startsWith("https://t.me/")) {
        result.type = "telegram";
        result.value = message.slice(13);
    }
    return result;
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
