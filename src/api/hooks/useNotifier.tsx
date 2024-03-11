import { useCallback } from "react";
import { useSnackbar, OptionsObject, SnackbarKey } from "notistack";
import { IconButton } from "components";

export function useNotifier() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const showError = useCallback(
        (message: string) =>
            enqueueSnackbar(message, {
                variant: "error",
                anchorOrigin: { horizontal: "center", vertical: "bottom" },
                action: (key: SnackbarKey) => (
                    <IconButton
                        size="small"
                        iconProps={{ fontSize: "small" }}
                        color="inherit"
                        name="close"
                        onClick={() => closeSnackbar(key)}
                    />
                ),
            }),
        [enqueueSnackbar, closeSnackbar]
    );

    const showSuccess = useCallback(
        (message: string) =>
            enqueueSnackbar(message, {
                variant: "success",
                anchorOrigin: { horizontal: "center", vertical: "bottom" },
                action: (key: SnackbarKey) => (
                    <IconButton
                        size="small"
                        iconProps={{ fontSize: "small" }}
                        color="inherit"
                        name="close"
                        onClick={() => closeSnackbar(key)}
                    />
                ),
            }),
        [enqueueSnackbar, closeSnackbar]
    );
    const showInfo = useCallback(
        (message: string) =>
            enqueueSnackbar(message, {
                variant: "info",
                anchorOrigin: { horizontal: "center", vertical: "bottom" },
                action: (key: SnackbarKey) => (
                    <IconButton
                        size="small"
                        iconProps={{ fontSize: "small" }}
                        color="inherit"
                        name="close"
                        onClick={() => closeSnackbar(key)}
                    />
                ),
            }),
        [enqueueSnackbar, closeSnackbar]
    );
    const showNotification = (message: string, options?: OptionsObject) => {
        enqueueSnackbar(message, options);
    };
    return { showError, showSuccess, showInfo, showNotification };
}
