import { CompanyMoneyTypeEnum } from "api/enums/CompanyMoneyTypeEnum";

import { ICompanyDto } from "./ICompanyDto";
import { IUserShortDto } from "./IUserShortDto";

export interface ICompanyMoneyDto {
    id: number;
    companyId: number;
    creatorId: number;
    message: string;
    type: CompanyMoneyTypeEnum;
    value: number;
    created_at: string;
    updated_at: string;
    company: ICompanyDto;
    creator: IUserShortDto;
}
