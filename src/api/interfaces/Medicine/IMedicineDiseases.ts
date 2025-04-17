import { MedicineDiseaseTypeEnum } from "api/enums/MedicineDiseaseTypeEnum";

import { IMedicineDiseasesParam } from "./IMedicineDiseasesParam";
import { IMedicineDiseaseCondition } from "./IMedicineDiseaseCondition";

export interface IMedicineDiseases {
    id: number;
    title: string;
    type: MedicineDiseaseTypeEnum;
    description: string;
    param1: IMedicineDiseasesParam[];
    param2: IMedicineDiseasesParam[];
    param3: IMedicineDiseasesParam[];
    cureConditions: IMedicineDiseaseCondition[];
    deathConditions: IMedicineDiseaseCondition[];
}
