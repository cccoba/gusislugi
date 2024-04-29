import { IUserShortDto } from "./IUserShortDto";

export interface IMoneyAddDto {
    id: number;
    fromUid: number;
    toUid: number[];
    hidden: boolean;
    created_at?: Date;
    value: number;
    from_user?: IUserShortDto;
    to_user?: IUserShortDto;
}
