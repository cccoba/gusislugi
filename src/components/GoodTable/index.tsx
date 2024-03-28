import { useEffect, useMemo, useState } from "react";
import { Box, Paper, TableContainer, Table as MuiTable, TableFooter, TableRow, TableCell } from "@mui/material";

import { sortArray } from "lang";

import {
    IFilterTextValue,
    IPaginationData,
    ISortData,
    SortOrderEnum,
    TFilterValue,
} from "api/interfaces/components/GoodTable";
import { objCopy, objCopyWithType } from "api/common/helper";
import { FilterTextEqualsEnum, textFilter } from "api/common/filters";

import GoodTablePagination from "./TablePagination";
import GoodTableHead from "./TableHead";
import GoodTableBody from "./TableBody";

export interface IGoodTableProps<T> {
    fields: IGoodTableField[];
    values: T[];
    order?: ISortData;
    loading?: boolean;
    stickyHeader?: boolean;
    height?: number;
    pagination?: ITablePagination;
    responsive?: boolean;
    noRecordsText?: string;
    isMultiSelection?: boolean;
    idName?: string;
    size?: "medium" | "small";
    variant?: "box" | "paper";

    onRowClick?: (data: T) => void;
    onSelectedRows?: (data: T[]) => void;
    onRowDoubleClick?: (data: T) => void;
}

export interface IGoodTableField {
    name: string;
    title?: string;
    noSort?: boolean;
    noSearch?: boolean;
    format?: "text" | "date" | "number" | "image" | "list" | "component";
    formatProps?: any;
    disablePadding?: boolean;
    width?: string;
    wrap?: boolean;
}

export interface ITablePagination extends IPaginationData {
    rowsPerPage?: number[];
}

const sortValues = (values: any[], field: IGoodTableField, direction: SortOrderEnum) => {
    const result = sortArray(values, field.name);
    return direction === SortOrderEnum.Ascending ? result : result.reverse();
};

const filterValue = (values: any, filter: TFilterValue, field: IGoodTableField) => {
    const value = values[field.name];
    const fieldFormat = field?.format || "text";
    switch (fieldFormat) {
        case "list":
            return value === filter.value;
        case "text":
            const a = textFilter((filter?.value as string) || "", value, filter.searchType as FilterTextEqualsEnum);
            console.log("value", value === "", typeof value, a, value.length);

            return a;
    }
    return true;
};
const filterValues = (values: any[], filters: TFilterValue[], fields: IGoodTableField[]) => {
    if (values.length && filters.length) {
        let newValues = objCopy(values);
        for (const filter of filters) {
            const field = fields.find((x) => x.name === filter.name);
            if (field) {
                newValues = newValues.filter((x: any) => filterValue(x, filter, field));
                if (!newValues?.length) {
                    return [];
                }
            }
        }
        return newValues;
    }
    return values;
};
function sortAndOrder(values: any[], fields: IGoodTableField[], filters: TFilterValue[], order?: ISortData) {
    const res = filterValues(values, filters, fields);
    if (res.length) {
        if (!!order) {
            const field = fields.find((x) => x.name === order.sort);
            if (!!field) {
                return sortValues(objCopy(values), field, order.direction);
            }
        }
        return res;
    }
    return [];
}

const defTableMaxHeight = 650;

function GoodTable<T>({
    values = [],
    fields = [],
    variant = "box",
    height,
    stickyHeader = false,
    size = "medium",
    pagination,
    order,
    isMultiSelection = false,
    idName = "id",
    loading = false,
    noRecordsText,
    onRowDoubleClick,
}: IGoodTableProps<T>) {
    const [selectedRows, setSelectedRows] = useState<T[]>([]);
    const [filteredValues, setFilteredValues] = useState<T[]>([]);
    const [orderState, setOrderState] = useState<ISortData | undefined>(order);
    const [paginationState, setPaginationState] = useState(pagination);
    const [filters, setFilters] = useState<TFilterValue[]>([]);
    useEffect(() => {
        setFilteredValues(sortAndOrder(values, fields, filters, orderState));
    }, [values, fields, filters, orderState]);
    const containerSx = useMemo(() => {
        const newContainerSx: any = {};
        if (!!height) {
            newContainerSx.maxHeight = height;
        } else if (stickyHeader) {
            newContainerSx.maxHeight = defTableMaxHeight;
        }
        return newContainerSx;
    }, [height, stickyHeader]);

    const isShowedPagination = useMemo(() => {
        if (paginationState && !!paginationState?.pageSize && values?.length) {
            return values.length > paginationState.pageSize;
        }
        return false;
    }, [paginationState, values?.length]);

    useEffect(() => {
        setPaginationState(pagination);
    }, [pagination]);

    useEffect(() => {
        setOrderState(order);
    }, [order]);

    const toPaginationChange = (pageNumber: number, pageSize: number) => {
        setPaginationState((prev) => ({
            ...prev,
            pageSize,
            pageNumber: pageSize !== prev?.pageSize ? 1 : pageNumber,
        }));
    };
    const toSelectRow = (rowData: T) => {
        const isAlreadySelected = selectedRows.some((x: any) => {
            if (idName in x && idName in (rowData as any)) {
                return x[idName] === (rowData as any)[idName];
            }
            return false;
        });
        if (isMultiSelection) {
            if (isAlreadySelected) {
                setSelectedRows((prev) => prev.filter((x: any) => x[idName] !== (rowData as any)[idName]));
            } else {
                setSelectedRows((prev) => [...prev, rowData]);
            }
        } else {
            setSelectedRows(isAlreadySelected ? [] : [rowData]);
        }
    };

    const onSelectAllRows = (action: "select" | "unselect") => {
        switch (action) {
            case "unselect":
                setSelectedRows([]);
                break;
            case "select":
                setSelectedRows(values);
                break;
        }
    };
    const toFilterChange = (newFilter: TFilterValue | null, fieldName: string) => {
        setFilters((prev) => {
            const newResult = objCopyWithType<TFilterValue[]>(prev);
            if (!!newFilter) {
                const filterValue = newResult.find((x) => x.name === fieldName);
                if (filterValue) {
                    filterValue.searchType = newFilter.searchType;
                    filterValue.value = newFilter.value;
                    return newResult;
                } else {
                    return [...newResult, newFilter];
                }
            }
            return newResult.filter((x) => x.name !== fieldName);
        });
    };
    return (
        <TableContainer
            component={variant === "paper" ? Paper : Box}
            sx={containerSx}
        >
            <MuiTable
                stickyHeader={stickyHeader}
                size={size}
            >
                <GoodTableHead
                    fields={fields}
                    onSort={setOrderState}
                    order={orderState}
                    isMultiSelection={isMultiSelection}
                    selectedRows={selectedRows}
                    rowCount={filteredValues.length}
                    selectRows={onSelectAllRows}
                    filters={filters}
                    onFilterChanged={toFilterChange}
                />
                <GoodTableBody
                    fields={fields}
                    values={filteredValues}
                    idName={idName}
                    loading={loading}
                    onRowDoubleClick={onRowDoubleClick}
                    noRecordsText={noRecordsText}
                    isMultiSelection={isMultiSelection}
                    selectedRows={selectedRows}
                    onSelectRow={toSelectRow}
                />
                {!!isShowedPagination && !!paginationState && (
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={fields?.length || 100}>
                                <GoodTablePagination
                                    {...paginationState}
                                    totalItemCount={filteredValues.length}
                                    onPaginationChange={toPaginationChange}
                                    responsiveView={false}
                                />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                )}
            </MuiTable>
        </TableContainer>
    );
}
export default GoodTable;
