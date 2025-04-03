import lang from "lang";

import { IMedicinePatientHistoryDto } from "api/interfaces/Medicine/IMedicinePatientHistoryDto";
import { Typography } from "@mui/material";

interface IProps {
    histories: IMedicinePatientHistoryDto[];
}

export default function MedicinePatientHistory({ histories }: IProps) {
    const langPage = lang.pages.medicine.history;
    if (histories.length === 0) {
        return <Typography>{langPage.noHistory}</Typography>;
    }
    return <></>;
}
