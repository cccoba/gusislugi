import type { MedicalInfoStatusEnum } from "api/enums/MedicalInfoStatusEnum";

import type { IMedicalSicknessDto } from "./IMedicalSicknessDto";
import type { IUserShortDto } from "./IUserShortDto";

export interface IMedicalInfoDto {
    id: number;
    uid: number;
    status: MedicalInfoStatusEnum;
    medicalSicknessesId: number;
    created_at?: Date;
    updated_at?: Date;
    endDate?: Date;
    user?: IUserShortDto;
    medicalSickness?: IMedicalSicknessDto;
}
