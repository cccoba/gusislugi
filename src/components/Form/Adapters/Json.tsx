import { useMemo, useState } from "react";
import { TextField } from "@mui/material";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldJson extends IFormField {
    type: "json";
}

const JsonAdapter: IFormAdapter = {
    name: "json",
    input: FormInput,
    validate: (v, required) => {
        return true;
    },
};

function FormInput({ onChangeValue, value, fieldProps, fieldParams, ...props }: IFormAdapterInputProps) {
    const stringValue = useMemo(() => {
        return JSON.stringify(value);
    }, [value]);
    const [error, setError] = useState(false);
    const toChange = (value: string) => {
        try {
            const jsonValue = JSON.parse(value);
            onChangeValue(jsonValue);
            setError(false);
        } catch (error) {
            setError(true);
            console.error(error);
        }
    };
    return (
        <TextField
            onChange={(e: any) => toChange(e.target.value)}
            value={stringValue}
            {...props}
            {...fieldProps}
            error={error}
            helperText={error ? "Invalid JSON" : ""}
        />
    );
}

export default JsonAdapter;
