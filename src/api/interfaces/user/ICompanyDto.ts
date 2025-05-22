import { ICompanyMoneyDto } from "./ICompanyMoneyDto";
import { IUserShortDto } from "./IUserShortDto";

export interface ICompanyDto {
    id: number;
    title: string;
    description: string;
    money: number;
    address: string;
    addUserId: number;
    created_at?: Date;
    updated_at?: Date;
    addUser?: IUserShortDto;
    deputyUserId: IUserShortDto | null;
    deputyUser?: IUserShortDto | null;
    companyMoneys?: ICompanyMoneyDto[];
}
