import { UserRolesEnum } from "api/enums/UserRolesEnum";

export interface IUserDto {
    id: number;
    hash: string;
    roleId: UserRolesEnum;
}
