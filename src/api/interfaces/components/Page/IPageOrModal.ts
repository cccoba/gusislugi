import { ReactNode } from "react";
import { DialogContentProps } from "@mui/material";

import { IPage } from "./IPage";

export interface IPageOrModal extends IPage {
    modalProps?: {
        onClose?: () => void;
        actions?: ReactNode[];
        responsiveWidth?: boolean;
        withCloseButton?: boolean;
        withShadow?: boolean;
        withOkButton?: boolean;
        contentSx?: DialogContentProps["sx"];
        fullScreen?: boolean;
    };
    extraProps?: any;
}
