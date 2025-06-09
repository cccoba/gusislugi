import { ReactNode } from "react";
import { Typography } from "@mui/material";

import lang from "lang";
interface IProps {
    noRecordsText?: string | ReactNode;
}
const langPage = lang.components.goodTable;
function GoodTableMobileNoRecordsRow({ noRecordsText }: IProps) {
    if (noRecordsText === "") {
        return null;
    }
    return (
        <Typography
            textAlign="center"
            sx={{ p: 1 }}
        >
            {noRecordsText || langPage.noRecords}
        </Typography>
    );
}
export default GoodTableMobileNoRecordsRow;
