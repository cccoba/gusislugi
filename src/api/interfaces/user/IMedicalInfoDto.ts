import type { MedicalInfoStatusEnum } from "api/enums/MedicalInfoStatusEnum";

import type { IMedicalSicknessDto } from "./IMedicalSicknessDto";
import type { IUserShortDto } from "./IUserShortDto";

export interface IMedicalInfoDto {
    id: number;
    uid: number;
    status: MedicalInfoStatusEnum;
    medicalSicknessId: number;
    creatorId?: number;
    created_at?: Date;
    updated_at?: Date;
    user?: IUserShortDto;
    medicalSickness?: IMedicalSicknessDto;
    creator?: IUserShortDto;
    comments: string;
}
