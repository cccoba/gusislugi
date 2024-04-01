import { useMemo } from "react";
import { TableHead as MuiTableHead, TableRow, TableCell, TableSortLabel, Checkbox, Box } from "@mui/material";

import { ISortData, SortOrderEnum, TFilterValue } from "api/interfaces/components/GoodTable";

import GoodTableSearch from "./Filters/Search";

import { IGoodTableField } from ".";

interface IProps {
    fields: IGoodTableField[];
    order?: ISortData;
    isMultiSelection?: boolean;
    selectedRows: any[];
    rowCount: number;
    filters: TFilterValue[];
    onFilterChanged: (newFilter: TFilterValue | null, name: string) => void;
    onSort: (data: ISortData) => void;
    selectRows: (action: "select" | "unselect") => void;
}
export const getFieldTitle = (field: IGoodTableField) => {
    return typeof field.title !== "undefined" ? field.title : field.name;
};
export default function GoodTableHead({
    fields = [],
    order = { sort: "id", direction: SortOrderEnum.Ascending },
    isMultiSelection = false,
    selectedRows = [],
    rowCount = 0,
    filters,
    onFilterChanged,
    onSort,
    selectRows,
}: IProps) {
    const numSelected = useMemo(() => {
        return selectedRows.length;
    }, [selectedRows]);
    const orderDirection = useMemo(() => {
        return order.direction === SortOrderEnum.Descending ? "desc" : "asc";
    }, [order?.direction]);

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

    const cellSx = (field: IGoodTableField) => {
        const newSx: any = {};
        if (!!field?.maxWidth) {
            newSx.maxWidth = field.maxWidth;
        }
        if (!!field?.minWidth) {
            newSx.minWidth = field.minWidth;
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
                            padding={"none"}
                            sortDirection={order.sort === field.name ? orderDirection : false}
                            sx={cellSx(field)}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                    alignContent: "stretch",
                                }}
                            >
                                {!!field?.noSort || field.format === "component" ? (
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
                                {!field?.noSearch && (
                                    <GoodTableSearch
                                        field={field}
                                        filter={filters.find((x) => x.name === field.name)}
                                        onFilterChanged={onFilterChanged}
                                    />
                                )}
                            </Box>
                        </TableCell>
                    ))}
                </TableRow>
            </MuiTableHead>
        </>
    );
}
