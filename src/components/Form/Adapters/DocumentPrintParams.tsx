import DocumentPrintParamsInput from "components/Inputs/DocumentPrintParamsInput";
import lang from "lang";

import type { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";
export interface IFormFieldDocumentPrintParams extends IFormField {
    type: "documentPrintParams";
    originalName?: string;
    exampleName?: string;
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
                originalName={fieldParams.originalName}
                exampleName={fieldParams.exampleName}
                value={value}
            />
        );
    },
};

export default DocumentPrintParamsAdapter;
