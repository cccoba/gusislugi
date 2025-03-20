export interface IMedicineDiseasesParam {
    actions: IMedicineDiseasesParamAction[];
    description: string;
}

export interface IMedicineDiseasesParamAction {
    paramId: number;
    value: string;
    action: string;
}
