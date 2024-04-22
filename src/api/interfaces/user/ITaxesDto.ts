import { TaxeStatusEnum } from "api/enums/TaxeStatusEnum";

import { IUserShortDto } from "./IUserShortDto";

export interface ITaxesDto {
    id: number;
    uid: number;
    status: TaxeStatusEnum;
    value: number;
    endDate: Date;
    created_at?: Date;
    updated_at?: Date;
    user?: IUserShortDto;
}
