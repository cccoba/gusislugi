import useGetData from "store/rtkProvider";

import InputSelect from "components/Inputs/InputSelect/InputSelect";
import { IMedicineTest } from "api/interfaces/Medicine/IMedicineTest";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldMedicineTest extends IFormField {
    type: "medicineTest";
}

const MedicineTestAdapter: IFormAdapter = {
    name: "medicineTest",

    validate: (v, required) => {
        if (required) {
            return !!v;
        }
        return true;
    },
    input: FormInput,
};

function FormInput({ value, fieldParams, fieldProps, ...props }: IFormAdapterInputProps) {
    const { data } = useGetData<IMedicineTest[]>("medicineTests", []);
    return (
        <InputSelect
            {...props}
            {...fieldProps}
            values={(data || []).map((x) => ({ title: x.title, id: x.id }))}
            value={value}
        />
    );
}

export default MedicineTestAdapter;
