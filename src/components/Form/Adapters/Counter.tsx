import Counter from "components/Inputs/Counter";
import lang from "lang";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

const langPage = lang.components.form;
export interface IFormFieldCounter extends IFormField {
    type: "counter";
    minValue?: number;
    maxValue?: number;
    step?: number;
}

const CounterAdapter: IFormAdapter = {
    name: "counter",
    input: FormInput,
    validate: (v, required) => {
        if (!required && !v?.length) {
            return true;
        }
        return /^[0-9]+$/.test(v) || langPage.isNumber;
    },
};

function FormInput({ fieldProps, fieldParams, ...props }: IFormAdapterInputProps) {
    return (
        <Counter
            {...props}
            {...fieldProps}
            {...fieldParams}
        />
    );
}

export default CounterAdapter;
