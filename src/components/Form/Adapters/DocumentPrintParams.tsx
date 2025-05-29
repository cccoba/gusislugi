import DocumentPrintParamsInput from "components/Inputs/DocumentPrintParamsInput";
import lang from "lang";

import type { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

const langPage = lang.components.form;
export interface IFormFieldDocumentPrintParams extends IFormField {
    type: "documentPrintParams";
    documentId: number;
}

const DocumentPrintParamsAdapter: IFormAdapter = {
    name: "documentPrintParams",
    validate: (v, required) => {
        if (required && !v?.length) {
            return false;
        }
        return true;
    },
    input: ({ fieldProps, fieldParams, value = [], ...props }: IFormAdapterInputProps) => {
        return (
            <DocumentPrintParamsInput
                {...props}
                {...fieldProps}
                documentId={fieldParams.documentId}
                value={value}
            />
        );
    },
};

export default DocumentPrintParamsAdapter;
