import type { IUserDto } from "../user/IUserDto";
import type { IWeaponHistoryDto } from "../user/IWeaponHistoryDto";

export interface IPassportUser {
    user: IUserDto;
    claims?: boolean;
    taxes?: boolean;
    wanteds?: boolean;
    wanteds2?: boolean;
    wanteds3?: boolean;
    companies?: boolean;
    medicalPolicies?: boolean;
    medicalInfo?: boolean;
    licenses?: boolean;
    weapons?: {
        weaponPoints: number;
        history: IWeaponHistoryDto[];
    };
}
