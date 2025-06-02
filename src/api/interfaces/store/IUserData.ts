import type { IUserDto } from "../user/IUserDto";
import type { ITgUserDto } from "../user/ITgUserDto";
import type { INationalityDto } from "../user/INationalityDto";
import type { IRoleDto } from "../user/IRoleDto";

export interface IUserData {
    user: IUserDto | null;
    tg: ITgUserDto | null;
    nationalities: INationalityDto[];
    roles: IRoleDto[];
    isLoading: boolean;
    isLoad: boolean;
    isAuth: boolean;
}
