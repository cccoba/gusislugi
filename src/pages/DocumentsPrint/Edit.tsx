import type { IDocumentPrintDto } from "api/interfaces/DocumentPrint/IDocumentPrintDto";
import { Form, Modal } from "components";
import lang from "lang";
import { isMobile } from "react-device-detect";

interface IProps {
    document: IDocumentPrintDto;
    onCancel: () => void;
    onSave: (document: IDocumentPrintDto) => void;
}

export default function DocumentPrintEdit({ document, onCancel, onSave }: IProps) {
    const langPage = lang.pages.documentPrint;
    return (
        <Modal
            open
            fullScreen
            title={langPage.editTitle}
            onClose={onCancel}
            withCloseButton
        >
            <Form
                columnCount={isMobile ? 1 : 2}
                fields={[
                    {
                        name: "title",
                        title: lang.title,
                        type: "text",
                        required: true,
                    },
                    {
                        name: "zipName",
                        title: langPage.zipName,
                        type: "text",
                        required: true,
                    },
                    {
                        name: "originalName",
                        title: langPage.originalName,
                        type: "image",
                        required: true,
                        fieldProps: {
                            previewWidth: "100px",
                            helperText: langPage.originalNameHelperText,
                            imageUploaderProps: {
                                acceptMediaTemplate: "image/png",
                            },
                        },
                    },
                    {
                        name: "exampleName",
                        title: langPage.exampleName,
                        type: "image",
                        required: true,
                        fieldProps: { previewWidth: "100px" },
                    },

                    {
                        name: "params",
                        title: langPage.params,
                        type: "documentPrintParams",
                        originalName: document.originalName,
                        exampleName: document.exampleName,
                    },
                ]}
                values={document}
                onSubmit={onSave}
                onCancel={onCancel}
            />
        </Modal>
    );
}
