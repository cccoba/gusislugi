import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Paper,
    TableContainer,
    Table as MuiTable,
    TableFooter,
    TableRow,
    TableCell,
    IconButtonProps,
} from "@mui/material";

import { sortArray } from "lang";
import { ISelectValue } from "components/Inputs/Select";

import { IPaginationData, ISortData, SortOrderEnum, TFilterValue } from "api/interfaces/components/GoodTable";
import { objCopyWithType } from "api/common/helper";
import {
    FilterDateEqualsEnum,
    FilterNumberEqualsEnum,
    FilterTextEqualsEnum,
    dateFilter,
    numberFilter,
    textFilter,
} from "api/common/filters";
import { useAppSelector } from "api/hooks/redux";
import dateTime from "api/common/dateTime";

import GoodTablePagination from "./TablePagination";
import GoodTableHead from "./TableHead";
import GoodTableBody from "./TableBody";
import GoodTableMobile from "./MobileTable";
import GoodTableToolbar from "./TableToolbar";

export interface IGoodTableToolbarAction<T> {
    name: string;
    icon: string;
    onClick: (selectedRows: T[]) => void;
    color?: IconButtonProps["color"];
    disable?: (selectedRows: T[]) => boolean;
    tooltip?: string;
}
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
    title?: string;
    actions?: IGoodTableToolbarAction<T>[];
    withoutSimpleTextFilter?: boolean;

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
    minWidth?: string;
    maxWidth?: string;
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
            return textFilter((filter?.value as string) || "", value, filter.searchType as FilterTextEqualsEnum);
        case "number":
            return numberFilter(filter?.value as number, value, filter.searchType as FilterNumberEqualsEnum);
        case "date":
            return dateFilter(filter?.value as Date | null, value, filter.searchType as FilterDateEqualsEnum);
    }
    return true;
};
const filterValues = (values: any[], filters: TFilterValue[], fields: IGoodTableField[]) => {
    if (values.length && filters.length) {
        let newValues = [...values];
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
const simpleTextSearch = (simpleSearchText: string, values: any[], fields: IGoodTableField[]) => {
    if (!!simpleSearchText?.length) {
        const filteredRows = values.filter((row: any) => {
            return fields.some((field: any) => {
                if (field.name in row) {
                    const value = row[field.name];
                    if (value === null) {
                        return false;
                    }
                    if (!!field?.format) {
                        switch (field?.format) {
                            case "component":
                            case "image":
                                return false;
                            case "date":
                                return textFilter(simpleSearchText.toString(), dateTime(value, field?.formatProps));
                            case "list":
                                const selectedValue = field.formatProps.find((x: ISelectValue) => x.id === value);
                                if (!!selectedValue?.title) {
                                    return textFilter(simpleSearchText.toString(), selectedValue.title);
                                }
                                return false;
                        }
                    }
                    return textFilter(simpleSearchText.toString(), value.toString());
                }
                return false;
            });
        });
        return filteredRows;
    }
    return values;
};
function sortAndOrder(values: any[], fields: IGoodTableField[], filters: TFilterValue[], order?: ISortData) {
    const res = filterValues(values, filters, fields);
    if (res.length) {
        if (!!order) {
            const field = fields.find((x) => x.name === order.sort);
            if (!!field) {
                return sortValues(res, field, order.direction);
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
    variant = "paper",
    height,
    stickyHeader = false,
    size = "medium",
    pagination,
    order,
    isMultiSelection = false,
    idName = "id",
    loading = false,
    noRecordsText,
    responsive = true,
    title,
    actions = [],
    withoutSimpleTextFilter = false,
    onRowDoubleClick,
    onRowClick,
}: IGoodTableProps<T>) {
    const [selectedRows, setSelectedRows] = useState<T[]>([]);
    const [filteredValues, setFilteredValues] = useState<T[]>([]);
    const [orderState, setOrderState] = useState<ISortData | undefined>(order);
    const [paginationState, setPaginationState] = useState(pagination);
    const isMobile = useAppSelector((s) => s.device.isMobile);
    const [filters, setFilters] = useState<TFilterValue[]>([]);
    const [simpleSearchText, setSimpleSearchText] = useState("");
    const responsiveView = useMemo(() => {
        return !!responsive && !!isMobile;
    }, [responsive, isMobile]);
    useEffect(() => {
        const simpleValues = simpleTextSearch(simpleSearchText, values, fields);
        setFilteredValues(sortAndOrder(simpleValues, fields, filters, orderState));
    }, [values, fields, filters, orderState, simpleSearchText]);
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
            const field = fields.find((x) => x.name === fieldName);
            if (field) {
                if (
                    !newFilter ||
                    newFilter.value === undefined ||
                    (field.format === "number" && newFilter.value === "")
                ) {
                    return newResult.filter((x) => x.name !== fieldName);
                }
                const filterValue = newResult.find((x) => x.name === fieldName);
                if (filterValue) {
                    filterValue.searchType = newFilter.searchType;
                    filterValue.value = newFilter.value;
                    return newResult;
                } else {
                    return [...newResult, newFilter];
                }
            }
            return newResult;
        });
    };
    if (responsiveView) {
        return (
            <TableContainer component={variant === "paper" ? Paper : Box}>
                <GoodTableToolbar
                    title={title}
                    actions={actions}
                    selectedRows={selectedRows}
                    withoutSimpleTextFilter={withoutSimpleTextFilter}
                    onChangeSimpleSearchText={setSimpleSearchText}
                />
                <GoodTableMobile
                    fields={fields}
                    values={filteredValues}
                    idName={idName}
                    loading={loading}
                    onSelectRow={toSelectRow}
                    variant={variant}
                />
                {!!isShowedPagination && !!paginationState && (
                    <GoodTablePagination
                        {...paginationState}
                        totalItemCount={filteredValues.length}
                        onPaginationChange={toPaginationChange}
                        responsiveView={responsiveView}
                    />
                )}
            </TableContainer>
        );
    }
    return (
        <TableContainer
            component={variant === "paper" ? Paper : Box}
            sx={containerSx}
        >
            <GoodTableToolbar
                title={title}
                actions={actions}
                selectedRows={selectedRows}
                withoutSimpleTextFilter={withoutSimpleTextFilter}
                onChangeSimpleSearchText={setSimpleSearchText}
            />
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
                    onRowClick={onRowClick}
                />
                {!!isShowedPagination && !!paginationState && (
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={fields?.length || 100}>
                                <GoodTablePagination
                                    {...paginationState}
                                    totalItemCount={filteredValues.length}
                                    onPaginationChange={toPaginationChange}
                                    responsiveView={responsiveView}
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
