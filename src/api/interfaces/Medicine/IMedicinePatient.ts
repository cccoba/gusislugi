import { MedicinePatientStatusEnum } from "api/enums/MedicinePatientStatusEnum";

import { IUserShortDto } from "../user/IUserShortDto";

import { IMedicineDiseasesShort } from "./IMedicineDiseasesShort";
import { IMedicinePatientParamDto } from "./IMedicinePatientParamDto";
import { IMedicinePatientTestDto } from "./IMedicinePatientTestDto";
import { IMedicinePatientProcedureDto } from "./IMedicinePatientProcedureDto";

export interface IMedicinePatient {
    id: number;
    userId: number;
    diseaseId: number;
    user?: IUserShortDto;
    disease?: IMedicineDiseasesShort;
    status: MedicinePatientStatusEnum;
    isActive?: boolean;
    created_at?: string;
    updated_at?: string;
    params?: IMedicinePatientParamDto[];
    tests?: IMedicinePatientTestDto[];
    procedures?: IMedicinePatientProcedureDto[];
}
