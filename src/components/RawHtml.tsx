import React, { useEffect } from "react";

interface IProps {
    html: string;
    tag?: string;
    className?: string;
    onLoad?: () => void;
}

function RawHtml({ html = "", tag = "div", className, onLoad }: IProps) {
    useEffect(() => {
        if (!!onLoad) {
            onLoad();
        }
    }, [html]);
    const props: any = {
        dangerouslySetInnerHTML: { __html: html },
    };
    if (!!className) {
        props.className = className;
    }
    return React.createElement(tag, props);
}

export default RawHtml;
