import { Button } from "@mui/material";

import { IMedicinePatientParamDto } from "api/interfaces/Medicine/IMedicinePatientParamDto";
import { MedicineParamsTypeEnum } from "api/enums/MedicineParamsTypeEnum";

import Icon from "components/Icon";
import lang from "lang";

import MedicineParamBallViewer from "./Ball";
import MedicineParamDigitalViewer from "./Digital";
import MedicineParamBooleanViewer from "./Boolean";

interface IProps extends IMedicinePatientParamDto {
    isAdmin: boolean;
    onAdd: () => void;
}

export default function MedicineParamValue({ param, value, isAdmin, lastSeen, onAdd }: IProps) {
    if (!isAdmin && !lastSeen?.date)
        return (
            <Button
                variant="outlined"
                color="primary"
                startIcon={<Icon name="add" />}
                fullWidth
                onClick={onAdd}
            >
                {lang.unknown}
            </Button>
        );
    switch (param?.type) {
        case MedicineParamsTypeEnum.Digital:
            return (
                <MedicineParamDigitalViewer
                    param={param}
                    value={value}
                />
            );
        case MedicineParamsTypeEnum.Boolean:
            return (
                <MedicineParamBooleanViewer
                    param={param}
                    value={value}
                />
            );
        case MedicineParamsTypeEnum.Ball:
            return (
                <MedicineParamBallViewer
                    param={param}
                    value={value}
                />
            );
        default:
            return null;
    }
}
