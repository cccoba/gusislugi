import { useMemo } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import type { IInputProps } from "api/interfaces/components/IInputProps";

import lang from "lang";

import type { IInputSelectBaseProps } from "./helper";
import {
    inputSelectBaseProps,
    inputSelectBaseRenderOption,
    inputSelectFilterOptions,
    sortValuesByFieldName,
} from "./helper";

export interface IInputSelectProps<T> extends Omit<IInputProps<T | undefined>, "onChangeValue">, IInputSelectBaseProps {
    noOptionsText?: string;
    onChangeValue: (result: T) => void;
}

export default function InputSelect<T>({
    sx,
    values,
    value,
    readOnly = false,
    disabled = false,
    loading = false,
    variant = "standard",
    label,
    autoComplete = "off",
    inputProps = {},
    noOptionsText,
    renderOptionCb,
    groupByFieldName,
    groupBy,
    onChangeValue,
    ...props
}: IInputSelectProps<T>) {
    const stateValue = useMemo(() => {
        return (
            sortValuesByFieldName(values, groupByFieldName).find((x) => value === x.id) || {
                id: undefined,
                title: noOptionsText || "",
            }
        );
    }, [value, values, noOptionsText, groupByFieldName]);
    const onChangedValue = (_: any, newValue: any) => {
        onChangeValue(newValue.id);
    };
    const toGroupBy = useMemo(() => {
        if (typeof groupBy === "function") {
            return groupBy;
        }
        return groupByFieldName ? (x: any) => x[groupByFieldName] : undefined;
    }, [groupBy, groupByFieldName]);

    return (
        <Autocomplete
            options={[{ id: undefined, title: "nodata", key: "undefinedData" }, ...values]}
            value={stateValue || undefined}
            onChange={onChangedValue}
            renderOption={renderOptionCb ? renderOptionCb : inputSelectBaseRenderOption}
            filterOptions={inputSelectFilterOptions}
            noOptionsText={noOptionsText || lang.components.inputAutocomplete.noOptionsText}
            groupBy={toGroupBy}
            disableClearable
            readOnly={readOnly}
            disabled={disabled || loading}
            sx={sx}
            isOptionEqualToValue={(option, val) => {
                if (typeof val === "undefined" || typeof val?.id === "undefined") {
                    return option?.id === undefined;
                }
                return option?.id === val.id;
            }}
            {...inputSelectBaseProps}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    {...inputProps}
                    {...props}
                    autoComplete="off"
                    label={label}
                    variant={variant}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
}
