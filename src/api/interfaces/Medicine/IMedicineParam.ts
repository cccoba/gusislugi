import { MedicineParamsTypeEnum } from "api/enums/MedicineParamsTypeEnum";
import { TIconName } from "components/Icon";

export interface IMedicineParam {
    id: number;
    title: string;
    type: MedicineParamsTypeEnum;
    unit: string;
    minValue: string;
    maxValue: string;
    baseValue: string;
    icon: TIconName | "";
}
