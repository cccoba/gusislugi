import { useEffect, useMemo, useState } from "react";
import { Table as MuiTable, TableContainer, Paper, TableFooter, TableRow, TableCell, Box } from "@mui/material";

import lang, { sortArray } from "lang";
import InputSearch from "components/Inputs/InputSearch";

import { keyboardFilterSearch } from "api/common/keyboardFilterSearch";
import { ISortData } from "api/interfaces/data/ISortData";
import { IPaginationData } from "api/interfaces/data/IPaginationData";
import { SortOrderEnum } from "api/enums/SortOrderEnum";
import { useAppSelector } from "api/hooks/redux";

import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";
import MobileTable from "./MobileTable";
import TableToolbar, { ITableToolbarAction } from "./TableToolbar";
import dateTime from "api/common/dateTime";

export interface ITableProps {
    fields: ITableField[];
    values: any[];
    order: ISortData;
    loading?: boolean;
    stickyHeader?: boolean;
    height?: number;
    pagination?: ITablePagination;
    responsive?: boolean;
    size?: "medium" | "small";
    variant?: "box" | "paper";
    noFilter?: boolean;
    noRecordsText?: string;
    isMultiSelection?: boolean;
    actions?: ITableToolbarAction[];
    onSort?: (newOrder: ISortData) => void;
    getId?: () => string;
    onPagination?: (page: number, limit: number) => void;
    onSelect?: (data: any) => void;
    onSelectedRows?: (data: any[]) => void;
    onDoubleClick?: (data: any[]) => void;
}

export interface ITableField {
    name: string;
    title?: string;
    noSort?: boolean;
    format?: "text" | "date" | "number" | "image" | "component";
    formatProps?: any;
    disablePadding?: boolean;
    width?: string;
    wrap?: boolean;
}

export interface ITablePagination extends IPaginationData {
    rowsPerPage?: number[];
}

const sortValues = (values: any[], field: ITableField, direction: SortOrderEnum) => {
    const result = sortArray(values, field.name);
    return direction === SortOrderEnum.Ascending ? result : result.reverse();
};

const tableMaxHeight = 650;

export default function Table({
    noFilter = false,
    fields = [],
    values = [],
    order,
    loading = false,
    stickyHeader = false,
    height = 0,
    pagination,
    responsive = true,
    size = "medium",
    variant = "box",
    noRecordsText = "",
    isMultiSelection = false,
    actions = [],
    getId = () => "id",
    onSort,
    onPagination,
    onSelect,
    onSelectedRows,
    onDoubleClick,
}: ITableProps) {
    const [orderState, setOrderState] = useState<ISortData>(order);
    const [sortedValues, setSortedValues] = useState<any[]>(values);
    const [paginationState, setPaginationState] = useState(pagination);
    const isMobile = useAppSelector((s) => s.device.isMobile);
    const [searchText, setSearchText] = useState<string>("");
    const [filteredValuesCount, setFilteredValuesCount] = useState(0);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const responsiveView = useMemo(() => {
        return !!responsive && !!isMobile;
    }, [responsive, isMobile]);
    useEffect(() => {
        updateValues(values);
    }, [values, paginationState, searchText]);
    const isShowedPagination = useMemo(() => {
        if (paginationState && !!paginationState?.pageSize) {
            if (!!onPagination) {
                return !!paginationState?.totalItemCount && paginationState.totalItemCount > paginationState.pageSize;
            } else {
                return filteredValuesCount && filteredValuesCount > paginationState.pageSize;
            }
        }
        return false;
    }, [paginationState, onPagination]);
    useEffect(() => {
        setPaginationState(pagination);
    }, [pagination]);
    const idName = useMemo(() => getId(), [getId]);
    const containerSx = useMemo(() => {
        const newContainerSx: any = {};
        if (!!height) {
            newContainerSx.maxHeight = height;
        } else if (stickyHeader) {
            newContainerSx.maxHeight = tableMaxHeight;
        }
        return newContainerSx;
    }, [height, stickyHeader]);
    useEffect(() => {
        if (!!onSelectedRows) {
            onSelectedRows(selectedRows);
        }
    }, [selectedRows]);
    useEffect(() => {
        setOrderState(order);
    }, [order]);
    const toSort = (newOrder: ISortData) => {
        if (!!onSort) {
            onSort(newOrder);
        } else {
            setOrderState(newOrder);
            const field = fields.find((x) => x.name === newOrder.sort);
            if (!!field) {
                const res = sortValues(values, field, newOrder.direction);
                updateValues(res);
            }
        }
    };
    const filterData = (data: any) => {
        if (!searchText?.length) {
            return data;
        }

        const filteredRows = data.filter((row: any) => {
            return fields.some((field: any) => {
                if (field.name in row) {
                    const value = row[field.name];
                    if (value === null) {
                        return false;
                    }
                    if (!!field?.format) {
                        switch (field?.format) {
                            case "date":
                                return keyboardFilterSearch(searchText.toString(), dateTime(value, field?.formatProps));
                        }
                    }
                    return keyboardFilterSearch(searchText.toString(), value.toString());
                }
                return false;
            });
        });
        return filteredRows;
    };
    const toDoubleClick = (row: any) => {
        if (!!onDoubleClick) {
            onDoubleClick(row);
        }
    };
    const updateValues = (data: any) => {
        if (!noFilter) {
            data = filterData(data);
        }
        setFilteredValuesCount(data.length);
        if (!onPagination && paginationState) {
            //client pagination
            const limit = paginationState?.pageSize || 10;
            const page = paginationState?.pageNumber || 1;
            setSortedValues(data.slice((page - 1) * limit, page * limit));
        } else {
            setSortedValues(data);
        }
    };
    const onPaginationChange = (pageNumber: number, pageSize: number) => {
        if (!!onPagination) {
            onPagination(pageNumber, pageSize);
        } else {
            setPaginationState((prev) => ({
                ...prev,
                pageSize,
                pageNumber: pageSize !== prev?.pageSize ? 1 : pageNumber,
            }));
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
    const toggleSelectRow = (data: any) => {
        if (isMultiSelection) {
            if (selectedRows.find((x) => x[idName] === data[idName])) {
                setSelectedRows((prev) => prev.filter((x) => x[idName] !== data[idName]));
            } else {
                setSelectedRows((prev) => [...prev, data]);
            }
        }
    };

    if (responsiveView) {
        return (
            <>
                {!noFilter && (
                    <InputSearch
                        showSearchIcon
                        fullWidth
                        label={lang.search}
                        value={searchText}
                        onChangeValue={setSearchText}
                        autoComplete="off"
                    />
                )}
                <MobileTable
                    fields={fields}
                    values={sortedValues}
                    idName={idName}
                    loading={loading}
                    onSelect={onSelect}
                    variant={variant}
                />
                {!!isShowedPagination && !!paginationState && (
                    <TablePagination
                        {...paginationState}
                        totalItemCount={!!onPagination ? paginationState?.totalItemCount || 0 : filteredValuesCount}
                        onPaginationChange={onPaginationChange}
                        responsiveView={true}
                    />
                )}
            </>
        );
    }
    return (
        <>
            <TableContainer
                component={variant === "paper" ? Paper : Box}
                sx={containerSx}
            >
                <TableToolbar
                    selectedRows={selectedRows}
                    actions={actions}
                    idName={idName}
                    noFilter={noFilter}
                    searchText={searchText}
                    onSearchText={setSearchText}
                />
                <MuiTable
                    stickyHeader={stickyHeader}
                    size={size}
                >
                    <TableHead
                        fields={fields}
                        onSort={toSort}
                        order={orderState}
                        isMultiSelection={isMultiSelection}
                        selectedRows={selectedRows}
                        rowCount={filteredValuesCount}
                        selectRows={onSelectAllRows}
                    />
                    <TableBody
                        fields={fields}
                        values={sortedValues}
                        idName={idName}
                        loading={loading}
                        onSelect={onSelect}
                        onDoubleClick={toDoubleClick}
                        noRecordsText={noRecordsText}
                        isMultiSelection={isMultiSelection}
                        selectedRows={selectedRows}
                        onSelectRow={toggleSelectRow}
                    />
                    {!!isShowedPagination && !!paginationState && (
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={100}>
                                    <TablePagination
                                        {...paginationState}
                                        totalItemCount={
                                            !!onPagination ? paginationState?.totalItemCount || 0 : filteredValuesCount
                                        }
                                        onPaginationChange={onPaginationChange}
                                        responsiveView={false}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    )}
                </MuiTable>
            </TableContainer>
        </>
    );
}
