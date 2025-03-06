import { IUserShortDto } from "./IUserShortDto";

export interface IShopDto {
    id: number;
    guid: string;
    user?: IUserShortDto;
    sum: number;
    details: any[];
    eventDate: Date;
}
