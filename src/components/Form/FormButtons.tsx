import { Box, Button, Fab } from "@mui/material";
import Icon from "components/Icon";
import FabIcon from "components/Icon/FabIcon";
import { useMemo } from "react";

interface IProps {
    submitBtnType: "cancel_save" | "save" | "fab" | "no";
    isLoading?: boolean;
    isValid?: boolean;
    onFormSubmit: () => void;
    onFormCancel: () => void;
    cancelBtnText: string;
    submitBtnText: string;
    saveDisabled?: boolean;
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
