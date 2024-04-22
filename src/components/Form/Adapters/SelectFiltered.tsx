import InputAutocomplete from "components/Inputs/InputAutocomplete";
import { ISelectValue } from "components/Inputs/Select";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldSelectFiltered extends IFormField {
    values?: ISelectValue[];
    multiple?: boolean;
}

const SelectFilteredAdapter: IFormAdapter = {
    name: "selectFiltered",
    input: FormInput,
    validate: (v, required, { multiple }) => {
        if (required) {
            if (!!multiple) {
                return v?.length || false;
            }
            return typeof v === "undefined" || v === null ? false : true;
        }
        return true;
    },
};

function FormInput({ value, onChangeValue, fieldProps, fieldParams, ...props }: IFormAdapterInputProps) {
    return (
        <InputAutocomplete
            onChange={onChangeValue}
            values={fieldParams?.values?.length ? fieldParams?.values : []}
            multiple={!!fieldParams?.multiple}
            value={value || (!!fieldParams?.multiple ? [] : 0)}
            {...fieldProps}
            {...props}
        />
    );
}

export default SelectFilteredAdapter;
