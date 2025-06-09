import type { TRoleCheckerRole } from "api/interfaces/user/IRoleDto";

import type { IPage } from "./IPage";

export interface IPageWithRoles extends IPage {
    roles: TRoleCheckerRole[];
}
