import { useMemo } from "react";
import {
    FormControl,
    InputLabel,
    Select as MuiSelect,
    type SelectProps,
    MenuItem,
    FormHelperText,
    type SxProps,
    Box,
} from "@mui/material";

import Icon, { type TIconName } from "components/Icon";

export interface ISelectValue {
    title: string;
    icon?: TIconName;
    key?: any;
    id: any;
    disabled?: boolean;
    sx?: SxProps;
    otherProps?: any;
}
export interface ISelectProps extends Omit<SelectProps, "onChange"> {
    label?: string;
    values?: ISelectValue[];
    helperText?: string;
    required?: boolean;
    disableClearable?: boolean;
    noDataText?: string;
    onChangeValue?: (newValue: any) => void;
}

export default function Select({
    label = "",
    fullWidth = true,
    error = false,
    helperText = "",
    values = [],
    variant = "outlined",
    required = false,
    noDataText,
    multiple = false,
    onChangeValue,
    ...props
}: ISelectProps) {
    const noDataTextProps = useMemo(() => {
        if (noDataText) {
            return {
                displayEmpty: true,
                renderValue: (selected: any) => {
                    if (!multiple) {
                        if (selected === undefined || selected === "") {
                            return noDataText;
                        }
                        return values.find((x) => x.id == selected)?.title || noDataText;
                    }

                    if (selected.length === 0) {
                        return noDataText;
                    }
                    return values
                        .filter((x) => selected.includes(x.id))
                        .map((x) => x.title)
                        .join(", ");
                },
            };
        }
        return {};
    }, [noDataText, multiple, values]);
    const toChangeValueSelect = (e: any) => {
        onChangeValue?.(e.target.value);
    };
    return (
        <FormControl
            variant={variant}
            fullWidth={fullWidth}
            error={error}
            required={required}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                {...props}
                {...noDataTextProps}
                label={label}
                multiple={multiple}
                onChange={toChangeValueSelect}
                variant={variant}
                renderValue={(selected) => {
                    if (Array.isArray(selected)) {
                        const value = values.filter((x) => selected.includes(x.id));
                        return value.map((x, index) => (
                            <Box
                                key={x.id}
                                sx={{ ...x?.sx }}
                            >
                                {index ? " ," : ""}
                                {x.title}
                            </Box>
                        ));
                    }
                    const value = values.find((x) => x.id == selected);
                    if (value) {
                        return <Box sx={{ ...value?.sx }}>{value.title}</Box>;
                    }
                    return null;
                }}
                sx={{
                    ...props?.sx,
                    "& .MuiSelect-select": {
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: 0,
                    },
                }}
            >
                {values.map((item) => {
                    return (
                        <MenuItem
                            key={"key" in item ? item.key : item.id}
                            value={item.id}
                            disabled={item.disabled}
                            sx={{ ...item?.sx, display: "flex", alignItems: "center" }}
                        >
                            {!!item?.icon && (
                                <Icon
                                    name={item.icon}
                                    fontSize="small"
                                    sx={{ mr: 1 }}
                                />
                            )}
                            {item.title}
                        </MenuItem>
                    );
                })}
            </MuiSelect>
            {!!helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
        </FormControl>
    );
}
