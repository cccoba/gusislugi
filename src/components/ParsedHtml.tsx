import { Box } from "@mui/material";
import parser from "html-react-parser";
import { useEffect, useState } from "react";

import Image from "./Image";

interface IProps {
    html: string;
    className?: string;
}

const parserOptions: any = {
    replace: (domNode: any) => {
        if (domNode.type === "tag") {
            switch (domNode.name) {
                case "img":
                    if (domNode?.attribs?.class?.includes("zoom-image") && domNode?.attribs?.src) {
                        const props: any = {};
                        if (domNode?.attribs?.width) {
                            props.maxWidth = domNode.attribs.width as string;
                            if (!props.maxWidth.endsWith("%")) {
                                props.maxWidth += "px";
                            }
                        }
                        if (domNode?.attribs?.height) {
                            props.maxHeight = domNode.attribs.height as string;
                            if (!props.maxHeight.endsWith("%")) {
                                props.maxHeight += "px";
                            }
                        }
                        if (domNode?.attribs?.height) {
                            props.height = domNode?.attribs?.height;
                        }
                        return (
                            <Image
                                url={domNode?.attribs?.src}
                                zoom={true}
                                {...props}
                            />
                        );
                    }
            }
        }
    },
    clickCb: (value: string) => {},
};

export default function ParsedHtml({ html = "", className = "" }: IProps) {
    const [replacedHTML, setReplacedHTML] = useState("");
    useEffect(() => {
        setReplacedHTML(html);
        parserOptions.clickCb = run;
    }, [html]);

    const run = (value: string) => {};
    const result = parser(replacedHTML, parserOptions) as any;
    return (
        <Box
            className={"parsedHtml " + className}
            sx={{ "& p": { my: 0 } }}
        >
            {result}
        </Box>
    );
}
