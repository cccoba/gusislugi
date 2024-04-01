import { Box, TableRow as MuiTableRow, Paper, Button, ButtonBase } from "@mui/material";

import TableCell from "../TableCell";
import { IGoodTableField, IGoodTableProps } from "..";

interface IProps<T> {
    fields: IGoodTableField[];
    row: T;
    hover?: boolean;
    isSelected?: boolean;
    onClick?: (row: T) => void;
}

function GoodTableMobileRow<T>({ fields, row, hover = true, isSelected = false, onClick }: IProps<T>) {
    const onRowClick = () => {
        if (!!onClick) {
            onClick(row);
        }
    };
    return (
        <Paper
            sx={{ mb: 1.5 }}
            elevation={2}
        >
            <MuiTableRow
                hover={hover}
                onClick={onRowClick}
                selected={isSelected}
                component={Box}
                sx={{ display: "block", width: "100%" }}
            >
                {fields.map((field) => {
                    let value: any = "";
                    if (field.name in (row as any)) {
                        value = (row as any)[field.name];
                    }
                    return (
                        <TableCell
                            key={field.name}
                            value={value}
                            field={field}
                            cursor={!!onClick ? "pointer" : undefined}
                            responsiveView={true}
                        />
                    );
                })}
            </MuiTableRow>
        </Paper>
    );
}
export default GoodTableMobileRow;
