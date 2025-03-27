import { ISelectValue } from "components/Inputs/Select";
import InputSelect, { IInputSelectProps } from "components/Inputs/InputSelect/InputSelect";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldList extends IFormField {
    type: "list";
    values: ISelectValue[];
    fieldProps?: Partial<IInputSelectProps<string | number>>;
}

const ListAdapter: IFormAdapter = {
    name: "list",
    input: FormInput,
    validate: (v, required) => {
        if (required) {
            return typeof v === "undefined" || v === null ? false : true;
        }
        return true;
    },
};

function FormInput({ value, fieldParams, fieldProps, ...props }: IFormAdapterInputProps) {
    return (
        <InputSelect
            {...props}
            {...fieldProps}
            values={fieldParams.values}
            value={value}
        />
    );
}

export default ListAdapter;
