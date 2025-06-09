import { useMemo } from "react";
import { TableHead as MuiTableHead, TableRow, TableCell, Checkbox, Box } from "@mui/material";

import { ISortData, SortOrderEnum, TFilterValue } from "api/interfaces/components/GoodTable";

import { IGoodTableField } from "..";

import GoodTableHeadSortSearch from "./SortSearch";

interface IProps {
    fields: IGoodTableField[];
    order?: ISortData;
    isMultiSelection?: boolean;
    selectedRows: any[];
    rowCount: number;
    filters: TFilterValue[];
    onFilterChanged: (newFilter: TFilterValue | null, name: string) => void;
    onFilterClear: (name: string) => void;
    onSort: (data: ISortData) => void;
    selectRows: (action: "select" | "unselect") => void;
}
export const getFieldTitle = (field: IGoodTableField) => {
    return typeof field.title !== "undefined" ? field.title : field.name;
};
export default function GoodTableHead({
    fields = [],
    order,
    isMultiSelection = false,
    selectedRows = [],
    rowCount = 0,
    filters,
    onFilterChanged,
    onFilterClear,
    onSort,
    selectRows,
}: IProps) {
    const orderDirection = useMemo(() => {
        if (typeof order === "undefined") {
            return undefined;
        }
        return order.direction === SortOrderEnum.Descending ? "desc" : "asc";
    }, [order]);

    const cellSx = (field: IGoodTableField) => {
        const newSx: any = {
            /*pl: 1.5, pr: 0, py: 0 */
        };
        if (field?.maxWidth) {
            newSx.maxWidth = field.maxWidth;
        }
        if (field?.minWidth) {
            newSx.minWidth = field.minWidth;
        }

        newSx.width = field?.width || "auto";

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
                <TableRow
                    sx={{
                        "&  th": {
                            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                        },
                        "&  th:not(:last-child)": {
                            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
                        },
                    }}
                >
                    {!!isMultiSelection && (
                        <TableCell
                            padding="checkbox"
                            sx={{ textAlign: "center" }}
                        >
                            <Checkbox
                                color="primary"
                                indeterminate={
                                    selectedRows.length > 0 && selectedRows.length < rowCount
                                }
                                checked={rowCount > 0 && selectedRows.length === rowCount}
                                onChange={onSelectAllClick}
                                sx={{
                                    "& .MuiSvgIcon-root": {
                                        color: "text.primary",
                                    },
                                }}
                            />
                        </TableCell>
                    )}
                    {fields.map((field) => {
                        if (field?.hidden) {
                            return null;
                        }
                        return (
                            <TableCell
                                key={field.name}
                                sortDirection={order?.sort === field.name ? orderDirection : false}
                                sx={cellSx(field)}
                            >
                                {!!field?.noSort ||
                                field.format === "component" ||
                                field.format === "image" ? (
                                    <Box sx={{ mr: 1 }}>{getFieldTitle(field)}</Box>
                                ) : (
                                    <GoodTableHeadSortSearch
                                        field={field}
                                        order={order}
                                        title={getFieldTitle(field)}
                                        filter={filters.find((x) => x.name === field.name)}
                                        onSort={onSort}
                                        onFilterChanged={onFilterChanged}
                                        onFilterClear={onFilterClear}
                                    />
                                )}
                            </TableCell>
                        );
                    })}
                </TableRow>
            </MuiTableHead>
        </>
    );
}
