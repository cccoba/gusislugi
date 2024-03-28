import React, { useMemo, useRef } from "react";
import { InputAdornment, StandardTextFieldProps, TextField } from "@mui/material";

import IconButton from "components/Icon/IconButton";
import Icon from "components/Icon";
interface IProps extends StandardTextFieldProps {
    onChangeValue?: (data: string) => void;
    onClearButtonClick?: () => void;
    value?: string;
    showSearchIcon?: boolean;
}
export default function InputSearch({
    onChangeValue,
    onClearButtonClick,
    value = "",
    showSearchIcon,
    InputProps,
    fullWidth = true,
    ...props
}: IProps) {
    const textInputRef = useRef<any>();
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
                        onClick={toClear}
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
    function toClear(e: any) {
        if (textInputRef.current) {
            textInputRef.current?.focus();
        }

        onChange("");
        if (onClearButtonClick) {
            onClearButtonClick();
        }
    }
    return (
        <TextField
            inputRef={textInputRef}
            {...props}
            fullWidth={fullWidth}
            onChange={(e) => onChange(e.target.value)}
            InputProps={updatedInputProps}
            value={value}
        />
    );
}
