import { MedicinePatientTestStatusEnum } from "api/enums/MedicinePatientTestStatusEnum";

export interface IMedicinePatientHistoryDto<T> {
    id: string;
    type: "test" | "procedure";
    updated_at: string;
    created_at: string;
    status: MedicinePatientTestStatusEnum;
    value: T;
}
