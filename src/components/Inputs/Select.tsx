import { FormControl, InputLabel, Select as MuiSelect, SelectProps, MenuItem, FormHelperText } from "@mui/material";
import Icon from "components/Icon";

import InputAutocomplete from "./InputAutocomplete";

export interface ISelectValue {
    title: string;
    image?: string;
    icon?: string;
    key?: any;
    id: any;
    otherProps?: any;
}
export interface ISelectProps extends Omit<SelectProps, "onChange"> {
    label?: string;
    values?: ISelectValue[];
    helperText?: any;
    type?: "select" | "selectFiltered";
    required?: boolean;
    withSelectAll?: boolean;
    disableClearable?: boolean;
    groupBy?: (option: any) => any;
    onChangeValue?: (newValue: any) => void;
}

export default function Select({
    label = "",
    fullWidth = true,
    error = false,
    helperText = "",
    values = [],
    variant = "standard",
    required = false,
    type = "select",
    withSelectAll = false,
    groupBy,
    onChangeValue,
    ...props
}: ISelectProps) {
    const toChangeValueSelect = (e: any) => {
        if (!!onChangeValue) {
            onChangeValue(e.target.value);
        }
    };
    const toChangeValueInputAutocomplete = (value: any) => {
        if (!!onChangeValue) {
            onChangeValue(value);
        }
    };

    if (type === "selectFiltered") {
        return (
            <InputAutocomplete
                values={values}
                rightArrow={true}
                fullWidth={fullWidth}
                required={required}
                variant={variant === "standard" ? variant : undefined}
                onChange={toChangeValueInputAutocomplete}
                value={props.value}
                label={label}
                error={error}
                helperText={helperText}
                multiple={!!props?.multiple}
                disabled={!!props?.disabled}
                withSelectAll={withSelectAll}
                disableClearable={!!props?.disableClearable}
                groupBy={groupBy}
            />
        );
    }

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
                onChange={toChangeValueSelect}
                variant={variant}
                label={label}
                sx={{
                    ...props?.sx,
                    "& .MuiSelect-select": {
                        display: "flex",
                        alignItems: "center",
                    },
                }}
            >
                {values.map((item, index) => {
                    return (
                        <MenuItem
                            key={"key" in item ? item.key : item.id}
                            value={item.id}
                            sx={{ display: "flex", alignItems: "center" }}
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
