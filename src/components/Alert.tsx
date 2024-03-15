import { Alert as MuiAlert, AlertProps, AlertTitle, Box } from "@mui/material";
import lang from "lang";
import { ReactNode, useMemo } from "react";

interface IProps extends AlertProps {
    title?: string;
    text: string | ReactNode;
    type?: AlertProps["severity"];
    noTitle?: boolean;
    actionArea?: ReactNode;
}

function Alert({ title = "", text, type = "error", noTitle = false, actionArea, sx = {}, ...props }: IProps) {
    const titleText = useMemo(() => {
        if (!title) {
            switch (type) {
                case "error":
                    return lang.error;
                default:
                    return lang.warning;
            }
        }
        return title;
    }, [title, type]);
    return (
        <MuiAlert
            severity={type}
            {...props}
            sx={{ ...sx, "& .MuiAlert-message": { flexGrow: 5 } }}
        >
            {!noTitle && <AlertTitle>{titleText}</AlertTitle>}
            <Box>
                {text}
                {!!actionArea && <Box textAlign="right">{actionArea}</Box>}
            </Box>
        </MuiAlert>
    );
}
export default Alert;
