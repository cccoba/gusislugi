import { TextField } from "@mui/material";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldText extends IFormField {
    minLength?: number;
    maxLength?: number;
    type: "text";
    multiline?: boolean;
}

const TextAdapter: IFormAdapter = {
    name: "text",
    input: FormInput,
    validate: (v, required) => {
        if (!!required && !v?.length) {
            return false;
        }
        return true;
    },
};

function FormInput({ onChangeValue, value = "", fieldProps, fieldParams, ...props }: IFormAdapterInputProps) {
    if (!fieldProps) {
        fieldProps = {};
    }
    if (!fieldProps?.inputProps) {
        fieldProps.inputProps = {};
    }
    if (fieldParams?.maxLength) {
        fieldProps.inputProps.maxLength = fieldParams.maxLength;
    }
    if (fieldParams?.minLength) {
        fieldProps.inputProps.minLength = fieldParams.minLength;
    }
    if (fieldParams?.multiline) {
        fieldProps.multiline = true;
    }
    return (
        <TextField
            onChange={(e: any) => onChangeValue(e.target.value)}
            value={value}
            {...props}
            {...fieldProps}
        />
    );
}

export default TextAdapter;
