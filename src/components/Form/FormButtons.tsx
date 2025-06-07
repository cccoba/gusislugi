import { Box, Button, Fab } from "@mui/material";
import Icon from "components/Icon";
import FabIcon from "components/Icon/FabIcon";
import type { ReactNode } from "react";
import { useMemo } from "react";

interface IProps {
    submitBtnType: "cancel_save" | "save" | "fab" | "no";
    isLoading?: boolean;
    isValid?: boolean;
    onFormSubmit: () => void;
    onFormCancel?: () => void;
    cancelBtnText: string;
    submitBtnText: string;
    saveDisabled?: boolean;
}
export function getFormModalActions({
    submitBtnType,
    isLoading = false,
    isValid = true,
    cancelBtnText,
    submitBtnText,
    saveDisabled = false,
    onFormSubmit,
    onFormCancel,
}: IProps) {
    const actions: ReactNode[] = [];
    actions.push();
    if (submitBtnType === "no") {
        return actions;
    }
    if (submitBtnType === "cancel_save") {
        return [
            <Button
                key="cancel"
                color="inherit"
                onClick={onFormCancel}
            >
                {cancelBtnText}
            </Button>,
            <Button
                key="submit"
                onClick={onFormSubmit}
                color="primary"
                disabled={isLoading || !isValid || saveDisabled}
                variant="contained"
            >
                {submitBtnText}
            </Button>,
        ];
    }
    return [
        <Button
            key="submit"
            onClick={onFormSubmit}
            color="primary"
            disabled={isLoading || !isValid || saveDisabled}
            variant="contained"
        >
            {submitBtnText}
        </Button>,
    ];
}
function FormButtons({
    submitBtnType,
    isLoading = false,
    isValid = true,
    cancelBtnText,
    submitBtnText,
    saveDisabled = false,
    onFormSubmit,
    onFormCancel,
}: IProps) {
    const saveIdDisabled = useMemo(() => {
        return isLoading || !isValid || saveDisabled;
    }, [isLoading, isValid, saveDisabled]);
    return (
        <>
            {submitBtnType === "fab" ? (
                <FabIcon
                    color="primary"
                    disabled={saveIdDisabled}
                    icon="save"
                    onClick={onFormSubmit}
                />
            ) : submitBtnType === "cancel_save" ? (
                <Box sx={{ textAlign: "right", mt: 2 }}>
                    <Button
                        color="inherit"
                        onClick={onFormCancel}
                    >
                        {cancelBtnText}
                    </Button>
                    <Button
                        onClick={onFormSubmit}
                        color="primary"
                        disabled={saveIdDisabled}
                    >
                        {submitBtnText}
                    </Button>
                </Box>
            ) : submitBtnType === "save" ? (
                <Box sx={{ textAlign: "right", mt: 2 }}>
                    <Button
                        onClick={onFormSubmit}
                        color="primary"
                        disabled={saveIdDisabled}
                    >
                        {submitBtnText}
                    </Button>
                </Box>
            ) : null}
        </>
    );
}
export default FormButtons;
