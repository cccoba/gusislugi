import { TableCell, TableRow } from "@mui/material";

interface IProps {
    noRecordsText?: string;
    fieldsLength?: number;
}

function TableNoRecordsRow({ noRecordsText = "", fieldsLength = 1 }: IProps) {
    if (!noRecordsText) {
        return null;
    }
    return (
        <TableRow>
            <TableCell
                colSpan={fieldsLength || 1}
                align="center"
            >
                {noRecordsText}
            </TableCell>
        </TableRow>
    );
}
export default TableNoRecordsRow;
