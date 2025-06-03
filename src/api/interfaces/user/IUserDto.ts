import type { WeaponEnum } from "api/enums/WeaponEnum";

import type { IRoleDto } from "./IRoleDto";

export interface IUserDto {
    id: number;
    guid: string;
    tgId?: string;
    tgLogin?: string;
    nickname: string;
    roleId: number;
    firstName: string;
    nationalityId?: number;
    weapon: WeaponEnum;
    passport: string;
    registration: string;
    image: string;
    description: string;
    money: number;
    role: IRoleDto;
    weaponPoints: number;
    birthDate: string;
    jobPosition: string;
}
