import { IRoleDto } from "./IRoleDto";

export interface IUserDto {
    id: number;
    guid: string;
    tgId?: number;
    tgName: string;
    nickname: string;
    roleId: number;
    lastName: string;
    firstName: string;
    fullName: string;
    nationalityId?: number;
    citizenshipId?: number;
    passport: string;
    registration: string;
    image: string;
    description: string;
    money: number;
    role: IRoleDto;
}
