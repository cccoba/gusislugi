import { useMemo } from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

import lang, { sprintf } from "lang";

import { isGuid, isUrl } from "api/common/helper";
import { checkDate } from "api/common/helper";

import { Select, Switcher, InputAutocomplete, Counter, InputImage, UserSelect } from "..";

import {
    IFormField,
    IFormFieldCounter,
    IFormFieldImage,
    IFormFieldSelect,
    IFormFieldSelectFiltered,
    IFormFieldText,
} from ".";

interface IProps extends IFormField {
    fieldsVariant: "filled" | "outlined" | "standard";
    onInputChange: (name: string, value: any) => void;
    control: any;
    maxLength?: number;
    minLength?: number;
    pattern?: any;
}

const langPage = lang.components.form;

function FormInput({
    type = "text",
    name,
    title,
    required = false,
    fullWidth = true,
    disabled = false,
    hidden = false,
    fieldProps,

    fieldsVariant,
    onInputChange,
    control,

    ...fieldParams
}: IProps) {
    const variant = !!fieldParams?.variant ? fieldParams.variant : fieldsVariant;
    const rules = useMemo(() => {
        const newRules: any = {};
        if (!!required) {
            newRules.required = langPage.isRequired;
        }
        if (!!fieldParams?.maxLength) {
            newRules.maxLength = {
                value: fieldParams.maxLength,
                message: sprintf(langPage.maxLength, fieldParams.maxLength),
            };
        }
        if (!!fieldParams?.minLength) {
            newRules.minLength = {
                value: fieldParams.minLength,
                message: sprintf(langPage.minLength, fieldParams.minLength),
            };
        }
        if (!!fieldParams?.validateFn) {
            newRules.validate = fieldParams?.validateFn;
        } else if (!!fieldParams?.pattern) {
            newRules.validate = (v: any) => {
                if (!required && v?.length === 0) {
                    return true;
                }
                return fieldParams.pattern.test(v) || langPage.pattern;
            };
        } else {
            switch (type) {
                case "number":
                case "counter":
                case "user":
                    newRules.validate = (v: any) => {
                        if (!required && !v?.length) {
                            return true;
                        }
                        return /^[0-9]+$/.test(v) || langPage.isNumber;
                    };
                    break;
                case "date":
                    newRules.validate = (v: any) => {
                        if (!required && !v) {
                            return true;
                        }
                        return checkDate(v) || langPage.isDate;
                    };
                    break;
                case "dateTime":
                    newRules.validate = (v: any) => {
                        if (!required && !v) {
                            return true;
                        }
                        return checkDate(v) || langPage.isDate;
                    };
                    break;
                case "phone":
                    newRules.validate = (v: any) => {
                        if (!required && v?.length === 0) {
                            return true;
                        }
                        const value = v.replace(/(\D)/g, "").toString();
                        return (value[0] === "7" && value.length === 11) || langPage.isPhone;
                    };
                    break;
                case "image":
                    newRules.validate = (v: any) => {
                        if (!!required) {
                            return !!v && Number.isInteger(v);
                        }
                        return true;
                    };
                    break;
                case "email":
                    newRules.validate = (v: any) => {
                        if (!required && v?.length === 0) {
                            return true;
                        }
                        return (
                            String(v)
                                .toLowerCase()
                                .match(
                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                ) || langPage.isEmail
                        );
                    };
                    break;
                case "url":
                    newRules.validate = (v: any) => {
                        if (!required && v?.length === 0) {
                            return true;
                        }
                        return isUrl(v);
                    };
                    break;
                case "time":
                    newRules.validate = (v: any) => {
                        if (!!required) {
                            if (!v?.length || v === "--:--" || v === ":00") {
                                return false;
                            }
                        }
                        return true;
                    };
                    break;
                case "text":
                    newRules.validate = (v: any) => {
                        if (!!required && !v?.length) {
                            return false;
                        }
                        return true;
                    };
                    break;
            }
        }
        return newRules;
    }, [fieldParams, type, required]);

    if (!!hidden) {
        return null;
    }
    switch (type) {
        case "select":
            const selectFormField = fieldParams as IFormFieldSelect;
            return (
                <Controller
                    key={name}
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => {
                        return (
                            <Select
                                onChangeValue={(v) => {
                                    onInputChange(name, v);
                                }}
                                value={field.value}
                                values={!!selectFormField?.values?.length ? selectFormField.values : []}
                                multiple={!!selectFormField?.multiple}
                                fullWidth={fullWidth}
                                disabled={disabled}
                                label={title}
                                variant={variant}
                                required={required}
                                error={fieldState.invalid}
                                helperText={fieldState.error?.message}
                                {...fieldProps}
                            />
                        );
                    }}
                />
            );
        case "selectFiltered":
            const selectFormFieldFiltered = fieldParams as IFormFieldSelectFiltered;
            return (
                <Controller
                    key={name}
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => {
                        if (name === "gradeTreeIds") console.log("fieldState", fieldState);

                        return (
                            <InputAutocomplete
                                onChange={(v: any) => {
                                    onInputChange(name, v);
                                }}
                                value={field.value}
                                values={!!selectFormFieldFiltered?.values?.length ? selectFormFieldFiltered.values : []}
                                multiple={!!selectFormFieldFiltered?.multiple}
                                fullWidth={fullWidth}
                                disabled={disabled}
                                label={title}
                                variant={variant}
                                required={required}
                                error={fieldState.invalid}
                                helperText={fieldState.error?.message}
                                {...fieldProps}
                            />
                        );
                    }}
                />
            );
        case "switcher":
            return (
                <Controller
                    key={name}
                    name={name}
                    rules={rules}
                    control={control}
                    render={({ field }) => {
                        return (
                            <Switcher
                                onChangeValue={(v) => onInputChange(name, v)}
                                textValue={title}
                                value={!!field.value}
                                fullWidth={fullWidth}
                                disabled={disabled}
                                variant={variant}
                                required={required}
                                {...fieldProps}
                            />
                        );
                    }}
                />
            );
        case "counter":
            const counterFieldParams = fieldParams as IFormFieldCounter;
            return (
                <Controller
                    key={name}
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => {
                        return (
                            <Counter
                                onChangeValue={(v: string) => onInputChange(name, v)}
                                {...counterFieldParams}
                                value={field.value}
                                label={title}
                                fullWidth={fullWidth}
                                disabled={disabled}
                                variant={variant}
                                required={required}
                                error={fieldState.invalid}
                                helperText={fieldState.error?.message}
                                {...fieldProps}
                            />
                        );
                    }}
                />
            );
        case "image":
            const imageProps = fieldParams as IFormFieldImage;
            return (
                <Controller
                    key={name}
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => {
                        return (
                            <InputImage
                                onChangeValue={(value: any) => {
                                    onInputChange(name, value);
                                }}
                                value={field.value}
                                fullWidth={fullWidth}
                                disabled={disabled}
                                label={title}
                                variant={variant}
                                error={fieldState.invalid}
                                helperText={fieldState.error?.message}
                                required={required}
                                {...fieldProps}
                                {...imageProps}
                            />
                        );
                    }}
                />
            );
        case "user":
            return (
                <Controller
                    key={name}
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => {
                        return (
                            <UserSelect
                                onChangeValue={(value: any) => {
                                    onInputChange(name, value);
                                }}
                                value={field.value}
                                fullWidth={fullWidth}
                                disabled={disabled}
                                label={title}
                                variant={variant}
                                error={fieldState.invalid}
                                helperText={fieldState.error?.message}
                                required={required}
                                {...fieldProps}
                            />
                        );
                    }}
                />
            );
        default:
            const textFormField = fieldParams as IFormFieldText;
            if (!fieldProps) {
                fieldProps = {};
            }
            if (!!textFormField.maxLength) {
                if (!fieldProps?.inputProps) {
                    fieldProps.inputProps = {};
                }
                fieldProps.inputProps.maxLength = textFormField.maxLength;
            }
            return (
                <Controller
                    key={name}
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => {
                        return (
                            <TextField
                                {...field}
                                onChange={(e: any) => onInputChange(name, e.target.value)}
                                label={title}
                                type={type}
                                fullWidth={fullWidth}
                                disabled={disabled}
                                variant={variant}
                                error={fieldState.invalid}
                                helperText={fieldState.error?.message}
                                required={required}
                                {...fieldProps}
                            />
                        );
                    }}
                />
            );
    }
}
export default FormInput;
