import { TRoleCheckerRole } from "api/interfaces/user/IRoleDto";

import { IPage } from "./IPage";

export interface IPageWithRoles extends IPage {
    roles: TRoleCheckerRole[];
}
