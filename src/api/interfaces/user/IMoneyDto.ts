import { IUserShortDto } from "./IUserShortDto";

export interface IMoneyDto {
    id: number;
    fromUid: number;
    toUid: number;
    hidden: boolean;
    created_at?: Date;
    value: number;
    message: string;
    from_user?: IUserShortDto;
    to_user?: IUserShortDto;
}
