import { type ChangeEvent } from "react";
import { type StandardTextFieldProps, TextField, type TextFieldVariants } from "@mui/material";

interface IProps extends Omit<StandardTextFieldProps, "variant"> {
    onChangeValue?: (data: string) => void;
    value?: string;
    variant?: TextFieldVariants;
    readOnly?: boolean;
}
export default function InputText({
    autoComplete = "off",
    onChangeValue,
    variant = "outlined",
    fullWidth = true,
    readOnly = false,
    inputProps = {},
    ...props
}: IProps) {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeValue?.(e.target.value);
    };

    return (
        <TextField
            {...props}
            inputProps={{ ...inputProps, readOnly }}
            autoComplete={autoComplete}
            fullWidth={fullWidth}
            onChange={onChange}
            variant={variant}
            sx={{ ...(props.sx || {}) }}
        />
    );
}
