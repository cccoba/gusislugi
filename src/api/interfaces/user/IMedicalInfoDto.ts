import { IUserShortDto } from "./IUserShortDto";

export interface IMedicalInfoDto {
    id: number;
    uid: number;
    status: boolean;
    title: string;
    created_at?: Date;
    updated_at?: Date;
    endDate?: Date;
    user?: IUserShortDto;
}
