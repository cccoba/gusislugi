import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ru";

import { IInputProps } from "api/interfaces/components/IInputProps";
import { useMemo } from "react";

interface IProps extends IInputProps<null | Date> {
    maxDateTime?: any;
    minDateTime?: any;
    disableFuture?: boolean;
    disablePast?: boolean;
}

function DateTime({
    value,
    maxDateTime,
    minDateTime,
    disableFuture = false,
    disablePast = false,
    variant,
    fullWidth = true,
    helperText = "",
    error = false,
    onChangeValue,
    ...props
}: IProps) {
    const onChange = (dateValue: any) => {
        if (!!onChangeValue) {
            onChangeValue(!!dateValue ? dateValue.toDate() : null);
        }
    };
    const dayJsDate = useMemo(() => {
        if (!!value) {
            return dayjs(value);
        }
        return null;
    }, [value]);
    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="ru"
        >
            <DateTimePicker
                value={dayJsDate}
                onChange={onChange}
                maxDateTime={maxDateTime}
                minDateTime={minDateTime}
                disableFuture={disableFuture}
                disablePast={disablePast}
                slotProps={{
                    textField: { variant, fullWidth, helperText, error },
                }}
                {...props}
            />
        </LocalizationProvider>
    );
}
export default DateTime;
