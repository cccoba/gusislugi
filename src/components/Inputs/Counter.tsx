import { useEffect, useMemo, useRef } from "react";
import { InputAdornment, TextField } from "@mui/material";

import { getSum } from "api/common/helper";
import type { IInputProps } from "api/interfaces/components/IInputProps";

import IconButton from "components/Icon/IconButton";

export interface ICounterProps extends IInputProps<number> {
    minValue?: number;
    maxValue?: number;
    step?: number;
    compact?: boolean;
    defaultValue?: number;
    withStopPropagation?: boolean;
    placeholder?: string;
}

export default function Counter({
    fullWidth = true,
    value = 0,
    minValue = 0,
    maxValue = 1000,
    step = 1,
    compact = false,
    sx = {},
    defaultValue = 0,
    placeholder,
    variant = "outlined",
    withStopPropagation = false,
    onChangeValue,
    ...props
}: ICounterProps) {
    const counterSx = useRef({
        "& .MuiInputBase-root": {
            px: 0,
        },
        "& input": {
            textAlign: "center",
            flexGrow: 10,
        },
        "& input[type='number']::-webkit-inner-spin-button, input[type='number']::-webkit-outer-spin-button": {
            appearance: "none",
        },
    });
    const localPlaceholder = useMemo(() => {
        if (placeholder) {
            return placeholder;
        }
        if (typeof defaultValue !== "undefined") {
            return defaultValue.toString();
        }
        return "";
    }, [placeholder, defaultValue]);
    useEffect(() => {
        if (isNaN(value) || !isFinite(value)) {
            toChangeValue(minValue);
            return;
        }
        let newValue = value;
        if (newValue > maxValue) {
            newValue = maxValue;
        }
        if (newValue < minValue) {
            newValue = minValue;
        }
        toChangeValue(newValue);
    }, [value, minValue, maxValue]);

    const buttonSx = useMemo(() => {
        if (compact) {
            return {
                px: 0,
                minWidth: "auto",
            };
        }
        return {};
    }, [compact]);

    const toChange = (e: any) => {
        if (e.target.value === "") {
            toChangeValue(defaultValue);
            return;
        }
        const floatValue = parseFloat(e.target.value);
        if (isNaN(value) || !isFinite(value)) {
            toChangeValue(minValue);
            return;
        }
        toChangeValue(floatValue);
    };
    const toChangeValue = (newValue: number) => {
        if (Number.isInteger(step) && !Number.isInteger(newValue)) {
            newValue = Math.round(newValue);
        }
        if (newValue !== value) {
            onChangeValue(typeof newValue === "undefined" ? defaultValue : newValue);
        }
    };
    const toMinus = (e: any) => {
        if (withStopPropagation) {
            e.stopPropagation();
        }
        if (value - step >= minValue) {
            toChangeValue(getSum(value || 0, step || 1, false));
        }
    };
    const toPlus = (e: any) => {
        if (withStopPropagation) {
            e.stopPropagation();
        }
        if (value + step <= maxValue) {
            toChangeValue(getSum(value || 0, step || 1));
        }
    };
    return (
        <TextField
            {...props}
            type="number"
            variant={variant}
            value={value === undefined || value === defaultValue ? "" : value}
            placeholder={localPlaceholder}
            fullWidth={fullWidth}
            sx={{ ...counterSx.current, ...sx }}
            inputProps={{ step, min: minValue, max: maxValue }}
            onChange={toChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <IconButton
                            sx={buttonSx}
                            name="minus"
                            onClick={toMinus}
                            color="primary"
                            disabled={!!props?.disabled || value <= minValue}
                        />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            sx={buttonSx}
                            name="add"
                            onClick={toPlus}
                            color="primary"
                            disabled={!!props?.disabled || value >= maxValue}
                        />
                    </InputAdornment>
                ),
            }}
        />
    );
}
