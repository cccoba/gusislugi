import React, { useMemo } from "react";
import { InputAdornment, StandardTextFieldProps, TextField } from "@mui/material";

import IconButton from "components/Icon/IconButton";
import Icon from "components/Icon";
interface IProps extends StandardTextFieldProps {
    onChangeValue?: (data: string) => void;
    value?: string;
    showSearchIcon?: boolean;
}
export default function InputSearch({
    onChangeValue,
    value = "",
    showSearchIcon,
    InputProps,
    fullWidth = true,
    ...props
}: IProps) {
    const onChange = (data: string) => {
        if (!!onChangeValue) {
            onChangeValue(data);
        }
    };
    const updatedInputProps = useMemo(() => {
        const newInputProps = !!InputProps ? InputProps : {};
        newInputProps.type = "text";
        newInputProps.endAdornment = (
            <InputAdornment position="end">
                {value?.length ? (
                    <IconButton
                        edge="end"
                        onClick={() => onChange("")}
                        name="close"
                        size="small"
                    />
                ) : null}
            </InputAdornment>
        );
        if (!!showSearchIcon) {
            newInputProps.startAdornment = (
                <InputAdornment position="end">
                    <Icon
                        name="search"
                        fontSize="small"
                    />
                </InputAdornment>
            );
        }
        return newInputProps;
    }, [showSearchIcon, InputProps, value]);

    return (
        <TextField
            {...props}
            fullWidth={fullWidth}
            onChange={(e) => onChange(e.target.value)}
            InputProps={updatedInputProps}
        />
    );
}
