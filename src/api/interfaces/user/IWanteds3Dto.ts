import type { IUserShortDto } from "./IUserShortDto";

export interface IWanteds3Dto {
    id: number;
    uid: number;
    status: boolean;
    description: string;
    creatorId?: number;
    created_at?: Date;
    updated_at?: Date;
    user?: IUserShortDto;
    creator?: IUserShortDto;
}
