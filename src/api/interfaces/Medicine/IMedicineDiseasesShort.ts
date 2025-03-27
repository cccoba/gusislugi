import { MedicineDiseaseTypeEnum } from "api/enums/MedicineDiseaseTypeEnum";

export interface IMedicineDiseasesShort {
    id: number;
    title: string;
    type: MedicineDiseaseTypeEnum;
}
