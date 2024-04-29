import { IRoleDto } from "./IRoleDto";

export interface IUserDto {
    id: number;
    guid: string;
    tgId?: string;
    tgLogin?: string;
    nickname: string;
    roleId: number;
    firstName: string;
    nationalityId?: number;
    citizenshipId?: number;
    passport: string;
    registration: string;
    image: string;
    description: string;
    money: number;
    role: IRoleDto;
}
