import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

import { IInputProps } from "api/interfaces/components/IInputProps";

import lang from "lang";

import Counter from "./Counter";
import FormControl from "./FormControl";

export interface IInputTimeDurationProps extends IInputProps<number> {
    withOutDays?: boolean;
    withOutHours?: boolean;
    withOutMinutes?: boolean;
    withOutSeconds?: boolean;
}
interface IInputTimeDurationLocalValue {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}
export default function InputTimeDuration({
    fullWidth = true,
    error,
    required = false,
    variant = "outlined",
    helperText = "",
    label,
    value,
    withOutDays = false,
    withOutHours = false,
    withOutMinutes = false,
    withOutSeconds = false,
    onChangeValue,
}: IInputTimeDurationProps) {
    const langPage = lang.components.inputTimeDuration;
    const defValue = useRef<IInputTimeDurationLocalValue>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const localValue = useRef<IInputTimeDurationLocalValue>(defValue.current);
    useEffect(() => {
        const newValue = { ...defValue.current };
        if (!!value && value > 0) {
            let seconds = value;
            const days = Math.floor(seconds / (24 * 60 * 60));
            seconds %= 24 * 60 * 60;
            const hours = Math.floor(seconds / (60 * 60));
            seconds %= 60 * 60;
            const minutes = Math.floor(seconds / 60);
            seconds %= 60;
            newValue.days = withOutDays ? 0 : days;
            newValue.hours = withOutHours ? 0 : hours;
            newValue.minutes = withOutMinutes ? 0 : minutes;
            newValue.seconds = withOutSeconds ? 0 : seconds;
        }
        localValue.current = newValue;
        toUpdate();
    }, [value, withOutDays, withOutHours, withOutMinutes, withOutSeconds]);
    const toUpdate = () => {
        onChangeValue(
            localValue.current.days * 86400 +
                localValue.current.hours * 3600 +
                localValue.current.minutes * 60 +
                localValue.current.seconds
        );
    };
    const changeDays = (value: number) => {
        if (value >= 0) {
            localValue.current.days = value;
            toUpdate();
        }
    };
    const changeHours = (value: number) => {
        if (value >= 0 && value <= 23) {
            localValue.current.hours = value;
            toUpdate();
        }
    };
    const changeMinutes = (value: number) => {
        if (value >= 0 && value <= 59) {
            localValue.current.minutes = value;
            toUpdate();
        }
    };
    const changeSeconds = (value: number) => {
        if (value >= 0 && value <= 59) {
            localValue.current.seconds = value;
            toUpdate();
        }
    };
    return (
        <FormControl
            fullWidth={fullWidth}
            error={error}
            required={required}
            variant={variant}
            helperText={helperText}
            label={label}
        >
            <Box
                display="flex"
                justifyContent="space-between"
            >
                {!withOutDays && (
                    <Counter
                        value={localValue.current.days}
                        onChangeValue={changeDays}
                        maxValue={360}
                        fullWidth
                        helperText={langPage.days}
                    />
                )}
                {!withOutHours && (
                    <Counter
                        value={localValue.current.hours}
                        helperText={langPage.hours}
                        onChangeValue={changeHours}
                        maxValue={23}
                        fullWidth
                    />
                )}
                {!withOutMinutes && (
                    <Counter
                        value={localValue.current.minutes}
                        helperText={langPage.minutes}
                        onChangeValue={changeMinutes}
                        maxValue={59}
                        fullWidth
                    />
                )}
                {!withOutSeconds && (
                    <Counter
                        value={localValue.current.seconds}
                        helperText={langPage.seconds}
                        onChangeValue={changeSeconds}
                        maxValue={59}
                        fullWidth
                    />
                )}
            </Box>
        </FormControl>
    );
}
