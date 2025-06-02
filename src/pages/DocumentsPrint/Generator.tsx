import { useState } from "react";
import lang, { sprintf } from "lang";
import { Alert, Form, Link, PageOrModal } from "components";

import type { IPageOrModal } from "api/interfaces/components/Page/IPageOrModal";
import { documentPrint, webApiResultData } from "api/data";
import { type IDocumentPrintDto } from "api/interfaces/DocumentPrint/IDocumentPrintDto";
import useLoadApiData from "api/hooks/useLoadApiData";
import type { IDocumentPrintCreateDto } from "api/interfaces/DocumentPrint/IDocumentPrintCreateDto";
import { useLoader } from "api/hooks/redux";
import { useNotifier } from "api/hooks/useNotifier";
import type { IDocumentPrintCreateResultDto } from "api/interfaces/DocumentPrint/IDocumentPrintCreateResultDto";

interface IProps extends IPageOrModal {
    documentId: number;
}
export default function DocumentPrintGenerator({ documentId, ...pageProps }: IProps) {
    const langPage = lang.pages.documentPrint;
    const { data, isLoading } = useLoadApiData<IDocumentPrintDto[]>(documentPrint.crudList, []);
    const [result, setResult] = useState<null | IDocumentPrintCreateResultDto>(null);
    const { showError } = useNotifier();
    const { setIsLoading } = useLoader();
    const defaultValues: IDocumentPrintCreateDto = {
        userIds: [],
        documentId: documentId,
    };
    const toCreate = (values: IDocumentPrintCreateDto) => {
        setIsLoading(true);
        documentPrint
            .create(values)
            .then((res) => {
                const { error, result } = webApiResultData<IDocumentPrintCreateResultDto>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    setResult(result);
                }
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.create);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <PageOrModal
            title={langPage.title}
            isLoading={isLoading}
            {...pageProps}
        >
            <Form
                fields={[
                    {
                        name: "userIds",
                        title: "",
                        type: "user",
                        multiple: true,
                        fieldProps: { withOutImage: true },
                        required: true,
                    },
                    {
                        name: "documentId",
                        title: langPage.document,
                        type: "list",
                        values: (data || []).map((x) => ({ id: x.id, title: x.title })),
                        required: true,
                    },
                ]}
                values={defaultValues}
                onSubmit={toCreate}
                onCancel={pageProps?.modalProps?.onClose}
            />
            {result && (
                <Alert
                    type="success"
                    text={sprintf(langPage.modal.text, result.files)}
                    title={langPage.modal.success}
                    actionArea={
                        <Link
                            url={result.link}
                            target="_blank"
                        >
                            {langPage.modal.download}
                        </Link>
                    }
                />
            )}
        </PageOrModal>
    );
}
