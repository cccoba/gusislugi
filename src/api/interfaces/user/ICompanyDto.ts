import type { ICompanyMoneyDto } from "./ICompanyMoneyDto";
import type { IUserShortDto } from "./IUserShortDto";

export interface ICompanyDto {
    id: number;
    title: string;
    description: string;
    money: number;
    address: string;
    uid: number;
    creatorId?: number;
    deputyUserId: IUserShortDto | null;
    created_at?: Date;
    updated_at?: Date;
    user?: IUserShortDto;
    deputyUser?: IUserShortDto | null;
    companyMoneys?: ICompanyMoneyDto[];
    creator?: IUserShortDto;
}
