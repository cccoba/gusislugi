import {
    FormControlProps,
    FormControl as MuiFormControl,
    FormHelperText,
    FormLabel,
    SxProps,
    Divider,
} from "@mui/material";
import { useEffect, useState } from "react";

interface IProps extends FormControlProps {
    helperText?: string;
    disabled?: boolean;
    label?: string;
}
interface IVariantProps {
    controlComponent: "div" | "fieldset";
    labelComponent: "label" | "legend";
    controllerSx: SxProps;
    labelSx: SxProps;
}

export default function FormControl({
    variant = "standard",
    children,
    helperText = "",
    error = false,
    disabled = false,
    label = "",
    ...props
}: IProps) {
    const [variantProps, setVariantProps] = useState<IVariantProps>({
        controlComponent: "div",
        labelComponent: "label",
        controllerSx: {},
        labelSx: {},
    });
    useEffect(() => {
        let newVariantProps: IVariantProps = {
            controlComponent: "div",
            labelComponent: "label",
            controllerSx: {
                "& .MuiDivider-root": {
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                },
                "&:hover .MuiDivider-root": {
                    borderBottom: disabled ? "" : "1.98px solid rgba(0, 0, 0, 0.87)",
                },
            },
            labelSx: {
                fontSize: "0.75rem",
            },
        };
        if (variant === "outlined") {
            newVariantProps = {
                controlComponent: "fieldset",
                labelComponent: "legend",
                controllerSx: {
                    borderRadius: "4px",
                    border: "1px solid rgba(0, 0, 0, 0.23)!important",
                    mt: "-9px",
                    "&:hover": {
                        borderColor: disabled ? "" : "rgba(0, 0, 0, 0.87)!important",
                    },
                },
                labelSx: {
                    mx: 1,
                    px: 1,
                    fontSize: "0.75rem",
                },
            };
        }
        setVariantProps(newVariantProps);
    }, [variant]);
    return (
        <>
            <MuiFormControl
                variant={variant}
                error={error}
                {...props}
                component={variantProps.controlComponent}
                sx={variantProps.controllerSx}
                disabled={disabled}
            >
                {!!label && (
                    <FormLabel
                        component={variantProps.labelComponent}
                        sx={variantProps.labelSx}
                    >
                        {label}
                    </FormLabel>
                )}
                {children}
                {!!props?.fullWidth && variant !== "outlined" && (
                    <Divider
                        sx={
                            error
                                ? { borderColor: "error.main", borderBottomWidth: "1.98px" }
                                : disabled
                                ? { borderStyle: "dotted", borderColor: "rgba(0,0,0,0.5)" }
                                : { borderColor: "rgba(0,0,0,0.5)" }
                        }
                    />
                )}
            </MuiFormControl>
            {!!helperText && (
                <FormHelperText
                    error={error}
                    variant={variant}
                >
                    {helperText}
                </FormHelperText>
            )}
        </>
    );
}
