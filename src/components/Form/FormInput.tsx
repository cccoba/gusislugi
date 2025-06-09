import { useMemo } from "react";
import { Controller } from "react-hook-form";

import lang, { sprintf } from "lang";

import FormAdapters, { type IFormAdapter, type IFormField } from "./FormAdapters";

interface IProps extends IFormField {
    fieldsVariant: "filled" | "outlined" | "standard";
    onInputChange: (name: string, value: any) => void;
    control: any;
    maxLength?: number;
    minLength?: number;
    pattern?: any;
}

function getInput(adapters: IFormAdapter[], adapterName: string) {
    const adapter = adapters.find((x) => x.name === adapterName);
    if (adapter) {
        return adapter.input;
    }
    return adapters.find((x) => x.name === "text")?.input || null;
}
function getValidate(adapters: IFormAdapter[], adapterName: string) {
    const adapter = adapters.find((x) => x.name === adapterName);
    if (adapter) {
        return adapter.validate;
    }
    return () => true;
}
export default function FormInput({
    type,
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
    const langPage = lang.components.form;
    const variant = fieldParams?.variant ? fieldParams.variant : fieldsVariant;
    const rules = useMemo(() => {
        const newRules: any = {};
        if (required) {
            newRules.required = langPage.isRequired;
        }
        if (fieldParams?.maxLength) {
            newRules.maxLength = {
                value: fieldParams.maxLength,
                message: sprintf(langPage.maxLength, fieldParams.maxLength),
            };
        }
        if (fieldParams?.minLength) {
            newRules.minLength = {
                value: fieldParams.minLength,
                message: sprintf(langPage.minLength, fieldParams.minLength),
            };
        }
        if (fieldParams?.validateFn) {
            newRules.validate = fieldParams?.validateFn;
        } else if (fieldParams?.pattern) {
            newRules.validate = (v: any) => {
                if (!required && v?.length === 0) {
                    return true;
                }
                return fieldParams.pattern.test(v) || langPage.pattern;
            };
        } else {
            const validateFn = getValidate(FormAdapters, type);
            if (validateFn) {
                newRules.validate = (v: any) => validateFn(v, required, fieldParams);
            }
        }
        return newRules;
    }, [fieldParams, type, required]);

    if (hidden) {
        return null;
    }

    const Input: any = getInput(FormAdapters, type);

    if (Input !== null) {
        return (
            <Controller
                key={name}
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => {
                    const { validateFn, ...otherFieldParams } = fieldParams;
                    return (
                        <Input
                            onChangeValue={(v: any) => onInputChange(name, v)}
                            value={field?.value}
                            fieldProps={fieldProps}
                            required={required}
                            fullWidth={fullWidth}
                            disabled={disabled}
                            label={title}
                            variant={variant}
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                            fieldParams={otherFieldParams}
                        />
                    );
                }}
            />
        );
    }
    return null;
}
