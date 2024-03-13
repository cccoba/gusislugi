import { IUserDto } from "../user/IUserDto";
import { ITgUserDto } from "../user/ITgUserDto";
import { INationalityDto } from "../user/INationalityDto";
import { ICitizenshipDto } from "../user/ICitizenshipDto";
import { IRoleDto } from "../user/IRoleDto";

export interface IUserData {
    user: IUserDto | null;
    tg: ITgUserDto | null;
    nationalities: INationalityDto[];
    citizenships: ICitizenshipDto[];
    roles: IRoleDto[];
    isLoading: boolean;
    isLoad: boolean;
    isAuth: boolean;
}
