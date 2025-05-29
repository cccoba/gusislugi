import type { IDocumentPrintDto } from "api/interfaces/DocumentPrint/IDocumentPrintDto";
import { Form, Modal } from "components";
import lang from "lang";

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
                fields={[
                    {
                        name: "title",
                        title: lang.title,
                        type: "text",
                        required: true,
                    },
                    {
                        name: "image",
                        title: langPage.image,
                        type: "text",
                        required: true,
                    },
                    {
                        name: "params",
                        title: langPage.params.title,
                        type: "documentPrintParams",
                        documentId: document.id,
                    },
                ]}
                values={document}
                onSubmit={onSave}
                onCancel={onCancel}
            />
        </Modal>
    );
}
