import { IMedicinePatient } from "../Medicine/IMedicinePatient";

export interface IUserMedicineDto {
    id: number;
    tgId?: number;

    nickname: string;
    firstName: string;
    image: string;
    patientId: number;
    patient: IMedicinePatient | null;
}
