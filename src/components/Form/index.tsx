import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, SxProps, Typography } from "@mui/material";

import lang from "lang";
import { loaderHide, loaderShow } from "store/reducers/ComponentsSlice";

import { useAppDispatch } from "api/hooks/redux";

import { Fieldset } from "..";

import FormInput from "./FormInput";
import FormButtons from "./FormButtons";
import { TFormField } from "./FormAdapters";

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

    return (
        <form
            onSubmit={handleSubmit(onFormSubmit)}
            ref={formRef}
            autoComplete={autoCompleteForm}
        >
            {!!title && <Typography variant="h2">{title}</Typography>}
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", ...sx }}>
                {groups?.length
                    ? groups.map((g) => {
                          return (
                              <Fieldset
                                  key={"group" + g.name}
                                  variant={groupVariant}
                                  label={g.title}
                                  sx={{ width: "100%", mb: 2 }}
                              >
                                  {formFields
                                      .filter((f) => f?.group === g.name)
                                      .map((formField: TFormField, index) => {
                                          const variant = formField?.variant ? formField.variant : fieldsVariant;
                                          let sx: SxProps = {};
                                          if (variant === "outlined") {
                                              sx = { ...columnSx, mb: 1 };
                                          } else {
                                              sx = { ...columnSx, mt: index === 0 ? 0 : 2 };
                                          }
                                          if (formField?.hidden) {
                                              return null;
                                          }
                                          return (
                                              <Box
                                                  sx={sx}
                                                  key={formField.name}
                                              >
                                                  <FormInput
                                                      fieldsVariant={fieldsVariant}
                                                      onInputChange={onInputChange}
                                                      control={control}
                                                      {...formField}
                                                  />
                                              </Box>
                                          );
                                      })}
                              </Fieldset>
                          );
                      })
                    : formFields.map((formField: TFormField, index) => {
                          const variant = !!formField?.variant ? formField.variant : fieldsVariant;
                          let sx: SxProps = {};
                          if (variant === "outlined") {
                              sx = { ...columnSx, mb: 1.5 };
                          } else {
                              sx = { ...columnSx, mt: index === 0 && columnCount === 1 ? 0 : 2 };
                          }
                          if (!!formField?.hidden) {
                              return null;
                          }
                          return (
                              <Box
                                  sx={sx}
                                  key={formField.name}
                              >
                                  <FormInput
                                      fieldsVariant={fieldsVariant}
                                      onInputChange={onInputChange}
                                      control={control}
                                      {...formField}
                                  />
                              </Box>
                          );
                      })}
            </Box>
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
