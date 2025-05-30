import InputImage from "components/Inputs/InputImage";

import type { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldImage extends IFormField {
    type: "image";
}

const ImageAdapter: IFormAdapter = {
    name: "image",
    input: FormInput,
    validate: (v, required) => {
        if (required) {
            return !!v;
        }
        return true;
    },
};

function FormInput({ value = "", fieldProps, fieldParams, ...props }: IFormAdapterInputProps) {
    return (
        <InputImage
            value={value}
            {...props}
            {...fieldProps}
            {...fieldParams}
        />
    );
}

export default ImageAdapter;
