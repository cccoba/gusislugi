import { TaxeStatusEnum } from "api/enums/TaxeStatusEnum";

import { IUserShortDto } from "./IUserShortDto";

export interface ITaxeDto {
    id: number;
    uid: number;
    title: string;
    status: TaxeStatusEnum;
    value: number;
    endDate: Date;
    created_at?: Date;
    updated_at?: Date;
    user?: IUserShortDto;
}
