import { useEffect, useState, MouseEvent, useMemo, ReactNode } from "react";
import { Avatar, SxProps } from "@mui/material";

import { getServerFileUrl } from "api/common/helper";

import ImageViewer, { TImageViewerAction } from "./ImageViewer";

interface IImageZoom {
    enabled?: boolean;
    startZoom?: number;
    startRotation?: number;
    minZoom?: number;
    maxZoom?: number;
    description?: string | ReactNode;
    title?: string;
    actions?: TImageViewerAction[];
}

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
    zoom?: boolean | IImageZoom;
}

const defZoomProps: IImageZoom = {
    enabled: false,
    startZoom: 1,
    minZoom: 1,
    maxZoom: 4,
    startRotation: 0,
    actions: ["rotate", "reset", "close"],
    description: "",
    title: "",
};

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
    zoom = false,
    onClick,
}: IProps) {
    const [sxProps, setSxProps] = useState<SxProps>(sx);
    const [styleProps, setStyleProps] = useState(style);
    const [zoomShowed, setZoomShowed] = useState(false);
    const src = useMemo(() => {
        if (url) {
            return url;
        }
        if (image) {
            return getServerFileUrl(image);
        }
        return getServerFileUrl(undefined);
    }, [url, image]);

    const zoomProps = useMemo(() => {
        const newZoomProps = { ...defZoomProps };
        if (!!zoom) {
            if (zoom === true) {
                newZoomProps.enabled = true;
                return newZoomProps;
            }
            return { ...newZoomProps, ...zoom, enabled: true };
        }
        return newZoomProps;
    }, [zoom]);
    useEffect(() => {
        if (!!width || !!height) {
            const newStyle: any = {};
            if (!!width) {
                newStyle.width = width;
            }
            if (!!height) {
                newStyle.height = height;
            }
            if (zoomProps.enabled) {
                newStyle.cursor = "pointer";
            }
            if (avatar) {
                setSxProps(newStyle as SxProps);
            } else {
                setStyleProps(newStyle);
            }
        }
    }, [width, height, avatar, zoomProps.enabled]);

    const imageClick = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (!!onClick) {
            onClick();
        }
        if (zoomProps.enabled) {
            setZoomShowed(true);
        }
    };
    const zoomHide = () => {
        setZoomShowed(false);
    };
    const onError = (e: any) => {
        e.target.src = getServerFileUrl(undefined);
    };
    return (
        <>
            {!!zoomProps.enabled && zoomShowed && (
                <ImageViewer
                    open={zoomShowed}
                    onClose={zoomHide}
                    url={src}
                    {...zoomProps}
                    title={!!zoomProps?.title ? zoomProps.title : alt}
                />
            )}
            {!!avatar ? (
                <Avatar
                    src={src}
                    variant={variant}
                    alt={alt}
                    style={{ ...style, ...styleProps, ...sxProps }}
                    onClick={imageClick}
                />
            ) : (
                <img
                    onError={onError}
                    src={src}
                    alt={alt}
                    onClick={imageClick}
                    style={{ ...style, ...styleProps }}
                />
            )}
        </>
    );
}
