import { Box, TableRowProps, Paper } from "@mui/material";
import { ITableField } from "..";
import TableCell from "../TableCell";



interface IProps {
    fields: ITableField[];
    row: any;
    hover?: boolean;
    rowProps?: TableRowProps;
    onClick?: (row: any) => void
}

function MobileTableRow({
    fields,
    row,
    hover = true,
    rowProps,
    onClick
}: IProps) {
    const onRowClick = () => {
        if (!!onClick) {
            onClick(row);
        }
    }
    return (
        <Paper
            sx={{ mb: 1.5 }}
            elevation={2}
        >
            <Box
                onClick={onRowClick}
                {...rowProps}
            >
                {fields.map(field => (
                    <TableCell
                        key={field.name}
                        value={row[field.name]}
                        field={field}
                        cursor={!!onClick ? "pointer" : undefined}
                        responsiveView={true}
                    />
                ))}
            </Box>
        </Paper>
    )
}
export default MobileTableRow;