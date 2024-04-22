import Select, { ISelectValue } from "components/Inputs/Select";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldSelect extends IFormField {
    values?: ISelectValue[];
    multiple?: boolean;
}

const ContactsAdapter: IFormAdapter = {
    name: "select",
    input: FormInput,
    validate: (v, required, { multiple }) => {
        if (!!required) {
            if (!!multiple) {
                return !!v?.length;
            }
            return typeof v === "undefined" || v === null ? false : true;
        }
        return true;
    },
};

function FormInput({ value, fieldParams, fieldProps, ...props }: IFormAdapterInputProps) {
    return (
        <Select
            values={fieldParams?.values?.length ? fieldParams?.values : []}
            multiple={!!fieldParams?.multiple}
            value={value || (!!fieldParams?.multiple ? [] : 0)}
            {...props}
            {...fieldProps}
        />
    );
}

export default ContactsAdapter;
