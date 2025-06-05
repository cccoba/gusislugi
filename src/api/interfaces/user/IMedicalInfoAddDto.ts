import type { MedicalInfoStatusEnum } from "api/enums/MedicalInfoStatusEnum";

export interface IMedicalInfoAddDto {
    medicalSicknessId: number;
    uids: number[];
    status: MedicalInfoStatusEnum;
    comments: string;
}
