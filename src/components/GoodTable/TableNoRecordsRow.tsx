import { TableCell, TableRow } from "@mui/material";
import type { ReactNode } from "react";

import lang from "lang";
interface IProps {
    noRecordsText?: string | ReactNode;
    fieldsLength?: number;
}

export default function GoodTableNoRecordsRow({ noRecordsText, fieldsLength = 1 }: IProps) {
    const langPage = lang.components.goodTable;
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
