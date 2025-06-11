import type { IUserShortDto } from "./IUserShortDto";

export interface IPersonalityDto {
    id: number;
    title: string;
    description: string;
    userDescription: string;
    isCompleted: boolean;
    uid: number;
    user?: IUserShortDto;
    creatorId?: number;
    creator?: IUserShortDto;
    created_at?: string;
    updated_at?: string;
}
