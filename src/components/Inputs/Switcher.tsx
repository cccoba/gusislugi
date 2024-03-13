import { FormControlLabel, SxProps, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";

import FormControl from "components/Inputs/FormControl";

interface IProps {
    type?: "checkbox";
    value: boolean;
    label?: string;
    textPosition?: "bottom" | "end" | "start" | "top";
    textValue?: string;
    onChangeValue: (value: boolean) => void;
    fullWidth?: boolean;
    error?: boolean;
    required?: boolean;
    helperText?: string;
    disabled?: boolean;
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default";
    variant?: "filled" | "outlined" | "standard";
}

function Switcher({
    type = "checkbox",
    value = false,
    label = "",
    textValue = "",
    variant = "standard",
    textPosition = "end",
    fullWidth = true,
    error = false,
    required = false,
    helperText = "",
    color = "primary",
    disabled = false,
    onChangeValue,
}: IProps) {
    const [textSx, setTextSx] = useState<SxProps>({});
    useEffect(() => {
        if (!!error) {
            setTextSx({ color: "error.main" });
        } else {
            setTextSx({});
        }
    }, [error]);
    const onChange = (value: boolean) => {
        if (!!onChangeValue) {
            onChangeValue(value);
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
            disabled={disabled}
        >
            <FormControlLabel
                sx={{ ml: variant === "outlined" ? 0 : "-11px", ...textSx, mt: !!label?.length ? 0 : 2 }}
                control={
                    <Checkbox
                        sx={{ ...textSx, py: "4px" }}
                        color={!!error ? "error" : color}
                        checked={value}
                        onChange={(e: any) => onChange(e.target.checked)}
                    />
                }
                label={!!textValue ? textValue + (!!required ? " *" : "") : ""}
                labelPlacement={textPosition}
            />
        </FormControl>
    );
}
export default Switcher;
