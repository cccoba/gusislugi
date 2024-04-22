import UserSelect from "components/Inputs/Async/UserSelect";
import lang from "lang";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

const langPage = lang.components.form;
export interface IFormFieldUser extends IFormField {
    type: "user";
}

const UserAdapter: IFormAdapter = {
    name: "user",
    input: FormInput,
    validate: (v, required) => {
        if (!required && !v?.length) {
            return true;
        }
        return (/^[0-9]+$/.test(v) && v > 0) || langPage.isRequired;
    },
};

function FormInput({ value = "", fieldProps, fieldParams, ...props }: IFormAdapterInputProps) {
    return (
        <UserSelect
            value={value}
            {...props}
            {...fieldProps}
        />
    );
}

export default UserAdapter;
