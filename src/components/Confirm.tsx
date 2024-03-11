import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import lang from "lang";

export interface IConfirmProps {
    open: boolean;
    onClose?: (confirm: boolean, oterProps?: any) => void;
    title?: string;
    text?: string;
    okText?: string;
    noText?: string;
    otherProps?: any;
}

export default function Confirm({
    open = false,
    onClose,
    title = lang.components.confirm.title,
    text = "",
    okText = lang.components.confirm.okText,
    noText = lang.components.confirm.noText,
    otherProps,
}: IConfirmProps) {
    const handleCloseNo = () => {
        if (!!onClose) {
            onClose(false, typeof otherProps !== "undefined" ? otherProps : undefined);
        }
    };
    const handleCloseYes = () => {
        if (!!onClose) {
            onClose(true, typeof otherProps !== "undefined" ? otherProps : undefined);
        }
    };
    return (
        <Dialog
            open={open}
            onClose={() => handleCloseNo}
        >
            <DialogTitle sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ mt: 1 }}>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCloseNo}
                    color="inherit"
                >
                    {" "}
                    {noText}
                </Button>
                <Button
                    onClick={handleCloseYes}
                    color="primary"
                    autoFocus
                >
                    {okText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
