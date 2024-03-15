import { ChangeEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Skeleton, CircularProgress } from "@mui/material";

import lang from "lang";
import Modal from "components/Modal";

import ImageCropper, { TImageCropperVariant } from "components/Image/ImageCropper";

import { dataURLtoBlob, getFileExt } from "api/common/files";
import { files } from "api/data";
import { webApiResultData } from "api/data/dataProvider";

import Icon from "../Icon";

const langPage = lang.components.uploader.imageUploader;

interface IProps {
    children?: ReactNode;
    initialCropVariant?: TImageCropperVariant;
    round?: boolean;
    onCancel?: () => void;
    onSave: (fileName: string | null, error?: string) => void;
    title?: string;
    noChange?: boolean;
    onLoading?: (isLoading: boolean) => void;
    maxWidth?: number;
    acceptMediaTemplate?: string;
}

export default function ImageUploader({
    children,
    initialCropVariant = "none",
    round = false,
    title = "",
    noChange = false,
    maxWidth,
    onLoading,
    onCancel,
    onSave,
    acceptMediaTemplate = "image/*",
}: IProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [showEditor, setShowEditor] = useState<boolean>(false);
    const [imageSource, setImageSource] = useState<string | ArrayBuffer | null>(null);
    const [isVideoExpandedView, setIsVideoExpandedView] = useState(false);
    const [imageFormat, setImageFormat] = useState<"jpeg" | "png">("jpeg");
    const fileName = useRef("");
    const inputFileRef = useRef<any>(null);
    useEffect(() => {
        setTimeout(() => {
            if (inputFileRef.current) {
                inputFileRef.current.click();
            }
        }, 1);
    }, []);
    const showLoader = (loading: boolean) => {
        setIsLoading(loading);
        if (!!onLoading) {
            onLoading(loading);
        }
    };
    const toSave = (imageBlob: any) => {
        var file = new File([dataURLtoBlob(imageBlob)], fileName.current);
        setIsLoading(true);
        files
            .uploadFile(file)
            .then((res) => {
                const { error, result } = webApiResultData<any>(res);
                if (error) {
                    throw error;
                }
                onSave(result);
            })
            .catch((err) => {
                onSave(null, err?.name === "webApiResultError" ? err.message : langPage.errors.uploadFile);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const onFileLoad = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) return;
        showLoader(true);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        fileName.current = file.name;
        const fileExt = getFileExt(file.name);
        setImageFormat(fileExt === "png" ? "png" : "jpeg");
        reader.onloadend = (e) => {
            if (noChange) {
                if (reader?.result) {
                    toSave(reader.result);
                }
            } else {
                setImageSource(reader?.result);
                setShowEditor(true);
                setIsVideoExpandedView(true);
            }
            showLoader(false);
        };
    };

    return (
        <>
            <Modal
                open
                onClose={onCancel}
                title={title}
            >
                <Box>
                    <Box sx={{ mb: 4 }}>
                        {showEditor ? (
                            <ImageCropper
                                open
                                imageSrc={imageSource}
                                initialCropVariant={initialCropVariant}
                                round={round}
                                onChange={toSave}
                                onClose={onCancel}
                                maxWidth={maxWidth}
                                imageFormat={imageFormat}
                            />
                        ) : (
                            <>
                                <input
                                    accept={acceptMediaTemplate}
                                    id="icon-button-photo"
                                    onChange={onFileLoad}
                                    type="file"
                                    style={{ display: "none" }}
                                    ref={inputFileRef}
                                />
                                {!!isLoading ? (
                                    <Box
                                        sx={{
                                            position: "relative",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Skeleton
                                            variant="circular"
                                            width={100}
                                            height={100}
                                        />
                                        <CircularProgress
                                            size={100}
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                            }}
                                        />
                                    </Box>
                                ) : (
                                    <label htmlFor="icon-button-photo">
                                        {!!children ? (
                                            children
                                        ) : (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    bgcolor: "primary.main",
                                                    color: "common.white",
                                                    p: 1,
                                                    borderRadius: 2,
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <Icon name="add" />
                                                {langPage.add}
                                            </Box>
                                        )}
                                    </label>
                                )}
                            </>
                        )}
                    </Box>
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            bgcolor: "#fff",
                            left: 0,
                            right: 0,
                            height: "3em",
                            display: isVideoExpandedView ? "none" : "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            pr: 1,
                        }}
                    >
                        {!!onCancel && (
                            <Button
                                onClick={onCancel}
                                color="inherit"
                                disabled={isLoading}
                            >
                                {langPage.toCancel}
                            </Button>
                        )}
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
