import { InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import useDebounce from "api/hooks/useDebounce";

import type { IInputProps } from "api/interfaces/components/IInputProps";

import Icon from "../Icon";
import IconButton from "../Icon/IconButton";

interface IProps extends IInputProps<string> {
    onClearButtonClick?: () => void;
    showSearchIcon?: boolean;
    debounceTime?: number;
}
export default function InputSearch({
    onChangeValue,
    onClearButtonClick,
    showSearchIcon,
    autoComplete = "off",
    textInputProps,
    fullWidth = true,
    variant = "outlined",
    debounceTime = 0,
    value = "",
    sx = {},
    ...props
}: IProps) {
    const [search, setSearch] = useState(value || "");
    useEffect(() => {
        setSearch(value || "");
    }, [value]);
    const debouncedSearch = useDebounce(search, debounceTime);
    useEffect(() => {
        onChangeValue?.(debouncedSearch);
        if (!debouncedSearch && onClearButtonClick) {
            onClearButtonClick();
        }
    }, [debouncedSearch]);

    const updatedInputProps: any = textInputProps?.InputProps || {};

    updatedInputProps.endAdornment = (
        <InputAdornment
            position="end"
            sx={{
                "&:has(> *)": {
                    width: 30,
                },
                ml: 0,
            }}
        >
            {search?.length ? (
                <IconButton
                    edge="end"
                    onClick={() => setSearch("")}
                    name="close"
                    size="small"
                />
            ) : null}
        </InputAdornment>
    );
    if (showSearchIcon) {
        updatedInputProps.startAdornment = (
            <InputAdornment
                position="start"
                sx={{ mr: 0 }}
            >
                <Icon
                    name="search"
                    fontSize="small"
                />
            </InputAdornment>
        );
    }

    updatedInputProps.type = "text";
    return (
        <TextField
            value={search}
            {...props}
            {...textInputProps}
            variant={variant}
            autoComplete={autoComplete}
            fullWidth={fullWidth}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={updatedInputProps}
            sx={{
                "& .MuiInputBase-root": {
                    px: 1,
                },
                ...sx,
            }}
        />
    );
}
