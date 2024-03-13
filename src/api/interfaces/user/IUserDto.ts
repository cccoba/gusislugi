import { ICitizenshipDto } from "./ICitizenshipDto";
import { INationalityDto } from "./INationalityDto";
import { IRoleDto } from "./IRoleDto";

export interface IUserDto {
    id: number;
    tgId?: number;
    tgName: string;
    nickname: string;
    roleId: number;
    lastName: string;
    firstName: string;
    fullName: string;
    nationality?: INationalityDto;
    citizenship?: ICitizenshipDto;
    passport: string;
    image?: string;
    description: string;
}
