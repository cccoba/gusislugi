import { IRoleDto } from "./IRoleDto";

export interface IUserDto {
    id: number;
    guid: string;
    tgId?: number;
    tgName: string;
    nickname: string;
    roleId: number;
    firstName: string;
    realName: string;
    nationalityId?: number;
    citizenshipId?: number;
    passport: string;
    registration: string;
    image: string;
    description: string;
    money: number;
    role: IRoleDto;
}
