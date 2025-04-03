import { IMedicineParam } from "./IMedicineParam";

export interface IMedicinePatientParamDto {
    id: number;
    patientId: number;
    paramId: number;
    value: string;
    param: IMedicineParam;
    lastSeen?: {
        date: Date;
        value: string;
    };
}
