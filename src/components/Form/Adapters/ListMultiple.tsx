import type { ISelectValue } from "components/Inputs/Select";
import type { IInputSelectMultipleProps } from "components/Inputs/InputSelect/InputSelectMultiple";
import InputSelectMultiple from "components/Inputs/InputSelect/InputSelectMultiple";

import type { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldListMultiple extends IFormField {
    type: "listMultiple";
    values: ISelectValue[];
    withSelectAll?: boolean;
    fieldProps?: Partial<IInputSelectMultipleProps<number | string>>;
}

const ListMultipleAdapter: IFormAdapter = {
    name: "listMultiple",
    input: FormInput,
    validate: (v, required) => {
        if (required) {
            return !!v?.length;
        }
        return true;
    },
};

function FormInput({ value, fieldParams, fieldProps, ...props }: IFormAdapterInputProps) {
    return (
        <InputSelectMultiple
            {...props}
            {...fieldProps}
            values={fieldParams.values}
            value={value}
        />
    );
}

export default ListMultipleAdapter;
