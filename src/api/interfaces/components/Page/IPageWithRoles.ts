import { UserRolesEnum } from "api/enums/UserRolesEnum";

import { IPage } from "./IPage";

export interface IPageWithRoles extends IPage {
    roles: UserRolesEnum[];
}
