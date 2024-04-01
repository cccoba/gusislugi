import { useEffect, useState } from "react";
import { TextFieldProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/ru";

import { IInputProps } from "api/interfaces/components/IInputProps";
import dayjs, { Dayjs } from "dayjs";
import { checkDate } from "api/common/helper";

export interface IPickerProps {
    maxDate?: any;
    minDate?: any;
    disableFuture?: boolean;
    disablePast?: boolean;
}
interface IProps extends IInputProps<Date | null> {
    label?: string;
    timeChange?: "no" | "startDay" | "endDay";
    pickerProps?: IPickerProps;
    textFiledProps?: TextFieldProps;
    format?: string;
}

export default function DateInput({
    label = "",
    value = null,
    error = false,
    helperText = "",
    timeChange = "no",
    pickerProps,
    textFiledProps = {},
    variant,
    format = "DD.MM.YYYY",
    onChangeValue,
    ...props
}: IProps) {
    const [localValue, setLocalValue] = useState<Dayjs | null>(null);

    useEffect(() => {
        if (!!value && typeof value === "string") {
            const newValue = dayjs(new Date(value));
            onChangeDate(newValue);
        }
        if (checkDate(value)) {
            onChangeDate(dayjs(value));
        }
    }, [value?.toISOString(), timeChange]);
    const onChangeDate = (dateValue: Dayjs | null) => {
        if (dateValue !== null) {
            switch (timeChange) {
                case "startDay":
                    dateValue.set("hour", 0).set("minute", 0).set("second", 0);
                    break;
                case "endDay":
                    dateValue.set("hour", 23).set("minute", 59).set("second", 59);
                    break;
            }
        }
        setLocalValue(dateValue);
        const newValue = dateValue?.toDate() || null;
        onChangeValue(newValue);
    };
    const onErrorDate = (reason: any, value: any) => {
        console.log("onErrorDate", reason, value);
    };
    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="ru"
        >
            <DatePicker
                {...pickerProps}
                onError={onErrorDate}
                label={label}
                value={localValue}
                onChange={onChangeDate}
                format={format}
                slotProps={{
                    textField: { variant },
                    actionBar: {
                        actions: ["clear"],
                    },
                }}
            />
        </LocalizationProvider>
    );
}
