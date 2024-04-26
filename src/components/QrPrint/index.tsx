import { QRCodeSVG } from "qrcode.react";

interface IProps {
    value: string;
    showDescription?: boolean;
}
const qrWidth = 256;

function QrPrint({ value }: IProps) {
    return (
        <QRCodeSVG
            value={value}
            size={qrWidth}
        />
    );
}

export default QrPrint;
