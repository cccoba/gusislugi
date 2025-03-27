import { useMemo, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import { objCopyWithType } from "api/common/helper";
import { IInputProps } from "api/interfaces/components/IInputProps";

import lang from "lang";

import { ISelectValue } from "../Select";

import {
    IInputSelectBaseProps,
    inputSelectBaseProps,
    inputSelectBaseRenderMultiplyOption,
    inputSelectFilterOptions,
    sortValuesByFieldName,
} from "./helper";
export interface IInputSelectMultipleProps<T> extends IInputProps<T[]>, IInputSelectBaseProps {
    isCloseOnSelect?: boolean;
    withSelectAll?: boolean;
    limitSelectedItems?: number;
}
export default function InputSelectMultiple<T>({
    sx,
    values,
    value,
    readOnly = false,
    disabled = false,
    withSelectAll = false,
    loading = false,
    variant = "standard",
    label,
    autoComplete = "off",
    limitSelectedItems = 3,
    inputProps = {},
    noOptionsText,
    renderOptionCb,
    isCloseOnSelect,
    groupByFieldName,
    groupBy,
    onChangeValue,
    ...props
}: IInputSelectMultipleProps<T>) {
    const selectAllId = "select-all";
    const [open, setOpen] = useState(false);
    const closePopper = () => setOpen(false);
    const openPopper = () => setOpen(true);
    const stateValue = useMemo(() => {
        if (value?.length) {
            return values?.filter((x) => (value as any[])?.includes(x.id)) || [];
        }
        return [];
    }, [value, values]);
    const options = useMemo(() => {
        const newOptions = objCopyWithType(sortValuesByFieldName(values, groupByFieldName));
        if (!!values.length && withSelectAll) {
            newOptions.unshift({
                id: selectAllId,
                title: "",
            });
        }
        return newOptions;
    }, [values, withSelectAll, selectAllId, groupByFieldName]);
    const onChangedValue = (_: any, newValue: ISelectValue[]) => {
        if (withSelectAll && newValue.findIndex((x) => x.id === selectAllId) > -1) {
            if (values.length === value.length) {
                onChangeValue([]);
            } else {
                onChangeValue(values?.map((x: ISelectValue) => x.id) || []);
            }
            closePopper();
            return;
        }
        onChangeValue(newValue?.map((x: ISelectValue) => x.id) || []);
    };
    const toRenderOption = (...args: any) => {
        if (renderOptionCb) {
            return renderOptionCb(...args);
        } else {
            return inputSelectBaseRenderMultiplyOption(
                args[0],
                args[1],
                value || [],
                withSelectAll ? { selectAllId, valuesCount: values.length } : undefined
            );
        }
    };
    const toGroupBy = useMemo(() => {
        if (typeof groupBy === "function") {
            return groupBy;
        }
        return groupByFieldName ? (x: any) => x[groupByFieldName] : undefined;
    }, [groupBy, groupByFieldName]);
    return (
        <Autocomplete
            open={open}
            onOpen={openPopper}
            onClose={closePopper}
            multiple
            options={options}
            value={stateValue}
            onChange={onChangedValue}
            filterOptions={inputSelectFilterOptions}
            renderOption={toRenderOption}
            noOptionsText={noOptionsText || lang.components.inputAutocomplete.noOptionsText}
            disableCloseOnSelect={!isCloseOnSelect}
            limitTags={limitSelectedItems}
            groupBy={toGroupBy}
            readOnly={readOnly}
            disabled={disabled || loading}
            sx={{
                ...sx,
                "& .MuiAutocomplete-inputRoot": {
                    maxHeight: "100px",
                    overflowX: "hidden",
                    overflowY: "auto",
                },
                "& . MuiChip-root": {
                    maxWidth: "70vw",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "red",
                },
            }}
            {...inputSelectBaseProps}
            isOptionEqualToValue={(option, val) => {
                if (typeof val === "undefined" || typeof val?.id === "undefined") {
                    return false;
                }
                return option?.id === val.id;
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    {...inputProps}
                    {...props}
                    label={label}
                    variant={variant}
                    autoComplete="off"
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
