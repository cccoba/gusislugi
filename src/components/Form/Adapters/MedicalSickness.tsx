import useGetData from "store/rtkProvider";

import InputSelect from "components/Inputs/InputSelect/InputSelect";

import type { IMedicalSicknessDto } from "api/interfaces/user/IMedicalSicknessDto";

import { useMemo } from "react";

import type { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldMedicalSickness extends IFormField {
    type: "medicalSickness";
    availableIds?: number[];
}

const MedicalSicknessAdapter: IFormAdapter = {
    name: "medicalSickness",

    validate: (v, required) => {
        if (required) {
            return !!v;
        }
        return true;
    },
    input: FormInput,
};

function FormInput({ fieldParams, fieldProps, ...props }: IFormAdapterInputProps) {
    const { data } = useGetData<IMedicalSicknessDto[]>("medicalSicknesses", []);
    const values = useMemo(() => {
        return (data || []).filter((x) => !fieldParams?.availableIds || fieldParams.availableIds.includes(x.id));
    }, [data, fieldParams?.availableIds]);
    return (
        <InputSelect
            {...props}
            {...fieldProps}
            values={values}
        />
    );
}
export default MedicalSicknessAdapter;
