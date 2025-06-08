import { useMemo } from "react";

import useGetData from "store/rtkProvider";
import InputSelect from "components/Inputs/InputSelect/InputSelect";

import type { ITaxesTypesDto } from "api/interfaces/user/ITaxesTypesDto";
import { checkFlagIncludes, getValuesByFlag } from "api/common/enumHelper";

import type { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldTaxesTypes extends IFormField {
    type: "taxesTypes";
    filterTypes?: number;
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
    const filteredData = useMemo(() => {
        if (!data) {
            return [];
        }
        if (fieldParams.filterTypes === -1) {
            return data;
        }
        const availableTypes = getValuesByFlag(fieldParams.filterTypes);
        return data.filter((x) => availableTypes.includes(x.id));
    }, [data, fieldParams.filterTypes]);

    return (
        <InputSelect
            {...props}
            {...fieldProps}
            values={filteredData}
        />
    );
}

export default TaxesTypesAdapter;
