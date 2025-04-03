import { Chip } from "@mui/material";
import { IMedicineParam } from "api/interfaces/Medicine/IMedicineParam";

import lang from "lang";

interface IProps {
    value: string;
    param: IMedicineParam;
}
export default function MedicineParamBooleanViewer({ value }: IProps) {
    return (
        <Chip
            label={value}
            color={value === lang.no ? "success" : "error"}
            size="small"
        />
    );
}
