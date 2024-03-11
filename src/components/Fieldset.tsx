import { Box, BoxProps, Card, CardHeader, CardContent } from "@mui/material";
import { ReactNode } from "react";

interface IProps extends BoxProps {
    label?: string | ReactNode;
    children?: ReactNode;
    variant?: "fieldset" | "card";
}
export default function Fieldset({
    label = "",
    children = null,
    variant = "fieldset",
    ...props
}: IProps) {
    if (variant === "card") {
        return (
            <Box component={Card}
                {...props}
                sx={props.sx}
            >
                {!!label && (
                    <CardHeader
                        title={label}
                    />
                )}
                <CardContent>
                    {children}
                </CardContent>
            </Box>
        )
    }
    const sx = {
        borderRadius: 2,
        borderWidth: 1,
    }
    return (
        <Box component="fieldset" {...props} sx={{ ...sx, ...props.sx }}>
            {!!label && <legend style={{ padding: '0 4px', }}>{label}</legend>}
            {children}
        </Box>
    )
}