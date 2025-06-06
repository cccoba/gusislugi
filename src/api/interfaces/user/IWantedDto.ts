import type { WantedTypeEnum } from "api/enums/WantedTypeEnum";

import type { IUserShortDto } from "./IUserShortDto";

export interface IWantedDto {
    id: number;
    uid: number;
    status: boolean;
    type: WantedTypeEnum;
    description: string;
    travelBan: boolean;
    creatorId?: number;
    created_at?: Date;
    updated_at?: Date;
    user?: IUserShortDto;
    creator?: IUserShortDto;
}
