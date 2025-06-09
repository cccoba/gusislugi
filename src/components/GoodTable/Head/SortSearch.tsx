import { useMemo } from "react";
import { Box, TableSortLabel } from "@mui/material";

import { ISortData, SortOrderEnum, TFilterValue } from "api/interfaces/components/GoodTable";

import { IGoodTableField } from "..";
import GoodTableSearch from "../Filters/Search";

interface IProps {
    field: IGoodTableField;
    order?: ISortData;
    title: string;
    filter?: TFilterValue;
    onSort: (data: ISortData) => void;

    onFilterChanged: (newFilter: TFilterValue | null, name: string) => void;
    onFilterClear: (name: string) => void;
}

export default function GoodTableHeadSortSearch({
    field,
    order,
    title,
    filter,
    onSort,
    onFilterChanged,
    onFilterClear,
}: IProps) {
    const orderDirection = useMemo(() => {
        return order?.direction === SortOrderEnum.Descending || order?.direction === "desc"
            ? "desc"
            : "asc";
    }, [order?.direction]);
    const toSort = (sort: string) => {
        let direction: SortOrderEnum = SortOrderEnum.Ascending;
        if (!!order?.sort && order.sort === sort) {
            direction =
                orderDirection === "asc" ? SortOrderEnum.Descending : SortOrderEnum.Ascending;
        }
        onSort({ sort, direction });
    };
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover .goodTableFilterMenu": {
                    visibility: "visible",
                },
                "& .goodTableFilterMenu": {
                    visibility: "hidden",
                },
            }}
        >
            <TableSortLabel
                active={order?.sort === field.name}
                direction={order?.sort === field.name ? orderDirection : "asc"}
                onClick={() => toSort(field.name)}
            >
                {title}
            </TableSortLabel>
            {!field?.noSearch && (
                <GoodTableSearch
                    field={field}
                    filter={filter}
                    onFilterChanged={onFilterChanged}
                    onFilterClear={onFilterClear}
                />
            )}
        </Box>
    );
}
