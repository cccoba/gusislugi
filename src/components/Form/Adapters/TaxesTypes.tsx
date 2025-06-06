import useGetData from "store/rtkProvider";

import InputSelect from "components/Inputs/InputSelect/InputSelect";

import type { ITaxesTypesDto } from "api/interfaces/user/ITaxesTypesDto";

import type { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldTaxesTypes extends IFormField {
    type: "taxesTypes";
}

const TaxesTypesAdapter: IFormAdapter = {
    name: "taxesTypes",

    validate: (v, required) => {
        if (required) {
            return !!v;
        }
        return true;
    },
    input: FormInput,
};

function FormInput({ fieldParams, fieldProps, ...props }: IFormAdapterInputProps) {
    const { data } = useGetData<ITaxesTypesDto[]>("taxesTypes", []);
    return (
        <InputSelect
            {...props}
            {...fieldProps}
            values={data}
        />
    );
}

export default TaxesTypesAdapter;
