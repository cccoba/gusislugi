import { ComparisonOperatorEnum } from "api/enums/ComparisonOperatorEnum";

export interface IMedicineDiseaseCondition {
    paramId: number;
    value: number;
    action: ComparisonOperatorEnum;
}
