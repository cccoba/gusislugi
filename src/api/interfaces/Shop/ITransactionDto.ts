import { IUserShopDto } from "../user/IUserShopDto";

import { ITransactionDetailDto } from "./ITransactionDetailDto";

export interface ITransactionDto {
    id: number;
    guid: string;
    user: IUserShopDto;
    sum: number;
    eventDate: Date;
    details: ITransactionDetailDto[];
}
