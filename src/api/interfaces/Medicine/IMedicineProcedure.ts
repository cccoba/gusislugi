import { MedicineProcedureTypeEnum } from "api/enums/MedicineProcedureTypeEnum";

import { IMedicineDiseasesParam } from "./IMedicineDiseasesParam";

export interface IMedicineProcedure {
    id: number;
    title: string;
    type: MedicineProcedureTypeEnum;
    description: string;
    place: string;
    params: IMedicineDiseasesParam[];
}
