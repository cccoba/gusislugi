import { IUserMedicineDto } from "../user/IUserMedicineDto";

import { IMedicinePatient } from "./IMedicinePatient";

export interface IMedicinePatientFullData {
    user: IUserMedicineDto;
    patients: IMedicinePatient[];
}
