import { useEffect, useMemo, useState } from "react";
import { Box, Paper, TableContainer, Table as MuiTable, TableFooter, TableRow, TableCell } from "@mui/material";

import lang, { sortArray } from "lang";

import { IPaginationData, ISortData, SortOrderEnum, TFilterValue } from "api/interfaces/components/GoodTable";
import { objCopy } from "api/common/helper";

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
        if (paginationState && !!paginationState?.pageSize) {
            return (values?.length || 0) > paginationState.pageSize;
        }
        return false;
    }, [paginationState]);

    useEffect(() => {
        updateValues(values);
    }, [values]);

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
    const toSort = (newOrder: ISortData) => {
        setOrderState(newOrder);
        const field = fields.find((x) => x.name === newOrder.sort);
        if (!!field) {
            const res = sortValues(objCopy(values), field, newOrder.direction);
            updateValues(res);
        }
    };
    const toSelectRow = (rowData: T) => {
        let isAlreadySelected = selectedRows.some((x: any) => {
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
    const updateValues = (data: T[]) => {
        setFilteredValues(data);
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
    const toFilterChanged = (newFilter: TFilterValue | null, name: string) => {
        console.log("index", newFilter, name);
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
                    onSort={toSort}
                    order={orderState}
                    isMultiSelection={isMultiSelection}
                    selectedRows={selectedRows}
                    rowCount={filteredValues.length}
                    selectRows={onSelectAllRows}
                    filters={filters}
                    onFilterChanged={toFilterChanged}
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
