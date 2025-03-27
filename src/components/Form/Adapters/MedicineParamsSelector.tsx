import { IMedicineParam } from "api/interfaces/Medicine/IMedicineParam";

import useGetData from "store/rtkProvider";
import InputSelectMultiple from "components/Inputs/InputSelect/InputSelectMultiple";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldMedicineParamsSelector extends IFormField {
    type: "medicineParamsSelector";
}

const MedicineParamsSelectorAdapter: IFormAdapter = {
    name: "medicineParamsSelector",
    input: FormInput,
    validate: (v, required) => {
        if (required) {
            return !!v?.length;
        }
        return true;
    },
};

function FormInput({ value, fieldParams, fieldProps, ...props }: IFormAdapterInputProps) {
    const { data } = useGetData<IMedicineParam[]>("medicineParams", []);
    return (
        <InputSelectMultiple
            {...props}
            {...fieldProps}
            values={(data || []).map((x) => ({ title: x.title, id: x.id }))}
            value={value}
        />
    );
}

export default MedicineParamsSelectorAdapter;
