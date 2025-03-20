import React, { useEffect, useMemo, useState } from "react";
import {
    Autocomplete,
    TextField,
    StandardTextFieldProps,
    Box,
    SxProps,
    FilterOptionsState,
    Checkbox,
    AutocompleteRenderOptionState,
    InputAdornment,
} from "@mui/material";

import Icon, { TIconName } from "components/Icon";
import { textFilter } from "api/common/filters";

import lang from "lang";

import Image from "../Image";

import { ISelectValue } from "./Select";

const langPage = lang.components.inputAutocomplete;

interface IProps extends StandardTextFieldProps {
    sx?: SxProps;
    disableClearable?: boolean;
    values: ISelectValue[];
    rightArrow?: boolean;

    onChange?: any;
    error?: boolean;
    multiple?: boolean;
    clearOnBlur?: boolean;
    disabled?: boolean;
    withSelectAll?: boolean;
    selectAllId?: string;
    limitTags?: number;
    loading?: boolean;
    showIconInResult?: boolean;
    onSearch?: (data: ISelectValue[], inputValue: string) => ISelectValue[];
    groupBy?: (option: any) => any;
    onChangeSearchValue?: (data: string) => void;
    onSelectValue?: (data: any) => void;
}
export default function InputAutocomplete({
    sx,
    disableClearable = false,
    values = [],
    rightArrow = false,
    onChangeSearchValue,
    onSelectValue,
    onChange,
    showIconInResult,
    value = "",
    multiple = false,
    clearOnBlur = true,
    disabled = false,
    withSelectAll = false,
    selectAllId = "select-all",
    limitTags = 3,
    loading = false,
    onSearch,
    groupBy,
    ...props
}: IProps) {
    const [stateValue, setStateValue] = useState<any>(value);

    const options = useMemo(() => {
        const newOptions = [...values];
        if (!!values.length && withSelectAll) {
            newOptions.unshift({
                id: selectAllId,
                title: langPage.selectAll,
            });
        }
        return newOptions;
    }, [values, multiple, withSelectAll, selectAllId]);

    useEffect(() => {
        let newStateValue: any;
        if (multiple) {
            newStateValue = [];
            if (Array.isArray(value) && value.length && options.length) {
                newStateValue = options.filter((v) => {
                    return !!value.find((v2) => v2 === v.id);
                });
            }
        } else {
            newStateValue = null;
            if (typeof value === "string" || typeof value === "number") {
                if (value.toString().length > 0) {
                    newStateValue = options.find((x) => x.id === value);
                    if (!newStateValue) {
                        newStateValue = null;
                    }
                }
            }
        }
        setStateValue(newStateValue);
    }, [value, options, multiple]);
    const onSearchTextChange = (e: any) => {
        onChangeSearchValue?.(e?.target?.value);
    };
    const onValueSelected = (changedValue: any) => {
        let newValue = multiple ? [...changedValue] : { ...changedValue };

        if (
            multiple &&
            withSelectAll &&
            !!newValue?.length &&
            newValue.findIndex((x: ISelectValue) => x.id === selectAllId) > -1
        ) {
            if (values.length === stateValue.length) {
                newValue = [];
            } else {
                newValue = [...values];
            }
        }

        if (!!onSelectValue && !!newValue) {
            onSelectValue(newValue);
        }
        if (onChange) {
            if (multiple) {
                onChange(!!newValue && newValue?.length ? newValue.map((x: ISelectValue) => x.id) : []);
            } else {
                onChange(!!newValue && newValue?.id ? newValue?.id : null);
            }
        }
    };
    const onSearchTextClear = () => {
        onSelectValue?.(!!multiple ? [] : null);
    };
    const onStartSearch = (data: ISelectValue[], { inputValue }: FilterOptionsState<any>) => {
        if (onSearch) {
            return onSearch(data, inputValue);
        }
        return data.filter((v) => textFilter(inputValue, v.title));
    };
    const getOptionLabel = (option: any) => {
        if (option) {
            return option?.title ? option.title : "";
        }
        return "";
    };

    const renderOption = (
        data: React.HTMLAttributes<HTMLLIElement>,
        option: ISelectValue,
        { selected }: AutocompleteRenderOptionState
    ) => {
        return (
            <Box
                component="li"
                sx={{ "&  img": { mr: 2, flexShrink: 0 } }}
                {...data}
                key={option?.key ? option?.key : option.id}
            >
                {option.image ? (
                    <Image
                        avatar
                        image={option.image}
                        style={{ marginRight: "4px" }}
                    />
                ) : null}
                {option.icon ? (
                    <Icon
                        name={option.icon}
                        style={{ marginRight: "4px" }}
                    />
                ) : null}
                {option.id === selectAllId && <Checkbox checked={values.length === stateValue?.length} />}
                {option.title}
            </Box>
        );
    };
    return (
        <Autocomplete
            value={stateValue}
            clearOnBlur={clearOnBlur}
            freeSolo={!rightArrow}
            options={options}
            sx={sx}
            disableClearable={disableClearable}
            blurOnSelect={!multiple}
            disableCloseOnSelect={multiple}
            filterOptions={onStartSearch}
            multiple={multiple}
            disabled={disabled}
            groupBy={groupBy}
            noOptionsText={langPage.noOptionsText}
            limitTags={limitTags}
            loading={loading}
            onChange={(event, newValue) => {
                onValueSelected(newValue);
            }}
            onInputChange={(e: any, v: string) => {
                if (!v) {
                    onSearchTextClear();
                }
            }}
            renderOption={renderOption}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={(option, val) => {
                if (typeof val.id !== "undefined") {
                    return option.id === val.id;
                }
                return option.id === val;
            }}
            renderInput={({ inputProps = {}, InputProps, ...params }) => {
                if (showIconInResult) {
                    const iconValue = values.find((v) => v.id === value);
                    InputProps.startAdornment = (
                        <InputAdornment position="start">
                            {iconValue ? <Icon name={iconValue.id as TIconName} /> : " "}
                        </InputAdornment>
                    );
                }
                return (
                    <TextField
                        variant="standard"
                        {...params}
                        inputProps={inputProps}
                        InputProps={InputProps}
                        {...props}
                        onChange={onSearchTextChange}
                        autoComplete="off"
                    />
                );
            }}
        />
    );
}
