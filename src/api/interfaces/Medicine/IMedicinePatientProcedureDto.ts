import { MedicinePatientTestStatusEnum } from "api/enums/MedicinePatientTestStatusEnum";

import { IUserShortDto } from "../user/IUserShortDto";

import { IMedicineProcedure } from "./IMedicineProcedure";

export interface IMedicinePatientProcedureDto {
    id: number;
    patientId: number;
    procedureId: number;
    status: MedicinePatientTestStatusEnum;
    created_at: string;
    updated_at: string;
    procedure?: IMedicineProcedure;
    created_user?: IUserShortDto;
    updated_user?: IUserShortDto;
}
