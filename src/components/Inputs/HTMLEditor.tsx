import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import wordFilter from "tinymce-word-paste-filter";
import { Typography } from "@mui/material";

import lang from "lang";

import { getFileExt } from "api/common/files";
import { files, webApiResultData } from "api/data";
import getConst from "api/common/getConst";
import { useNotifier } from "api/hooks/useNotifier";
import { getServerFileUrl, isUrl } from "api/common/helper";

import FormControl from "./FormControl";

interface IProps {
    label?: string;
    fullWidth?: boolean;
    error?: boolean;
    required?: boolean;
    helperText?: string;
    variant?: "filled" | "outlined" | "standard";
    value?: string;
    onChangeValue: (value: string) => void;
    menubar?: boolean;
    fileExts?: string[];
    imageExts?: string[];
    audioExts?: string[];
}

interface INotificationProps {
    text: string;
    type?: "success" | "info" | "warning" | "error";
    timeout?: number;
}

const langPage = lang.components.htmlEditor;

const imageUploader = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        files
            .uploadFile(file)
            .then((res) => {
                const { error, result } = webApiResultData<string>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    resolve(getServerFileUrl(result));
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const imageUploaderFromBlob = (blob: any, filename: string) => {
    return imageUploader(new File([blob], filename));
};

export default function HTMLEditor({
    label = "",
    fullWidth = true,
    required = false,
    helperText = "",
    variant = "outlined",
    error = false,
    value = "",
    onChangeValue,
    menubar = true,
    fileExts = ["doc", "docx", "tiff", "xls", "xlsx", "pdf"],
    imageExts = ["jpg", "jpeg", "gif", "png", "svg"],
    audioExts = ["mp3"],
    ...props
}: IProps) {
    const editorRef = useRef<any>(null);
    const hiddenFileRef = useRef<any>(null);
    const [editorValue, setEditorValue] = useState(value);
    const [isLoading, setIsLoading] = useState(true);
    const { showError } = useNotifier();

    const toChange = (e: any) => {
        onChangeValue(e.target.getContent());
    };
    const showEditorNotification = (notification: INotificationProps) => {
        if (editorRef?.current) {
            editorRef.current.editor.notificationManager.open({
                ...notification,
            });
        }
    };
    const onEditorDrop = (e: any) => {
        const files = e.dataTransfer.files;
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        uploadFiles(files);
    };
    const uploadFiles = (files: FileList, fileTypeFormat = "") => {
        if (!!files?.length && !!editorRef?.current) {
            for (let i = 0; i < files.length; i++) {
                const file = files.item(i);
                if (file) {
                    const fileExt = getFileExt(file.name);
                    let fileType = "";
                    if (imageExts?.length && imageExts.indexOf(fileExt) > -1) {
                        fileType = "image";
                    } else if (audioExts?.length && audioExts.indexOf(fileExt) > -1) {
                        fileType = "audio";
                    } else if (!fileExts?.length || fileExts.indexOf(fileExt) > -1) {
                        fileType = "link";
                    } else {
                        showEditorNotification({
                            text: langPage.errors.fileExtFormat,
                            type: "error",
                            timeout: 5000,
                        });
                        return;
                    }
                    if (fileTypeFormat) {
                        fileType = fileTypeFormat;
                    }
                    imageUploader(file)
                        .then((link) => {
                            let content = `<a href="${link}">${file.name}</a>`;
                            switch (fileType) {
                                case "image":
                                    content = `<img src="${link}"  />`;
                                    break;
                                case "audio":
                                    content = `<audio controls src="${link}"></audio>`;
                                    break;
                            }
                            editorRef.current.editor.insertContent(content);
                        })
                        .catch((err) => {
                            showEditorNotification({
                                text: langPage.errors.fileUpload,
                                type: "error",
                                timeout: 5000,
                            });
                        });
                }
            }
        }
    };
    const editorSetup = (editor: any) => {
        editor.ui.registry.addButton("addFileButton", {
            icon: "upload",
            tooltip: langPage.uploadFile,
            disabled: true,
            onAction: function (_: any) {
                if (hiddenFileRef?.current) {
                    hiddenFileRef.current.click();
                }
            },
        });
        editor.ui.registry.addButton("addVideoButton", {
            icon: "embed",
            tooltip: langPage.video.title,
            disabled: true,
            onAction: function (_: any) {
                showAddVideo();
            },
        });
        editor.ui.registry.addButton("addIframeButton", {
            icon: "browse",
            tooltip: langPage.iframe.title,
            disabled: true,
            onAction: function (_: any) {
                showAddIframe();
            },
        });
    };
    const onHiddenFileChange = (e: any) => {
        if (e.target.files?.length) {
            uploadFiles(e.target.files, "link");
        }
    };
    const onPaste = (_: any, args: any) => {
        if (editorRef?.current) {
            const editor = editorRef.current.editor;
            const html = args.node.innerHTML;
            const content = editorRef.current.editor.getContent();
            editor.windowManager.open({
                title: langPage.paste.title,
                body: {
                    type: "panel",
                    items: [
                        {
                            type: "htmlpanel",
                            html: langPage.paste.text,
                        },
                    ],
                },
                buttons: [
                    {
                        type: "cancel",
                        text: langPage.paste.cancel,
                    },
                    {
                        type: "submit",
                        text: langPage.paste.ok,
                        primary: true,
                    },
                ],
                onSubmit: () => {
                    const newValue = content + wordFilter(html);
                    editor.setContent(newValue);
                    editor.windowManager.close();
                    toEditorChange(newValue);
                },
                onCancel: () => {
                    editor.windowManager.close();
                },
            });
        }
    };
    const toEditorChange = (newValue: string) => {
        onChangeValue(newValue);
    };
    const editorIsInit = () => {
        setIsLoading(false);
        setEditorValue(value);
    };
    const showAddVideo = () => {
        if (editorRef?.current) {
            const editor = editorRef.current.editor;
            const content = editorRef.current.editor.getContent();
            editor.windowManager.open({
                title: langPage.video.title,
                body: {
                    type: "panel",
                    items: [
                        {
                            type: "input",
                            name: "videoLink",
                            label: langPage.video.link,
                            inputMode: "url",
                        },
                        {
                            type: "listbox",
                            name: "aspectRatio",
                            label: langPage.video.aspectRatio,
                            items: [
                                {
                                    text: langPage.video.aspectRatioHorizontally,
                                    value: "horizontally",
                                },
                                { text: langPage.video.aspectRatioVertical, value: "vertical" },
                            ],
                        },
                        {
                            type: "listbox",
                            name: "type",
                            label: langPage.video.type,
                            items: [
                                { text: langPage.video.typeRutube, value: "rutube" },
                                { text: langPage.video.typeYoutube, value: "youtube" },
                            ],
                        },
                    ],
                },
                buttons: [
                    {
                        type: "cancel",
                        text: langPage.video.cancel,
                    },
                    {
                        type: "submit",
                        text: langPage.video.ok,
                        primary: true,
                    },
                ],
                onSubmit: (result: any) => {
                    const { videoLink = "", aspectRatio = "horizontally", type = "youtube" } = result.getData();
                    let error = "";
                    if (videoLink) {
                        if (isUrl(videoLink)) {
                            let src = videoLink;
                            if (type === "rutube") {
                                src = videoLink.replace("/video/private/", "/play/embed/");
                                src = src.replace("/video/", "/play/embed/");
                            }
                            const html = `<video src="${src}" class="video-aspect-ratio-${aspectRatio} video-type-${type}" />`;

                            editor.setContent(content + html);
                            editor.windowManager.close();
                            return;
                        }
                        error = langPage.video.errors.isNotLink;
                    } else {
                        error = langPage.video.errors.noVideoLink;
                    }

                    showError(error);
                },
                onCancel: () => {
                    editor.windowManager.close();
                },
            });
        }
    };
    const showAddIframe = () => {
        if (editorRef?.current) {
            const editor = editorRef.current.editor;
            const content = editorRef.current.editor.getContent();
            editor.windowManager.open({
                title: langPage.iframe.title,
                body: {
                    type: "panel",
                    items: [
                        {
                            type: "input",
                            name: "iframeLink",
                            label: langPage.iframe.link,
                            inputMode: "url",
                        },
                        {
                            type: "listbox",
                            name: "aspectRatio",
                            label: langPage.iframe.aspectRatio,
                            items: [
                                {
                                    text: langPage.iframe.aspectRatioHorizontally,
                                    value: "horizontally",
                                },
                                { text: langPage.iframe.aspectRatioVertical, value: "vertical" },
                            ],
                        },
                    ],
                },
                buttons: [
                    {
                        type: "cancel",
                        text: langPage.iframe.cancel,
                    },
                    {
                        type: "submit",
                        text: langPage.iframe.ok,
                        primary: true,
                    },
                ],
                onSubmit: (result: any) => {
                    const { iframeLink = "", aspectRatio = "horizontally" } = result.getData();
                    let error = "";
                    if (iframeLink) {
                        if (isUrl(iframeLink)) {
                            const html = `<iframe src="${iframeLink}" frameborder="0" scrolling="auto" allowfullscreen="allowfullscreen" class="iframe-${aspectRatio}"></iframe>`;
                            editor.setContent(content + html);
                            editor.windowManager.close();
                            return;
                        }
                        error = langPage.iframe.errors.isNotLink;
                    } else {
                        error = langPage.iframe.errors.noVideoLink;
                    }

                    showError(error);
                },
                onCancel: () => {
                    editor.windowManager.close();
                },
            });
        }
    };

    return (
        <FormControl
            helperText={helperText}
            fullWidth={fullWidth}
            error={error}
            required={required}
            variant={variant}
            label={label}
        >
            <Editor
                ref={editorRef}
                apiKey={getConst("tiny-mce")}
                initialValue={editorValue}
                init={{
                    language: "ru",
                    height: 500,
                    menubar: menubar,
                    images_upload_handler: (blobInfo: any) =>
                        imageUploaderFromBlob(blobInfo.blob(), blobInfo.filename()),
                    file_picker_types: "file image media",
                    font_family_formats:
                        "Default=core,sans-serif;Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva;",
                    plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "help",
                        "wordcount",
                    ],
                    toolbar:
                        "undo redo | image addFileButton addVideoButton addIframeButton| formatselect | " +
                        "bold italic backcolor | fontfamily fontsize | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat ",
                    setup: editorSetup,
                    convert_fonts_to_spans: true,
                    paste_postprocess: onPaste,
                }}
                onChange={toChange}
                onDrop={onEditorDrop}
                onEditorChange={toEditorChange}
                onInit={editorIsInit}
                disabled={isLoading}
            />
            <input
                ref={hiddenFileRef}
                type="file"
                name="hiddenFile"
                id="hiddenFile"
                onChange={onHiddenFileChange}
                multiple
                style={{ display: "none" }}
            />
            {isLoading && <Typography variant="caption">{langPage.loading}</Typography>}
        </FormControl>
    );
}
