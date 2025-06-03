import type { WeaponEnum } from "api/enums/WeaponEnum";

export interface IWeaponUpdaterDto {
    userId: number;
    weapon: WeaponEnum;
}
