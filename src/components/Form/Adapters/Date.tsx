import Date from "components/Inputs/Date";
import lang from "lang";

import { checkDate } from "api/common/helper";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

const langPage = lang.components.form;
export interface IFormFieldDate extends IFormField {
    type: "date";
    minDate?: Date;
    maxDate?: Date;
    disableFuture?: boolean;
    disablePast?: boolean;
}

const DateAdapter: IFormAdapter = {
    name: "date",
    input: FormInput,
    validate: (v, required) => {
        if (!required && !v) {
            return true;
        }
        return checkDate(v) || langPage.isDate;
    },
};

function FormInput({ onChangeValue, fieldProps, fieldParams, ...props }: IFormAdapterInputProps) {
    return (
        <Date
            onChange={onChangeValue}
            pickerProps={fieldParams}
            {...props}
            {...fieldProps}
        />
    );
}

export default DateAdapter;
