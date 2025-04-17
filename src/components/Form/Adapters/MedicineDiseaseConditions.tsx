import MedicineDiseaseConditions from "components/Inputs/MedicineDiseaseConditions";

import { IMedicineDiseaseCondition } from "api/interfaces/Medicine/IMedicineDiseaseCondition";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldMedicineDiseaseConditions extends IFormField {
    type: "medicineDiseaseConditions";
}

const MedicineDiseaseConditionsAdapter: IFormAdapter = {
    name: "medicineDiseaseConditions",
    validate: (v, required) => {
        if (required) {
            return !!v?.length;
        }
        return true;
    },
    input: FormInput,
};

interface IMedicineDiseaseConditionsFormAdapterInputProps extends IFormAdapterInputProps {
    value: IMedicineDiseaseCondition[];
    onChangeValue: (value: IMedicineDiseaseCondition[]) => void;
}

function FormInput({
    value,
    fieldParams,
    fieldProps,
    onChangeValue,
    ...props
}: IMedicineDiseaseConditionsFormAdapterInputProps) {
    return (
        <MedicineDiseaseConditions
            value={value}
            onChangeValue={onChangeValue}
            {...fieldProps}
            {...props}
        />
    );
}

export default MedicineDiseaseConditionsAdapter;
