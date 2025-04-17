import React, { ReactNode, useEffect, useMemo, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogProps,
    DialogContent,
    DialogContentProps,
    DialogActions,
    SxProps,
    Button,
    Box,
} from "@mui/material";

import lang from "lang";

import { useAppSelector } from "api/hooks/redux";

import IconButton from "./Icon/IconButton";
import ScrollTo from "./ScrollTo";

export interface IModalProps extends DialogProps {
    open: boolean;
    title?: string;
    children?: ReactNode;
    actions?: ReactNode[];
    responsiveWidth?: boolean;
    withCloseButton?: boolean;
    withShadow?: boolean;
    withOkButton?: boolean;
    contentSx?: DialogContentProps["sx"];
    scrollTop?: boolean;
    fabMargin?: boolean;
    onClose?: () => void;
}

interface IModalTitleProps {
    title: string;
    withShadow: boolean;
    withCloseButton: boolean;
    onClose: () => void;
}

export default function Modal({
    title = "",
    children,
    actions = [],
    responsiveWidth = false,
    maxWidth = "sm",
    fullScreen = false,
    fullWidth = false,
    withCloseButton = false,
    withShadow = true,
    withOkButton = false,
    contentSx = { mt: 1 },
    scrollTop = true,
    ...props
}: IModalProps) {
    const deviceScreenType = useAppSelector((s) => s.device.screen.type);
    const deviceScreenName = useAppSelector((s) => s.device.screen.name);

    const [fullScreenState, setFullScreenState] = useState(fullScreen);
    const [fullWidthState, setFullWidthState] = useState(fullWidth);
    const [maxWidthState, setMaxWidthState] = useState(maxWidth);
    const sx = useMemo(() => {
        const newSx: any = contentSx || {};
        return newSx;
    }, [contentSx]);
    useEffect(() => {
        if (responsiveWidth) {
            if (deviceScreenName === "mobile") {
                setFullScreenState(true);
            } else {
                setFullWidthState(true);
                setMaxWidthState(deviceScreenType);
            }
        }
    }, [responsiveWidth, deviceScreenType, deviceScreenName]);
    const toClose = () => {
        if (!!withCloseButton && !!props.onClose) {
            props.onClose();
        }
    };
    const actionsSx: SxProps = withShadow ? { boxShadow: withShadow ? 3 : 0, mt: 1 } : {};
    return (
        <Dialog
            maxWidth={maxWidthState}
            fullWidth={fullWidthState}
            fullScreen={fullScreenState}
            {...props}
        >
            {(!!title || (!!withCloseButton && !!props.onClose)) && (
                <ModalTitle
                    title={title}
                    withShadow={withShadow}
                    withCloseButton={!!withCloseButton}
                    onClose={toClose}
                />
            )}
            <DialogContent sx={sx}>
                {scrollTop && (
                    <ScrollTo
                        id={"PageScrollTop"}
                        bottom={!!actions?.length ? 56 : 4}
                    />
                )}
                {!!children ? children : null}
            </DialogContent>
            {!!actions?.length ? (
                <DialogActions sx={actionsSx}>
                    {actions.map((action, index) => (
                        <React.Fragment key={index}>{action}</React.Fragment>
                    ))}
                </DialogActions>
            ) : (
                withOkButton &&
                !!props.onClose && (
                    <DialogActions sx={actionsSx}>
                        <Button onClick={props.onClose}>{lang.ok}</Button>
                    </DialogActions>
                )
            )}
        </Dialog>
    );
}

function ModalTitle({ title = "", onClose, withShadow = false, withCloseButton = false }: IModalTitleProps) {
    const titleSx: SxProps = {
        display: "flex",
        justifyContent: "space-between",
        bgcolor: "primary.main",
        color: "primary.contrastText",
        p: 0,
    };
    if (withShadow) {
        titleSx.boxShadow = 3;
        titleSx.mb = 2;
    }
    if (!title && !onClose) {
        return null;
    }
    return (
        <DialogTitle sx={titleSx}>
            <Box sx={{ py: 1, px: 2 }}>{title}</Box>
            {!!onClose && withCloseButton && (
                <IconButton
                    color="inherit"
                    sx={{}}
                    name="close"
                    onClick={onClose}
                />
            )}
        </DialogTitle>
    );
}
