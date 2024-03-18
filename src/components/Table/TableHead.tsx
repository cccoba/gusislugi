import { useMemo } from "react";
import { TableHead as MuiTableHead, TableRow, TableCell, TableSortLabel, Checkbox } from "@mui/material";

import { SortOrderEnum } from "api/enums/SortOrderEnum";
import { ISortData } from "api/interfaces/data/ISortData";

import { ITableField } from ".";

interface IProps {
    fields: ITableField[];
    order: ISortData;
    isMultiSelection?: boolean;
    selectedRows: any[];
    rowCount: number;
    onSort: (data: ISortData) => void;
    selectRows: (action: "select" | "unselect") => void;
}
export const getFieldTitle = (field: ITableField) => {
    return typeof field.title !== "undefined" ? field.title : field.name;
};
export default function TableHead({
    fields = [],
    order = { sort: "id", direction: SortOrderEnum.Ascending },
    isMultiSelection = false,
    selectedRows = [],
    rowCount = 0,
    onSort,
    selectRows,
}: IProps) {
    const numSelected = useMemo(() => {
        return selectedRows.length;
    }, [selectedRows]);
    const orderDirection = useMemo(() => {
        return order.direction === SortOrderEnum.Ascending ? "asc" : "desc";
    }, [order.direction]);

    const toSort = (sort: string) => {
        const field = fields.find((x) => x.name === sort);
        if (!!field && !field?.noSort) {
            let direction: SortOrderEnum = SortOrderEnum.Ascending;
            if (!!order?.sort && order.sort === sort) {
                direction = orderDirection === "asc" ? SortOrderEnum.Descending : SortOrderEnum.Ascending;
            }
            onSort({ sort, direction });
        }
    };

    const cellSx = (field: ITableField) => {
        const newSx: any = {};
        if (!!field?.width) {
            newSx.width = field.width;
        }
        return newSx;
    };
    const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            selectRows("select");
            return;
        }
        selectRows("unselect");
    };
    return (
        <>
            <MuiTableHead>
                <TableRow>
                    {!!isMultiSelection && (
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={rowCount > 0 && numSelected === rowCount}
                                onChange={onSelectAllClick}
                                inputProps={{ "aria-label": "select all desserts" }}
                            />
                        </TableCell>
                    )}
                    {fields.map((field) => (
                        <TableCell
                            key={field.name}
                            padding={!!field?.disablePadding ? "none" : "normal"}
                            sortDirection={order.sort === field.name ? orderDirection : false}
                            sx={cellSx(field)}
                        >
                            {!!field?.noSort ? (
                                getFieldTitle(field)
                            ) : (
                                <TableSortLabel
                                    active={order.sort === field.name}
                                    direction={order.sort === field.name ? orderDirection : "asc"}
                                    onClick={() => toSort(field.name)}
                                >
                                    {getFieldTitle(field)}
                                </TableSortLabel>
                            )}
                        </TableCell>
                    ))}
                </TableRow>
            </MuiTableHead>
        </>
    );
}
