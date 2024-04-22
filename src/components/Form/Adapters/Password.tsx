import InputPassword from "components/Inputs/InputPassword";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldPassword extends IFormField {
    type: "password";
}

const PasswordAdapter: IFormAdapter = {
    name: "password",
    input: FormInput,
    validate: (v, required) => {
        if (!!required && !v?.length) {
            return false;
        }
        return true;
    },
};

function FormInput({ value = "", fieldProps, fieldParams, ...props }: IFormAdapterInputProps) {
    return (
        <InputPassword
            value={value}
            {...props}
            {...fieldProps}
        />
    );
}

export default PasswordAdapter;
