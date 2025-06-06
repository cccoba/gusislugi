import { MedicinePatientTestStatusEnum } from "api/enums/MedicinePatientTestStatusEnum";

import { IUserShortDto } from "../user/IUserShortDto";

import { IMedicineTest } from "./IMedicineTest";

export interface IMedicinePatientTestDto {
    id: number;
    patientId: number;
    testId: number;
    status: MedicinePatientTestStatusEnum;
    created_at: string;
    updated_at: string;
    test?: IMedicineTest;
    params: any;
    created_user?: IUserShortDto;
    updated_user?: IUserShortDto;
}
