import InputImage from "components/Inputs/InputImage";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldImage extends IFormField {
    type: "image";
}

const ImageAdapter: IFormAdapter = {
    name: "image",
    input: FormInput,
    validate: (v, required) => {
        if (!!required) {
            return !!v && Number.isInteger(v);
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
        />
    );
}

export default ImageAdapter;
