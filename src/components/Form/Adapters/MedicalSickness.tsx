import useGetData from "store/rtkProvider";

import InputSelect from "components/Inputs/InputSelect/InputSelect";

import type { IMedicalSicknessDto } from "api/interfaces/user/IMedicalSicknessDto";

import { useMemo } from "react";

import type { ISelectValue } from "components/Inputs/Select";
import lang from "lang";

import type { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldMedicalSickness extends IFormField {
    type: "medicalSickness";
    availableIds?: number[];
    withPublic?: boolean;
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
        const result: ISelectValue[] = (data || []).filter(
            (x) => !fieldParams?.availableIds || fieldParams.availableIds.includes(x.id)
        );
        if (fieldParams?.withPublic) {
            return result.map((x) => ({
                ...x,
                title: `${x.title}${(x as any).public ? " ( " + lang.pages.medicalSickness.public + " )" : ""}`,
            }));
        }
        return result;
    }, [data, fieldParams?.availableIds, fieldParams?.withPublic]);
    return (
        <InputSelect
            {...props}
            {...fieldProps}
            values={values}
        />
    );
}
export default MedicalSicknessAdapter;
