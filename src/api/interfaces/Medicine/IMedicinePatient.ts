import { MedicinePatientStatusEnum } from "api/enums/MedicinePatientStatusEnum";

import { IUserShortDto } from "../user/IUserShortDto";

import { IMedicineDiseasesShort } from "./IMedicineDiseasesShort";

export interface IMedicinePatient {
    id: number;
    userId: number;
    diseaseId: number;
    user?: IUserShortDto;
    disease?: IMedicineDiseasesShort;
    status: MedicinePatientStatusEnum;
    created_at?: string;
    updated_at?: string;
}
