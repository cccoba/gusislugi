import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, ButtonGroup, Paper, Toolbar, Typography } from "@mui/material";

import { Icon, Loader } from "components";
import lang from "lang";

import { useNotifier } from "api/hooks/useNotifier";
import qr from "api/common/qrScanner";

import classes from "./BrowserQRScanner.module.css";

const langPage = lang.components.qrScanner;

const LS_CAMERA_INDEX = "qrCameraNum";

interface IProps {
    onRead: (message: string) => void;
    onCancel: () => void;
}

function BrowserQRScanner({ onRead, onCancel }: IProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [camerasToggle, setCamerasToggle] = useState(false);
    const navigate = useNavigate();
    const { showError } = useNotifier();
    useEffect(() => {
        qrInit();
        return () => {
            qr.stop();
        };
    }, []);
    const qrInit = async () => {
        try {
            setIsLoading(true);
            const initResult = await qr.init();
            setCamerasToggle(!!initResult?.camerasToggle);
            let newCameraIndex = 0;
            const backCameraIndex = qr.cameras.findIndex((x) => !!x?.label && x.label.indexOf("back") > -1);
            if (backCameraIndex > -1) {
                newCameraIndex = backCameraIndex;
            }
            const lsCameraIndexValue = localStorage.getItem(LS_CAMERA_INDEX);
            if (lsCameraIndexValue === null) {
                localStorage.setItem(LS_CAMERA_INDEX, newCameraIndex.toString());
            } else {
                newCameraIndex = parseInt(lsCameraIndexValue);
            }
            qr.start(newCameraIndex)
                .then((result: any) => {
                    getResult(result);
                })
                .catch((errText: any) => {
                    setError(errText);
                });
        } catch (err) {
            if (typeof err === "string") {
                setError(err);
            }
            console.log("qrInit err", err);
        } finally {
            setIsLoading(false);
        }
    };
    const toPermissions = () => {
        setIsLoading(true);
        qr.permissions((res) => {
            switch (res) {
                case "granted":
                    setError("");
                    qrInit();
                    break;
                case "denied":
                    showError(langPage.errors.access_denied);
                    break;
            }
            setIsLoading(false);
        });
    };
    const getResult = (text: string) => {
        if (text.length > 0) {
            onRead(text);
        }
    };
    const cameraGoToggle = () => {
        if (!!camerasToggle) {
            qr.changeCamera()
                .then((result: string) => {
                    getResult(result);
                    const lsCameraIndexValue = localStorage.getItem(LS_CAMERA_INDEX);
                    if (lsCameraIndexValue === null) {
                        localStorage.setItem(LS_CAMERA_INDEX, "0");
                    } else {
                        const newCameraIndex = parseInt(lsCameraIndexValue);
                        localStorage.setItem(LS_CAMERA_INDEX, newCameraIndex === 0 ? "1" : "0");
                    }
                })
                .catch((errText: any) => {
                    setError(errText);
                });
        }
    };
    const goBack = () => {
        onCancel();
    };
    return (
        <>
            <Box
                className={classes.qrVideo}
                sx={{
                    bgcolor: "grey.900",
                }}
            >
                <Loader
                    isLoading={isLoading}
                    text={langPage.loadingText}
                />
                <video
                    id="video"
                    width="100%"
                    style={{ display: !!error ? "none" : "block" }}
                ></video>
                {!error ? (
                    <Paper
                        className={classes.hint}
                        square
                    >
                        <Typography>{langPage.hint}</Typography>
                    </Paper>
                ) : (
                    <Box className={classes.errorHint}>
                        <Icon
                            name="no_photography"
                            style={{ fontSize: "10em" }}
                        />
                        <Button
                            onClick={toPermissions}
                            className={classes.error}
                            color="error"
                            fullWidth
                            variant="contained"
                        >
                            {error}
                        </Button>
                    </Box>
                )}
                <AppBar
                    position="fixed"
                    color="primary"
                    sx={{ top: "auto", bottom: 0, height: "3.5rem" }}
                    component="footer"
                >
                    <Toolbar
                        disableGutters
                        sx={{ boxShadow: 3 }}
                    >
                        <ButtonGroup
                            fullWidth
                            disableElevation
                            variant="contained"
                            sx={{ height: "100%" }}
                        >
                            {!!camerasToggle && (
                                <Button
                                    onClick={cameraGoToggle}
                                    fullWidth
                                    sx={{
                                        color: "primary.contrastText",
                                        textTransform: "none",
                                    }}
                                >
                                    {langPage.cameraToggle}
                                </Button>
                            )}
                            <Button
                                onClick={goBack}
                                fullWidth
                                sx={{
                                    color: "primary.contrastText",
                                    textTransform: "none",
                                }}
                            >
                                {lang.back}
                            </Button>
                        </ButtonGroup>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}

export default BrowserQRScanner;
