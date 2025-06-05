import type { CompanyMoneyTypeEnum } from "api/enums/CompanyMoneyTypeEnum";

import type { ICompanyDto } from "./ICompanyDto";
import type { IUserShortDto } from "./IUserShortDto";

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
