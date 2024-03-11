import { PaperProps } from "@mui/material";

import { UserRolesEnum } from "api/enums/UserRolesEnum";

import { ReactNode } from "react";

export interface IPage {
    icon?: string;
    title?: string;
    backUrl?: string | null;
    isLoading?: boolean;
    children?: ReactNode;
    parepProps?: PaperProps;
    roles?: UserRolesEnum[];
    redirectLink?: string;
    loadintText?: string;
    scrollTop?: boolean;
    fabMargin?: boolean;
}
