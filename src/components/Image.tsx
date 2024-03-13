import { useEffect, useState, MouseEvent, useMemo } from "react";
import { Avatar, SxProps } from "@mui/material";

import { getServerFileUrl } from "api/common/helper";

interface IProps {
    url?: string;
    image?: string;
    alt?: string;
    avatar?: boolean;
    rounded?: boolean;
    variant?: "square" | "rounded" | "circular";
    sx?: SxProps;
    width?: string;
    height?: string;
    onClick?: Function;
    style?: any;
}

export default function Image({
    url,
    image,
    sx = {},
    alt = undefined,
    avatar = false,
    variant = "square",
    style = null,
    width = "",
    height = "",
    onClick,
}: IProps) {
    const [sxProps, setSxProps] = useState<SxProps>(sx);
    const [styleProps, setStyleProps] = useState(style);
    const src = useMemo(() => {
        if (url) {
            return url;
        }
        if (image) {
            return getServerFileUrl(image);
        }
        return getServerFileUrl(undefined);
    }, [url, image]);
    useEffect(() => {
        if (!!width || !!height) {
            const newStyle: any = {};
            if (!!width) {
                newStyle.width = width;
            }
            if (!!height) {
                newStyle.height = height;
            }
            if (avatar) {
                setSxProps(newStyle as SxProps);
            } else {
                setStyleProps(newStyle);
            }
        }
    }, [width, height, avatar]);

    const imageClick = (e: MouseEvent<HTMLElement>) => {
        if (!!onClick) {
            e.preventDefault();
            onClick();
        }
    };
    const onError = (e: any) => {
        e.target.src = getServerFileUrl(undefined);
    };
    if (avatar) {
        return (
            <Avatar
                src={url}
                variant={variant}
                alt={alt}
                style={{ ...style, ...styleProps, ...sxProps }}
                onClick={imageClick}
            />
        );
    }
    return (
        <img
            onError={onError}
            src={url}
            alt={alt}
            onClick={imageClick}
            style={{ ...style, ...styleProps }}
        />
    );
}
