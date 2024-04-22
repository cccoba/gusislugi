import { MedicalPoliciesTypeEnum } from "api/enums/MedicalPoliciesTypeEnum";

import { IUserShortDto } from "./IUserShortDto";

export interface IMedicalPoliciesDto {
    id: number;
    uid: number;
    type: MedicalPoliciesTypeEnum;
    status: boolean;
    trauma_rescue: boolean;
    number: string;
    created_at?: Date;
    updated_at?: Date;
    endDate?: Date;
    user?: IUserShortDto;
}
