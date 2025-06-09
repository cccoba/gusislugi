import type { PaperProps } from "@mui/material";

import type { TRoleCheckerRole } from "api/interfaces/user/IRoleDto";
import type { TIconName } from "components/Icon";

import type { ReactNode } from "react";

export interface IPage {
    icon?: TIconName | "";
    title?: string;
    backUrl?: string | null;
    isLoading?: boolean;
    children?: ReactNode;
    paperProps?: PaperProps;
    redirectLink?: string;
    loadingText?: string;
    scrollTop?: boolean;
    fabMargin?: boolean;
    roles?: TRoleCheckerRole[];
}
