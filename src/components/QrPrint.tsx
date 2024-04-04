import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { RawHtml } from "components";
import { BrowserQRCodeSvgWriter } from "@zxing/library";

interface IProps {
    value: string;
    showDescription?: boolean;
}
const qrWidth = 600;
function replaceSvg(svg: string, width: number, height: number) {
    let svgTag = `<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 ${width} ${height}">`;
    svg = svg.slice(svg.indexOf(">") + 1);

    return svgTag + svg;
}
function QrPrint({ value }: IProps) {
    const [str, setStr] = useState("");
    useEffect(() => {
        const size = qrWidth;
        const codeWriter = new BrowserQRCodeSvgWriter();
        const cw = codeWriter.write(value, Math.round(size * 0.9), Math.round(size * 0.9));
        const s = new XMLSerializer();
        const newStr = s.serializeToString(cw);

        setStr(replaceSvg(newStr, size, size));
    }, [value]);
    return (
        <Box
            sx={{
                margin: "0 auto",
                textAlign: "center",
                display: "block",
                backgroundColor: "#fff",
                "& .qrPrint": {
                    width: "100%",
                    display: "inline-block",
                    height: "auto",
                    lineHeight: 0,
                },
                "& svg": {
                    width: "100%",
                    height: "auto",
                },
            }}
        >
            <RawHtml
                html={str}
                className="qrPrint"
            />
        </Box>
    );
}

export default QrPrint;
