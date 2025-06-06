import type { INationalityDto } from "api/interfaces/user/INationalityDto";
import type { IRoleDto } from "api/interfaces/user/IRoleDto";
import type { ITgUserDto } from "api/interfaces/user/ITgUserDto";
import type { IUserDto } from "api/interfaces/user/IUserDto";

export interface IFirstLoadView {
    user?: IUserDto;
    tgUser: ITgUserDto;
    token: string;
    nationalities: INationalityDto[];
    roles: IRoleDto[];
    appVersion: string;
}
