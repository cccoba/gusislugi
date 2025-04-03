import { MedicinePatientTestEnum } from "api/enums/MedicinePatientTestEnum";
import { IMedicineTest } from "./IMedicineTest";

export interface IMedicinePatientTestDto {
    id: number;
    patientId: number;
    testId: number;
    status: MedicinePatientTestEnum;
    createdAt: string;
    updatedAt: string;
    test?: IMedicineTest;
}
