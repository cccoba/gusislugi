import type { LicenseTypeEnum } from "api/enums/LicenseTypeEnum";

import type { IUserShopDto } from "./IUserShopDto";

export interface ILicenseDto {
    id: number;
    uid: number;
    type: LicenseTypeEnum;
    createdAt?: Date;
    creatorId?: number;
    endDate: Date;
    addUser?: IUserShopDto;
    user?: IUserShopDto;
    creator?: IUserShopDto;
    comments: string;
}
