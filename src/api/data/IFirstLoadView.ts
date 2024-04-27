import { ICitizenshipDto } from "api/interfaces/user/ICitizenshipDto";
import { INationalityDto } from "api/interfaces/user/INationalityDto";
import { IRoleDto } from "api/interfaces/user/IRoleDto";
import { ITgUserDto } from "api/interfaces/user/ITgUserDto";
import { IUserDto } from "api/interfaces/user/IUserDto";

export interface IFirstLoadView {
    user?: IUserDto;
    tgUser: ITgUserDto;
    token: string;
    nationalities: INationalityDto[];
    citizenships: ICitizenshipDto[];
    roles: IRoleDto[];
    appVersion: string;
}
