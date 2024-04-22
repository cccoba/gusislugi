import { TextField } from "@mui/material";

import lang, { sprintf } from "lang";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

const langPage = lang.components.form;
export interface IFormFieldNumber extends IFormField {
    min?: number;
    max?: number;
    step?: number;
    maxLength?: number;
    type: "number";
}

const NumberAdapter: IFormAdapter = {
    name: "number",
    input: FormInput,
    validate: (v, required, { min, max }) => {
        if (!required && !v?.length) {
            return true;
        }
        if (!/^[0-9]+$/.test(v)) {
            return langPage.isNumber;
        }
        const floatValue = parseFloat(v);
        if (typeof min !== "undefined" && !isNaN(floatValue) && min > floatValue) {
            return sprintf(langPage.min, min);
        }
        if (typeof max !== "undefined" && !isNaN(floatValue) && max < floatValue) {
            return sprintf(langPage.max, max);
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
    if (!!fieldParams?.min) {
        fieldProps.inputProps.min = fieldParams.min;
    }
    if (!!fieldParams?.max) {
        fieldProps.inputProps.max = fieldParams.max;
    }
    if (!!fieldParams?.step) {
        fieldProps.inputProps.step = fieldParams.step;
    }
    if (!!fieldParams?.maxLength) {
        fieldProps.inputProps.onKeyPress = (e: any) => {
            if (e.target.value?.length >= fieldParams.maxLength) {
                e.stopPropagation();
                e.preventDefault();
            }
        };
    }
    return (
        <TextField
            onChange={(e: any) => onChangeValue(e.target.value)}
            type="number"
            value={value}
            {...props}
            {...fieldProps}
        />
    );
}

export default NumberAdapter;
