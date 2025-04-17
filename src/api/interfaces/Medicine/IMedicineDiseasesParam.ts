export interface IMedicineDiseasesParam {
    actions: IMedicineDiseasesParamAction[];
    description: string;
    paramTimer: number;
    maxParamTimer: number;
}

export interface IMedicineDiseasesParamAction {
    paramId: number;
    value: string;
    action: string;
}
