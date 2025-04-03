import { MedicinePatientTestEnum } from "api/enums/MedicinePatientTestEnum";

export interface IMedicinePatientHistoryDto {
    id: number;
    type: "test" | "procedure";
    updatedAt: string;
    status: MedicinePatientTestEnum;
}
