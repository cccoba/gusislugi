import { Checkbox, TableCell as MuiTableCell, TableRow as MuiTableRow, TableRowProps } from "@mui/material";

import GoodTableCell from "./TableCell";

import { IGoodTableField } from ".";

interface IProps<T> {
    fields: IGoodTableField[];
    row: T;
    hover?: boolean;
    rowProps?: TableRowProps;
    isMultiSelection?: boolean;
    cursor?: string;
    isSelected?: boolean;
    onClick?: (row: T) => void;
    onDoubleClick?: (row: T) => void;
}

function GoodTableRow<T>({
    fields,
    row,
    hover = true,
    rowProps,
    isMultiSelection = false,
    isSelected = false,
    cursor,
    onClick,
    onDoubleClick,
}: IProps<T>) {
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
            selected={isSelected}
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
            {fields.map((field) => {
                let value: any = "";
                if (field.name in (row as any)) {
                    value = (row as any)[field.name];
                }
                return (
                    <GoodTableCell
                        key={field.name}
                        value={value}
                        field={field}
                        cursor={cursor}
                        responsiveView={false}
                    />
                );
            })}
        </MuiTableRow>
    );
}
export default GoodTableRow;
