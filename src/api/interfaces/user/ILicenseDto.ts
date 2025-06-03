import type { LicenseTypeEnum } from "api/enums/LicenseTypeEnum";

import type { IUserShopDto } from "./IUserShopDto";

export interface ILicenseDto {
    id: number;
    uid: number;
    type: LicenseTypeEnum;
    createdAt?: Date;
    addUserId?: number;
    endDate: Date;
    addUser?: IUserShopDto;
}
