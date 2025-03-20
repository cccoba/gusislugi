import { MedicineDiseaseTypeEnum } from "api/enums/MedicineDiseaseTypeEnum";
import { IMedicineDiseasesParam } from "./IMedicineDiseasesParam";

export interface IMedicineDiseases {
    id: number;
    title: string;
    type: MedicineDiseaseTypeEnum;
    description: string;
    param1: IMedicineDiseasesParam[];
    param2: IMedicineDiseasesParam[];
    param3: IMedicineDiseasesParam[];
}
