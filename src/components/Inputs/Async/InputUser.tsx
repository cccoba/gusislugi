import { IInputProps } from "api/interfaces/components/IInputProps";

import lang from "lang";

import FormControl from "../FormControl";

interface IProps extends IInputProps<number> {}

//const langPage = lang.components.InputUser

function InputUser({
    label = "",
    fullWidth = true,
    required = false,
    helperText = "",
    variant = "standard",
    error = false,
    value = 0,
    disabled = false,
    onChangeValue,
}: IProps) {
    return (
        <FormControl
            fullWidth={fullWidth}
            error={error}
            required={required}
            disabled={disabled}
            variant={variant}
            label={label}
            helperText={helperText}
        ></FormControl>
    );
}
export default InputUser;
