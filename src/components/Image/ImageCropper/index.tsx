import { useCallback, useEffect, useMemo, useState } from "react";
import { Backdrop, Box, Typography } from "@mui/material";
import Cropper, { Area, MediaSize } from "react-easy-crop";

import ImageCropperActions from "./Action";
import getCroppedImg, { resizeImage } from "./helper";
import ImageCropperPreview from "./Preview";

export type TImageCropperAction = "crop" | "rotate" | "reset" | "save" | "close";
export type TImageCropperVariant = "none" | "vertical" | "horizontal" | "square";

interface IProps {
    open: boolean;
    imageSrc?: any;
    title?: string;
    actions?: TImageCropperAction[];
    onClose?: () => void;
    startZoom?: number;
    startRotation?: number;
    minZoom?: number;
    maxZoom?: number;
    round?: boolean;
    cropVariants?: TImageCropperVariant[];
    initialCropVariant?: TImageCropperVariant;
    onChange?: (result: string) => void;
    maxWidth?: number;
    imageFormat?: "jpeg" | "png";
}

const defCrop = { x: 0, y: 0 };

const ImageCropper = ({
    imageSrc = "",
    startZoom = 1,
    startRotation = 0,
    title = "",
    open = false,
    actions = ["crop", "rotate", "reset", "save", "close"],
    cropVariants = ["none", "horizontal", "vertical", "square"],
    initialCropVariant = "none",
    round = false,
    onClose,
    onChange,
    maxWidth,
    imageFormat = "jpeg",
    ...props
}: IProps) => {
    const [cropVariant, setCropVariant] = useState<TImageCropperVariant>(initialCropVariant);
    const [imageWithMaxWidthSrc, setImageWithMaxWidthSrc] = useState<any>("");
    const [crop, setCrop] = useState(defCrop);
    const [zoom, setZoom] = useState(startZoom);
    const [rotation, setRotation] = useState(startRotation);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0, title: "" });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [croppedImage, setCroppedImage] = useState<any>("");
    useEffect(() => {
        setCropVariant(initialCropVariant);
    }, [initialCropVariant]);
    const backdropSx = useMemo(() => {
        const sx: any = {
            zIndex: (theme: any) => theme.zIndex.drawer + 1,
        };
        if (cropVariant === "none" && !round) {
            sx["& .reactEasyCrop_CropArea"] = {
                display: "none",
            };
        }
        return sx;
    }, [cropVariant, round]);
    useEffect(() => {
        if (!open) {
            setCrop(defCrop);
            setZoom(startZoom);
        }
    }, [open]);
    useEffect(() => {
        setZoom(startZoom);
    }, [startZoom]);
    const aspect = useMemo(() => {
        if (round) {
            return 1;
        }
        switch (cropVariant) {
            case "horizontal":
                return 4 / 3;
            case "vertical":
                return 3 / 4;
        }
        return 1;
    }, [cropVariant, round]);
    useEffect(() => {
        if (imageSrc) {
            if (maxWidth) {
                resizeImage(imageSrc, maxWidth, setImageWithMaxWidthSrc);
            } else {
                setImageWithMaxWidthSrc(imageSrc);
            }
        }
    }, [imageSrc, maxWidth]);

    const showCroppedImage = useCallback(async () => {
        if (croppedAreaPixels && onChange) {
            try {
                if (cropVariant === "none") {
                    const area: Area = { width: imageSize.width, height: imageSize.height, x: 0, y: 0 };
                    if (rotation === 90 || rotation === 270) {
                        area.width = imageSize.height;
                        area.height = imageSize.width;
                    }
                    const croppedImage = await getCroppedImg(
                        imageWithMaxWidthSrc,
                        area,
                        rotation,
                        round,
                        { horizontal: false, vertical: false },
                        "dataURL",
                        imageFormat
                    );
                    if (!!croppedImage && onChange) {
                        onChange(croppedImage);
                    }
                } else {
                    const croppedImage = await getCroppedImg(
                        imageWithMaxWidthSrc,
                        croppedAreaPixels,
                        rotation,
                        round,
                        { horizontal: false, vertical: false },
                        "dataURL",
                        imageFormat
                    );
                    if (!!croppedImage) {
                        setCroppedImage(croppedImage);
                    }
                }
            } catch (e) {}
        }
    }, [croppedAreaPixels, rotation, cropVariant, imageSize.height, imageSize.width, imageFormat]);

    const toClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const onAction = (action: TImageCropperAction, value: any) => {
        switch (action) {
            case "close":
                toClose();
                break;
            case "save":
                showCroppedImage();
                break;
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
            case "crop":
                setCropVariant(value);
                break;
        }
    };
    const toSave = () => {
        if (!!croppedImage && onChange) {
            onChange(croppedImage);
        }
    };
    const onLoad = (data: MediaSize) => {
        setImageSize({
            width: data.naturalWidth,
            height: data.naturalHeight,
            title: `${data.naturalWidth} × ${data.naturalHeight} px`,
        });
    };
    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);
    const toCroppedSave = (result: boolean) => {
        if (result) {
            toSave();
        } else {
            setCroppedImage("");
        }
    };
    return (
        <Backdrop
            sx={backdropSx}
            open={open}
        >
            {!!croppedImage ? (
                <ImageCropperPreview
                    imageSrc={croppedImage}
                    onClose={toCroppedSave}
                />
            ) : (
                <>
                    <Cropper
                        image={imageWithMaxWidthSrc}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        aspect={aspect}
                        showGrid={cropVariant !== "none"}
                        onMediaLoaded={onLoad}
                        onCropComplete={onCropComplete}
                        cropShape={!!round ? "round" : "rect"}
                        {...props}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: "6em",
                            px: "3em",
                        }}
                    >
                        {!!title && <Typography sx={{ textShadow: "#fff 0 0 2px" }}>{title}</Typography>}
                        {!!imageSize.title && (
                            <Typography
                                align="center"
                                sx={{ textShadow: "#fff 0 0 2px" }}
                            >
                                {imageSize.title}
                            </Typography>
                        )}
                    </Box>
                    {!!actions?.length && (
                        <ImageCropperActions
                            onAction={onAction}
                            actions={actions}
                            cropVariants={cropVariants}
                            cropVariant={cropVariant}
                        />
                    )}
                </>
            )}
        </Backdrop>
    );
};
export default ImageCropper;
