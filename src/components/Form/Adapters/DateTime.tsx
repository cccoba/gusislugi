import DateTime from "components/Inputs/DateTime";
import dayjs from "dayjs";
import "dayjs/locale/ru";

import lang from "lang";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

const langPage = lang.components.form;
export interface IFormFieldDateTime extends IFormField {
    type: "dateTime";
    minDateTime?: Date;
    maxDateTime?: Date;
    disableFuture?: boolean;
    disablePast?: boolean;
}

const DateTimeAdapter: IFormAdapter = {
    name: "dateTime",
    input: FormInput,
    validate: (v, required) => {
        if (!required && !v) {
            return true;
        }
        return dayjs(v).isValid() || langPage.isDate;
    },
};

function FormInput({ value = null, fieldProps, fieldParams, ...props }: IFormAdapterInputProps) {
    return (
        <DateTime
            value={value}
            {...props}
            {...fieldParams}
            {...fieldProps}
        />
    );
}

export default DateTimeAdapter;
