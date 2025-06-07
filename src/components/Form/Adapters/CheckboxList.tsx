import CheckboxList, { type ICheckboxListProps } from "components/Inputs/CheckboxList";

import type { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldCheckboxList extends IFormField {
    type: "checkboxList";
    values: { id: number; title: string }[];
    orientation?: "vertical" | "horizontal";
    inputProps?: Partial<ICheckboxListProps>;
}

const CheckboxListAdapter: IFormAdapter = {
    name: "checkboxList",
    input: FormInput,
    validate: (v, required) => {
        if (required) {
            return !!v?.length;
        }
        return true;
    },
};

function FormInput({ value, fieldProps, fieldParams, ...props }: IFormAdapterInputProps) {
    return (
        <CheckboxList
            values={fieldParams.values || []}
            value={value || []}
            {...fieldParams}
            {...props}
            {...fieldProps}
        />
    );
}

export default CheckboxListAdapter;
