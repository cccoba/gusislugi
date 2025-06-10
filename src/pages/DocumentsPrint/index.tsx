import { useState } from "react";

import lang from "lang";
import { GoodTable, Page } from "components";
import type { IPage } from "api/interfaces/components/Page/IPage";
import { documentPrint, webApiResultData } from "api/data";
import useLoadApiData from "api/hooks/useLoadApiData";
import type { IDocumentPrintDto } from "api/interfaces/DocumentPrint/IDocumentPrintDto";
import { useLoader } from "api/hooks/redux";

import { useNotifier } from "api/hooks/useNotifier";

import { isMobile } from "react-device-detect";

import DocumentPrintEdit from "./Edit";
import DocumentPrintGenerator from "./Generator";

export default function DocumentsPrint({ ...pageProps }: IPage) {
    const langPage = lang.pages.documentPrint;
    const { data, isLoading, refetch } = useLoadApiData<IDocumentPrintDto[]>(documentPrint.crudList, []);
    const [selectedDocument, setSelectedDocument] = useState<IDocumentPrintDto | null>(null);
    const [isGeneratorShowed, setIsGeneratorShowed] = useState<boolean | number>(false);
    const { setIsLoading } = useLoader();
    const { showError, showSuccess } = useNotifier();
    const toAdd = () => {
        setSelectedDocument({
            id: 0,
            title: "",
            zipName: "",
            originalName: "",
            exampleName: "",
            params: [],
        });
    };
    const toEdit = ([value]: IDocumentPrintDto[]) => {
        setSelectedDocument(value);
    };
    const toDelete = ([value]: IDocumentPrintDto[]) => {
        setIsLoading(true);
        documentPrint
            .crudDelete([value.id])
            .then((res) => {
                const { error, result } = webApiResultData<boolean>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    showSuccess(langPage.success.remove);
                    refetch();
                }
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.remove);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    const toPrint = (selectedRows: IDocumentPrintDto[]) => {
        setIsGeneratorShowed(selectedRows.length === 1 ? selectedRows[0].id : true);
    };
    const hideSelectedDocument = () => {
        setSelectedDocument(null);
    };
    const toSave = (document: IDocumentPrintDto) => {
        setIsLoading(true);
        documentPrint
            .crudSave(document)
            .then((res) => {
                const { error, result } = webApiResultData<boolean>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    showSuccess(langPage.success.save);
                    refetch();
                    hideSelectedDocument();
                }
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.save);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    const hideGenerator = () => {
        setIsGeneratorShowed(false);
    };

    return (
        <Page
            title={langPage.title}
            isLoading={isLoading}
            {...pageProps}
        >
            {isGeneratorShowed !== false && (
                <DocumentPrintGenerator
                    roles={pageProps.roles}
                    title={langPage.modal.title}
                    documentId={typeof isGeneratorShowed === "number" ? isGeneratorShowed : 1}
                    modalProps={{
                        withCloseButton: true,
                        onClose: hideGenerator,
                    }}
                />
            )}
            {selectedDocument && (
                <DocumentPrintEdit
                    document={selectedDocument}
                    onCancel={hideSelectedDocument}
                    onSave={toSave}
                />
            )}
            <GoodTable<IDocumentPrintDto>
                fields={[
                    {
                        name: "id",
                        title: lang.id,
                        format: "number",
                        width: "100px",
                    },
                    {
                        name: "title",
                        title: langPage.title,
                    },
                ]}
                values={data || []}
                onRowDoubleClick={(x: IDocumentPrintDto) => toEdit([x])}
                actions={[
                    { name: "refresh", icon: "refresh", onClick: refetch },
                    { name: "print", icon: "print", onClick: toPrint },
                    { name: "add", icon: "add", onClick: toAdd },
                    {
                        name: "edit",
                        icon: "edit",
                        onClick: toEdit,
                        disable: (selectedRows: IDocumentPrintDto[]) => selectedRows.length !== 1,
                    },
                    {
                        name: "delete",
                        icon: "delete",
                        color: "error",
                        onClick: toDelete,
                        disable: (selectedRows: IDocumentPrintDto[]) => selectedRows.length !== 1,
                    },
                ]}
                pagination={{
                    pageSize: 25,
                    rowsPerPage: [10, 25, 100],
                }}
            />
        </Page>
    );
}
