import { SxProps } from "@mui/material";

export interface IInputProps<T> {
    value: T;
    label?: string;
    onChangeValue: (newValue: T) => void;
    fullWidth?: boolean;
    error?: boolean;
    required?: boolean;
    helperText?: string;
    disabled?: boolean;
    variant?: "filled" | "outlined" | "standard";
    sx?: SxProps;
}
