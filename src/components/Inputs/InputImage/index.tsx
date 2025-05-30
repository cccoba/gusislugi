import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Skeleton } from "@mui/material";
import lang from "lang";
import { IconButton, Confirm, Icon, Image } from "components";
import ImageUploader from "components/Uploader/ImageUploader";

import { files } from "api/data";
import type { IInputProps } from "api/interfaces/components/IInputProps";
import { useNotifier } from "api/hooks/useNotifier";

import FormControl from "../FormControl";

const langPage = lang.components.inputImage;

type TImageName = string | null;

interface IProps extends IInputProps<TImageName> {
    extension?: string | null;
    imageUploaderProps?: any;
    previewWidth?: string;
    withSelectImage?: boolean;
    maxWidth?: number;
    resumableUpload?: boolean;
    readOnly?: boolean;
}

export default function InputImage({
    label = "",
    fullWidth = true,
    required = false,
    helperText = "",
    variant = "standard",
    error = false,
    value = null,
    disabled = false,
    imageUploaderProps,
    previewWidth = undefined,
    withSelectImage = true,
    maxWidth,
    resumableUpload = true,
    readOnly = false,
    onChangeValue,
}: IProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [imageName, setImageName] = useState<TImageName>(value ? value : null);
    const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
    const [imageUploader, setImageUploader] = useState<boolean>(false);
    const { showError } = useNotifier();

    useEffect(() => {
        setImageName(value ? value : null);
    }, [value]);

    const updateImage = (newName: TImageName) => {
        setImageName(newName);
        onChangeValue(newName);
    };
    const showImageUploader = () => {
        setImageUploader(true);
    };
    const hideImageUploader = () => {
        setImageUploader(false);
    };
    const onSave = (fileName: TImageName, error?: string) => {
        if (fileName) {
            updateImage(fileName);
            hideImageUploader();
        } else if (error) {
            showError(error);
        }
    };

    const onDelete = (confirm = false) => {
        if (confirm && imageName) {
            files.remove(imageName).finally(() => {
                updateImage(null);
                setDeleteConfirm(false);
            });
        } else {
            setDeleteConfirm(false);
        }
    };
    const confirmDelete = () => {
        setDeleteConfirm(true);
    };

    return (
        <>
            <FormControl
                fullWidth={fullWidth}
                error={error}
                required={required}
                disabled={disabled}
                variant={variant}
                label={label}
                helperText={helperText}
            >
                <Box sx={{ mx: 1 }}>
                    {isLoading ? (
                        <Box
                            sx={{
                                position: "relative",
                            }}
                        >
                            <Skeleton
                                variant="circular"
                                width={previewWidth}
                                height={previewWidth}
                            />
                            <CircularProgress
                                size={previewWidth}
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                }}
                            />
                        </Box>
                    ) : imageName ? (
                        <Box>
                            <Image
                                image={imageName}
                                zoom={{ actions: ["rotate", "reset", "close"] }}
                                width={previewWidth}
                            />
                            {!readOnly && (
                                <IconButton
                                    disabled={disabled}
                                    tooltip={lang.delete}
                                    name="delete"
                                    color="error"
                                    onClick={confirmDelete}
                                    sx={{ position: "absolute", ml: -5 }}
                                />
                            )}
                        </Box>
                    ) : (
                        <Box sx={{ pb: 0.5 }}>
                            {readOnly ? (
                                <Image width={previewWidth} />
                            ) : (
                                <>
                                    {!!withSelectImage && (
                                        <Button
                                            sx={{ visibility: disabled ? "hidden" : "visible" }}
                                            name="add"
                                            color="primary"
                                            onClick={showImageUploader}
                                            variant="outlined"
                                            startIcon={<Icon name="add" />}
                                        >
                                            {langPage.addTitle}
                                        </Button>
                                    )}
                                </>
                            )}
                        </Box>
                    )}
                </Box>
            </FormControl>
            {!!imageUploader && (
                <ImageUploader
                    {...imageUploaderProps}
                    onCancel={hideImageUploader}
                    onSave={onSave}
                    onLoading={setIsLoading}
                    title={langPage.addTitle}
                    maxWidth={maxWidth}
                    resumableUpload={resumableUpload}
                />
            )}
            <Confirm
                open={deleteConfirm}
                title={langPage.deleteTitle}
                text={langPage.deleteText}
                onClose={onDelete}
            />
        </>
    );
}
