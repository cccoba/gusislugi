import type { TaxeStatusEnum } from "api/enums/TaxeStatusEnum";

import type { IUserShortDto } from "./IUserShortDto";
import type { ITaxesTypesDto } from "./ITaxesTypesDto";

export interface ITaxeDto {
    id: number;
    uid: number;
    title: string;
    taxesTypeId: number;
    creatorId: number;
    status: TaxeStatusEnum;
    value: number;
    endDate: Date;
    created_at?: Date;
    updated_at?: Date;
    user?: IUserShortDto;
    taxesType?: ITaxesTypesDto;
    creator?: IUserShortDto;
}
