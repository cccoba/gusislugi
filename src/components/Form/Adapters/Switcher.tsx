import Switcher from "components/Inputs/Switcher";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldSwitcher extends IFormField {
    type: "switcher";
    text?: string;
}

const SwitcherAdapter: IFormAdapter = {
    name: "switcher",
    input: FormInput,
    validate: (v, required) => {
        if (!!required && !v) {
            return false;
        }
        return true;
    },
};

function FormInput({ value, fieldProps, fieldParams, ...props }: IFormAdapterInputProps) {
    if (!fieldProps) {
        fieldProps = {};
    }
    if (typeof fieldParams?.text !== "undefined") {
        fieldProps.textValue = fieldParams.text;
    }
    return (
        <Switcher
            value={!!value}
            {...props}
            {...fieldProps}
        />
    );
}

export default SwitcherAdapter;
