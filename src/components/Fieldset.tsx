import { ReactNode } from "react";
import {
    Box,
    BoxProps,
    Card,
    CardHeader,
    CardContent,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
    Typography,
} from "@mui/material";

import Icon from "./Icon";

interface IProps extends Omit<BoxProps, "title"> {
    label?: string | ReactNode;

    children?: ReactNode;
    variant?: "fieldset" | "card" | "accordion";
    accordionProps?: {
        defaultHide?: boolean;
        withDivider?: boolean;
        action?: ReactNode;
    };
}
export default function Fieldset({
    label = "",
    children = null,
    variant = "fieldset",
    accordionProps,
    ...props
}: IProps) {
    if (variant === "accordion") {
        return (
            <Accordion defaultExpanded={!accordionProps?.defaultHide}>
                <AccordionSummary
                    expandIcon={<Icon name="down" />}
                    sx={{
                        minHeight: "32px",
                        "&.Mui-expanded": {
                            minHeight: "32px",
                        },
                        "& .MuiAccordionSummary-content": {
                            display: "block",
                            my: 0,
                        },
                    }}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        {typeof label === "object" ? label : <Typography variant="h5">{label}</Typography>}
                        {!!accordionProps?.action && accordionProps.action}
                    </Box>
                </AccordionSummary>
                {!!accordionProps?.withDivider && <Divider />}
                <AccordionDetails>{children}</AccordionDetails>
            </Accordion>
        );
    }
    if (variant === "card") {
        return (
            <Box
                component={Card}
                {...props}
                sx={props.sx}
            >
                {!!label && <CardHeader title={label} />}
                <CardContent>{children}</CardContent>
            </Box>
        );
    }
    const sx = {
        borderRadius: 2,
        borderWidth: 1,
    };
    return (
        <Box
            component="fieldset"
            {...props}
            sx={{ ...sx, ...props.sx }}
        >
            {!!label && <legend style={{ padding: "0 4px" }}>{label}</legend>}
            {children}
        </Box>
    );
}
