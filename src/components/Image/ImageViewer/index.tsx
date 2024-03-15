import { ReactNode, useEffect, useRef, useState } from "react";
import { Backdrop, Box, Typography } from "@mui/material";
import Cropper, { MediaSize } from "react-easy-crop";

import Alert from "components/Alert";
import lang from "lang";

import { useKeyPress } from "api/hooks/useKeyPress";

import ImageViewerActions from "./Actions";

const langPage = lang.components.image.viewer;
export type TImageViewerAction = "download" | "rotate" | "reset" | "close";

interface IProps {
    open: boolean;
    url?: string;
    title?: string;
    description?: string | ReactNode;
    actions?: TImageViewerAction[];
    onClose?: () => void;
    onImageClick?: () => void;
    startZoom?: number;
    startRotation?: number;
    minZoom?: number;
    maxZoom?: number;
    noBackdrop?: boolean;
    showSize?: boolean;
}

const defCrop = { x: 0, y: 0 };

const ImageViewer = ({
    url = "",
    startZoom = 1,
    startRotation = 0,
    title = "",
    description = "",
    open = false,
    actions = ["rotate", "reset", "close"],
    onClose,
    onImageClick,
    noBackdrop = false,
    showSize = false,
    ...props
}: IProps) => {
    const [crop, setCrop] = useState(defCrop);
    const [zoom, setZoom] = useState(startZoom);
    const [rotation, setRotation] = useState(startRotation);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0, title: "" });
    const [showError, setShowError] = useState(false);
    const imageRef = useRef<HTMLImageElement>();
    useKeyPress(onKeyPress);
    useEffect(() => {
        if (!open) {
            setCrop(defCrop);
            setZoom(startZoom);
        }
    }, [open, startZoom]);
    useEffect(() => {
        setShowError(false);
    }, [url]);
    useEffect(() => {
        setZoom(startZoom);
    }, [startZoom]);
    function onKeyPress(e: any) {
        switch (e.code) {
            case "Escape":
                toClose();
                break;
            case "KeyX":
                onAction("rotate", "left");
                break;
            case "KeyC":
                onAction("rotate", "right");
                break;
            case "KeyR":
                onAction("reset");
                break;
        }
    }

    const onAction = (action: TImageViewerAction, value?: any) => {
        switch (action) {
            case "rotate":
                if (value === "left") {
                    setRotation((prev) => (prev === 0 ? 270 : prev - 90));
                } else {
                    setRotation((prev) => (prev === 270 ? 0 : prev + 90));
                }
                break;
            case "reset":
                setRotation(0);
                setCrop(defCrop);
                setZoom(startZoom);
                break;
            case "close":
                toClose();
                break;
        }
    };
    const onLoad = (data: MediaSize) => {
        setImageSize({
            width: data.naturalWidth,
            height: data.naturalHeight,
            title: `${data.naturalWidth} × ${data.naturalHeight} px`,
        });
    };
    const toImageClick = () => {
        if (onImageClick) {
            onImageClick();
        }
    };
    const toClose = () => {
        if (onClose) {
            onClose();
        }
    };
    const onImageError = (event: any) => {
        setShowError(true);
    };
    const onImageLoad = (event: any) => {
        setShowError(false);
    };
    const setImageRef = (ref: React.RefObject<HTMLImageElement>) => {
        if (ref.current) {
            imageRef.current = ref.current;
            imageRef.current.onerror = onImageError;
            imageRef.current.onload = onImageLoad;
        }
    };
    if (!open) {
        return null;
    }
    return (
        <Backdrop
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,

                backgroundColor: noBackdrop ? "transparent" : "rgba(0, 0, 0, 0.5)",
                "& .reactEasyCrop_CropArea": {
                    display: "none",
                },
            }}
            open
            onClick={toImageClick}
            onKeyDown={onKeyPress}
        >
            {!!title && (
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        p: 1,
                        bgcolor: "#fff",
                        textAlign: "center",
                        zIndex: (theme) => theme.zIndex.drawer + 2,
                    }}
                >
                    {title}
                </Box>
            )}
            {showError ? (
                <Alert
                    title={lang.error}
                    text={langPage.errors.load}
                />
            ) : (
                <Cropper
                    image={url}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    showGrid={false}
                    onMediaLoaded={onLoad}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    setImageRef={setImageRef}
                    {...props}
                />
            )}
            {((!!showSize && !!imageSize.title) || !!description) && (
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "6em",
                        left: 0,
                        right: 0,
                        px: "44px",
                        py: 1,
                        bgcolor: "#fff",
                        display: "inline",
                        zIndex: (theme) => theme.zIndex.drawer + 2,
                    }}
                >
                    {!!description && (
                        <>
                            {typeof description === "object" ? (
                                description
                            ) : (
                                <Typography sx={{ textShadow: "#fff 0 0 2px" }}>{description}</Typography>
                            )}
                        </>
                    )}
                    {!!showSize && !!imageSize.title && <Typography align="center">{imageSize.title}</Typography>}
                </Box>
            )}
            {!!actions?.length && (
                <ImageViewerActions
                    onAction={onAction}
                    actions={actions}
                />
            )}
        </Backdrop>
    );
};
export default ImageViewer;
