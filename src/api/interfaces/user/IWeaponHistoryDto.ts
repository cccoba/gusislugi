import type { WeaponEnum } from "api/enums/WeaponEnum";

import type { IUserShopDto } from "./IUserShopDto";

export interface IWeaponHistoryDto {
    id: number;
    userId: number;
    creatorId: number;
    previousWeaponValue: WeaponEnum;
    newWeaponValue: WeaponEnum;
    reason: "add" | "edit";
    created_at: string;
    user?: IUserShopDto;
    creator?: IUserShopDto;
}
