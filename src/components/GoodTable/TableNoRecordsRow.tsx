import { TableCell, TableRow } from "@mui/material";

import lang from "lang";

interface IProps {
    noRecordsText?: string;
    fieldsLength?: number;
}
const langPage = lang.components.goodTable;
function GoodTableNoRecordsRow({ noRecordsText, fieldsLength = 1 }: IProps) {
    if (noRecordsText === "") {
        return null;
    }
    return (
        <TableRow>
            <TableCell
                colSpan={fieldsLength || 1}
                align="center"
            >
                {noRecordsText || langPage.noRecords}
            </TableCell>
        </TableRow>
    );
}
export default GoodTableNoRecordsRow;
