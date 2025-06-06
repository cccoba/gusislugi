import HTMLEditor from "components/Inputs/HTMLEditor";

import type { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldHTML extends IFormField {
    type: "html";
}

const HTMLAdapter: IFormAdapter = {
    name: "html",
    input: FormInput,
    validate: (v, required) => {
        if (required && !v?.length) {
            return false;
        }
        return true;
    },
};

function FormInput({ fieldProps, fieldParams, value = "", ...props }: IFormAdapterInputProps) {
    return (
        <HTMLEditor
            value={value}
            {...props}
            {...fieldProps}
        />
    );
}

export default HTMLAdapter;
