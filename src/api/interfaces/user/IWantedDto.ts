import { WantedTypeEnum } from "api/enums/WantedTypeEnum";

import { IUserShortDto } from "./IUserShortDto";

export interface IWantedDto {
    id: number;
    uid: number;
    status: boolean;
    type: WantedTypeEnum;
    description: string;
    addUserId?: number;
    created_at?: Date;
    updated_at?: Date;
    user?: IUserShortDto;
    addUser?: IUserShortDto;
}
