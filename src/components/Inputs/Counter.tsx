import { useEffect, useMemo } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";

import Icon from "components/Icon";
import { IInputProps } from "api/interfaces/components/IInputProps";

interface IProps extends IInputProps<number> {
    minValue?: number;
    maxValue?: number;
    step?: number;
    compact?: boolean;
}

const counterSx: any = {
    "& input": {
        textAlign: "center",
    },
    "& input[type='number']::-webkit-inner-spin-button, input[type='number']::-webkit-outer-spin-button": {
        appearance: "none",
    },
};
function Counter({
    fullWidth = true,
    value = 0,
    minValue = 0,
    maxValue = 1000,
    step = 1,
    onChangeValue,
    compact = false,
    sx = {},
    ...props
}: IProps) {
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
        if (newValue !== value) {
            onChangeValue(newValue);
        }
    };
    const toMinus = () => {
        if (value - step >= minValue) {
            toChangeValue(value - step);
        }
    };
    const toPlus = () => {
        if (value + step <= maxValue) {
            toChangeValue(value + step);
        }
    };
    return (
        <TextField
            {...props}
            type="number"
            value={value}
            fullWidth={fullWidth}
            sx={{ ...counterSx, ...sx }}
            inputProps={{ step, min: minValue, max: maxValue }}
            onChange={toChange}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Button
                            sx={buttonSx}
                            onClick={toMinus}
                            disabled={value <= minValue}
                        >
                            <Icon name="minus" />
                        </Button>
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <Button
                            sx={buttonSx}
                            disabled={value >= maxValue}
                            onClick={toPlus}
                        >
                            <Icon name="add" />
                        </Button>
                    </InputAdornment>
                ),
            }}
        />
    );
}
export default Counter;
