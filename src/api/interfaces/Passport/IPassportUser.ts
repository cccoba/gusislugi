import type { IUserDto } from "../user/IUserDto";
import type { IWeaponHistoryDto } from "../user/IWeaponHistoryDto";

export interface IPassportUser {
    user: IUserDto;
    claims?: boolean;
    taxes?: boolean;
    fines?: boolean;
    wanteds?: boolean;
    wanteds2?: boolean;
    companies?: boolean;
    medicalPolicies?: boolean;
    medicalInfo?: boolean;
    licenses?: boolean;
    weapons?: {
        weaponPoints: number;
        history: IWeaponHistoryDto[];
    };
}
