import type { FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, SxProps } from "@mui/material";

type TInputProps = Omit<FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps, "variant">;
export interface IInputProps<T> {
    value: T;
    label?: string;
    onChangeValue: (newValue: T) => void;
    fullWidth?: boolean;
    error?: boolean;
    required?: boolean;
    helperText?: string;
    disabled?: boolean;
    placeholder?: string;
    autoFocus?: boolean;
    variant?: "filled" | "outlined" | "standard";

    sx?: SxProps;
    readOnly?: boolean;
    autoComplete?: string;
    textInputProps?: TInputProps;
}
