import { PaperProps } from "@mui/material";

import { TRoleCheckerRole } from "api/interfaces/user/IRoleDto";
import { TIconName } from "components/Icon";

import { ReactNode } from "react";

export interface IPage {
    icon?: TIconName | "";
    title?: string;
    backUrl?: string | null;
    isLoading?: boolean;
    children?: ReactNode;
    parepProps?: PaperProps;
    redirectLink?: string;
    loadintText?: string;
    scrollTop?: boolean;
    fabMargin?: boolean;
    roles?: TRoleCheckerRole[];
}
