import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { SxProps } from "@mui/material";
import { Box, Typography } from "@mui/material";

import lang from "lang";
import { loaderHide, loaderShow } from "store/reducers/ComponentsSlice";

import { useAppDispatch } from "api/hooks/redux";

import type { IModalProps } from "components/Modal";

import Modal from "components/Modal";

import FormButtons, { getFormModalActions } from "./FormButtons";
import FormFields from "./FormFields";
import type { TFormField } from "./FormAdapters";

export interface IFormGroup {
    title: string;
    name: string;
}
export interface IFormProps {
    onSubmit?: (values: any) => void;
    onCancel?: () => void;
    onInputChanged?: (values: any, errors: any) => void;
    onIsValidChanged?: (value: boolean) => void;
    fields: TFormField[];
    values: any;
    title?: string;
    submitBtnType?: "cancel_save" | "save" | "fab" | "no";
    isLoading?: boolean;
    groups?: IFormGroup[];
    cancelBtnText?: string;
    submitBtnText?: string;
    columnCount?: 1 | 2 | 3;
    children?: ReactNode;
    sx?: SxProps;
    fieldsVariant?: "filled" | "outlined" | "standard";
    groupVariant?: "fieldset" | "card";
    autoCompleteForm?: string;
    saveDisabled?: boolean;
    modalProps?: IModalProps;
}

export default function Form({
    onSubmit,
    onCancel,
    onInputChanged,
    onIsValidChanged,
    title = "",
    fields = [],
    values = {},
    submitBtnType = "cancel_save",
    isLoading = false,
    groups = [],
    cancelBtnText = lang.components.form.cancelBtn,
    submitBtnText = lang.components.form.submitBtn,
    columnCount = 1,
    children,
    sx = {},
    fieldsVariant = "standard",
    groupVariant = "fieldset",
    autoCompleteForm = "off",
    saveDisabled = false,
    modalProps,
}: IFormProps) {
    const [isInit, setIsInit] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const {
        control,
        handleSubmit,
        formState: { isValid, errors },
        setValue,
        trigger,
        reset,
        getValues,
    } = useForm({ mode: "onChange" });
    const dispatch = useAppDispatch();
    const [columnSx, setColumnSx] = useState<SxProps>({});
    useEffect(() => {
        const newColumnSx: any = {
            flex: `${Math.round(100 / columnCount)}%`,
            padding: "0 2px",
        };
        setColumnSx(newColumnSx);
    }, [columnCount]);

    useEffect(() => {
        if (isInit) {
            dispatch(loaderHide());
        } else {
            dispatch(loaderShow());
        }
    }, [dispatch, isInit]);
    useEffect(() => {
        if (!isInit && values && fields) {
            setIsInit(true);
        }
    }, [values, fields]);

    useEffect(() => {
        if (isInit && values) {
            reset(values);
        }
    }, [values, isInit]);

    const formFields = useMemo(() => {
        if (!!isInit && !!fields?.length) {
            return fields;
        }
        return [];
    }, [fields, isInit]);

    useEffect(() => {
        onIsValidChanged?.(isValid);
    }, [isValid]);

    const onFormSubmit = (data: any) => {
        onSubmit?.(data);
    };
    const onFormCancel = () => {
        onCancel?.();
    };
    const formSubmit = () => {
        if (formRef?.current) {
            formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
        }
    };
    const onInputChange = (name: string, value: any) => {
        setValue(name, value);
        trigger(name);
        onInputChanged?.(getValues(), errors);
    };
    if (!isInit) {
        return null;
    }
    if (modalProps) {
        return (
            <Modal
                {...modalProps}
                actions={getFormModalActions({
                    submitBtnType: submitBtnType,
                    isLoading: isLoading,
                    isValid: isValid,
                    saveDisabled: saveDisabled,
                    onFormSubmit: formSubmit,
                    onFormCancel: onCancel ?? modalProps?.onClose,
                    cancelBtnText: cancelBtnText,
                    submitBtnText: submitBtnText,
                })}
            >
                <Box sx={sx}>
                    <form
                        onSubmit={handleSubmit(onFormSubmit)}
                        ref={formRef}
                        autoComplete={autoCompleteForm}
                    >
                        {!!title && <Typography variant="h2">{title}</Typography>}
                        <FormFields
                            groups={groups}
                            formFields={formFields}
                            groupVariant={groupVariant}
                            fieldsVariant={fieldsVariant}
                            columnSx={columnSx}
                            columnCount={columnCount}
                            onInputChange={onInputChange}
                            control={control}
                            sx={sx}
                        />
                        {!!children && children}
                    </form>
                </Box>
            </Modal>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onFormSubmit)}
            ref={formRef}
            autoComplete={autoCompleteForm}
        >
            {!!title && <Typography variant="h2">{title}</Typography>}
            <FormFields
                groups={groups}
                formFields={formFields}
                groupVariant={groupVariant}
                fieldsVariant={fieldsVariant}
                columnSx={columnSx}
                columnCount={columnCount}
                onInputChange={onInputChange}
                control={control}
                sx={sx}
            />
            {!!children && children}
            <FormButtons
                submitBtnType={submitBtnType}
                isLoading={isLoading}
                isValid={isValid}
                saveDisabled={saveDisabled}
                onFormSubmit={formSubmit}
                onFormCancel={onFormCancel}
                cancelBtnText={cancelBtnText}
                submitBtnText={submitBtnText}
            />
        </form>
    );
}
