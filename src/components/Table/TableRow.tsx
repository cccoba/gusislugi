import { Checkbox, TableCell as MuiTableCell, TableRow as MuiTableRow, TableRowProps } from "@mui/material";

import TableCell from "./TableCell";

import { ITableField } from ".";

interface IProps {
    fields: ITableField[];
    row: any;
    hover?: boolean;
    rowProps?: TableRowProps;
    isMultiSelection?: boolean;
    cursor?: string;
    isSelected?: boolean;
    onClick?: (row: any) => void;
    onDoubleClick?: (row: any) => void;
}

function TableRow({
    fields,
    row,
    hover = true,
    rowProps,
    isMultiSelection = false,
    isSelected = false,
    cursor,
    onClick,
    onDoubleClick,
}: IProps) {
    const onRowClick = () => {
        if (!!onClick) {
            onClick(row);
        }
    };
    const toDoubleClick = (data: any) => {
        if (!!onDoubleClick) {
            onDoubleClick(row);
        }
    };

    return (
        <MuiTableRow
            hover={hover}
            onClick={onRowClick}
            onDoubleClick={toDoubleClick}
            {...rowProps}
        >
            {!!isMultiSelection && (
                <MuiTableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        checked={isSelected}
                    />
                </MuiTableCell>
            )}
            {fields.map((field) => (
                <TableCell
                    key={field.name}
                    value={row[field.name]}
                    field={field}
                    cursor={cursor}
                    responsiveView={false}
                />
            ))}
        </MuiTableRow>
    );
}
export default TableRow;
