import IconSelector from "components/Inputs/IconSelector";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldIconSelector extends IFormField {
    type: "iconSelector";
}

const IconSelectorAdapter: IFormAdapter = {
    name: "iconSelector",
    input: FormInput,
    validate: (v, required) => {
        if (required) {
            return !!v;
        }
        return true;
    },
};

function FormInput({ value, fieldParams, fieldProps, ...props }: IFormAdapterInputProps) {
    return (
        <IconSelector
            value={value || ""}
            {...props}
            {...fieldParams}
            {...fieldProps}
        />
    );
}

export default IconSelectorAdapter;
