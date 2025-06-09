import {
    Box,
    type IconButtonProps,
    Table as MuiTable,
    Paper,
    type SxProps,
    TableCell,
    TableContainer,
    TableFooter,
    TableRow,
} from "@mui/material";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";

import { type TIconName } from "components/Icon";
import { type ISelectValue } from "components/Inputs/Select";
import lang, { getEnumTitleValue, sortArray } from "lang";

import { arrayToCSV, downloadCsv } from "api/common/files";
import {
    type FilterDateEqualsEnum,
    type FilterNumberEqualsEnum,
    type FilterTextEqualsEnum,
    dateFilter,
    numberFilter,
    textFilter,
} from "api/common/filters";
import { objCopyWithType } from "api/common/helper";
import { useNotifier } from "api/hooks/useNotifier";

import type { IFilterListValue, ISortData, TFilterValue } from "api/interfaces/components/GoodTable";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

import dateTime from "api/common/dateTime";

import { transformGoodTableFieldValue } from "./Cell";
import GoodTableHead from "./Head";
import GoodTableMobile from "./MobileTable";
import GoodTableBody from "./TableBody";
import GoodTablePagination from "./TablePagination";
import GoodTableToolbar from "./Toolbar";

export interface IGoodTableToolbarAction<T> {
    name: string;
    icon: TIconName;
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
    pagination?: IGoodTablePagination;
    responsive?: boolean;
    mobileBottomAction?: boolean;
    noRecordsText?: string | ReactNode;
    idName?: string;
    size?: "medium" | "small";
    variant?: "box" | "paper";
    title?: string | ReactNode;
    actions?: (IGoodTableToolbarAction<T> | ReactNode)[];
    withoutSimpleTextFilter?: boolean;
    simpleSearchFields?: IGoodTableField[];
    sxRowConditions?: { predicate: (row: T) => boolean; sx: SxProps }[];
    sxCellsProps?: { [key: string]: SxProps };
    autoFocus?: "simpleSearchInput";
    csvExport?: string;
    typeSelection?: "single" | "multiple" | "no";
    sx?: SxProps;

    onRowClick?: (data: T) => void;
    onSelectedRows?: (data: T[]) => void;
    onRowDoubleClick?: (data: T) => void;
    onRowMiddleClick?: (data: T) => void;
    onOrderChanged?: (order?: ISortData) => void;
    transformValues?: (data: T) => any;
}

export interface IGoodTableField {
    name: string;
    title: string;
    noSort?: boolean;
    noSearch?: boolean;
    format?: "text" | "date" | "number" | "image" | "list" | "component" | "enum" | "boolean" | "listMany";
    formatProps?: any;
    minWidth?: string;
    maxWidth?: string;
    width?: string;
    wrap?: boolean;
    hidden?: boolean;
    beforeElement?: ReactNode | ((row: any) => ReactNode);
    afterElement?: ReactNode | ((row: any) => ReactNode);
}

export interface IGoodTablePagination {
    rowsPerPage: number[];
    pageSize: number;
}

interface IGoodTablePaginationWithPageNumber extends IGoodTablePagination {
    pageNumber: number;
}

const sortValues = (values: any[], field: IGoodTableField, direction: SortOrderEnum | "asc" | "desc") => {
    const result = sortArray(values, field.name);
    return direction === SortOrderEnum.Ascending || direction === "asc" ? result : result.reverse();
};

const filterValue = (values: any, filter: TFilterValue, field: IGoodTableField) => {
    const value = values[field.name];
    const fieldFormat = field?.format || "text";
    switch (fieldFormat) {
        case "list":
        case "enum": {
            const listFilterValue: IFilterListValue["value"] = (filter?.value as IFilterListValue["value"]) || [];
            return listFilterValue.includes(value as never);
        }
        case "boolean":
            return value === filter.value;
        case "text":
            return textFilter((filter?.value as string) || "", value, filter.searchType as FilterTextEqualsEnum);
        case "number":
            return numberFilter(filter?.value as number, value, filter.searchType as FilterNumberEqualsEnum);
        case "date":
            return dateFilter(filter?.value as Date | null, value, filter.searchType as FilterDateEqualsEnum);
        case "listMany":
            {
                const listFilterValuesMany: IFilterListValue["value"] =
                    (filter?.value as IFilterListValue["value"]) || [];

                if (listFilterValuesMany?.length) {
                    if (value?.length) {
                        return (listFilterValuesMany as any).filter((x: any) => value.includes(x)).length > 0;
                    }
                    return false;
                }
            }
            return true;
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
    if (simpleSearchText?.length) {
        const filteredRows = values.filter((row: any) => {
            return fields.some((field: any) => {
                if (field.name in row) {
                    const value = row[field.name];
                    if (value === null) {
                        return false;
                    }
                    if (field?.format) {
                        switch (field?.format) {
                            case "component":
                            case "image":
                            case "boolean":
                                return false;

                            case "enum": {
                                let enumText = value;
                                if (typeof field?.formatProps === "object" && field.formatProps?.length === 2) {
                                    enumText = getEnumTitleValue(field.formatProps[0], field.formatProps[1], value);
                                }
                                return textFilter(simpleSearchText.toString(), enumText);
                            }
                            case "date":
                                return textFilter(simpleSearchText.toString(), dateTime(value, field?.formatProps));
                            case "phone": {
                                const phoneSearchText = ((simpleSearchText as string) || "").replace(/\D/g, "");
                                if (!phoneSearchText.length) {
                                    return false;
                                }
                                return textFilter(phoneSearchText, value);
                            }
                            case "list": {
                                const selectedValue = field.formatProps.find((x: ISelectValue) => x.id === value);
                                if (selectedValue?.title) {
                                    return textFilter(simpleSearchText.toString(), selectedValue.title);
                                }
                                return false;
                            }
                            case "listMany":
                                {
                                    const selectedManyValues = field.formatProps.filter((x: ISelectValue) =>
                                        value.includes(x.id)
                                    );
                                    if (selectedManyValues?.length) {
                                        for (const selectedManyValue of selectedManyValues) {
                                            if (textFilter(simpleSearchText.toString(), selectedManyValue.title)) {
                                                return true;
                                            }
                                        }
                                    }
                                }
                                return false;
                        }
                    }
                    return textFilter(simpleSearchText?.toString() || "", value?.toString());
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
        if (order?.sort) {
            const field = fields.find((x) => x.name === order.sort);
            if (field) {
                return sortValues(res, field, order.direction);
            }
        }
        return res;
    }
    return [];
}

export const goodTableDefPagination: IGoodTablePagination = {
    pageSize: 10,
    rowsPerPage: [10, 25, 100],
};

export default function GoodTable<T>({
    values = [],
    fields = [],
    variant = "paper",
    height,
    stickyHeader = false,
    size = "medium",
    pagination = goodTableDefPagination,
    order,
    typeSelection = "single",
    idName = "id",
    loading = false,
    noRecordsText,
    responsive = true,
    mobileBottomAction = true,
    title,
    actions = [],
    withoutSimpleTextFilter = false,
    simpleSearchFields = undefined,
    sxRowConditions,
    sxCellsProps,
    autoFocus,
    csvExport,
    sx,
    onRowDoubleClick,
    onRowClick,
    onSelectedRows,
    onOrderChanged,
    onRowMiddleClick,
    transformValues,
}: IGoodTableProps<T>) {
    const defTableMaxHeight = 650;

    const [filters, setFilters] = useState<TFilterValue[]>([]);
    const [selectedRows, setSelectedRows] = useState<T[]>([]);
    const [filteredValues, setFilteredValues] = useState<T[]>([]);
    const [filteredValuesTotalCount, setFilteredValuesTotalCount] = useState(0);
    const [orderState, setOrderState] = useState<ISortData | undefined>(order);
    const { showError } = useNotifier();
    const [paginationState, setPaginationState] = useState<IGoodTablePaginationWithPageNumber>({
        ...pagination,
        pageNumber: 1,
    });
    useEffect(() => {
        onSelectedRows?.(selectedRows);
    }, [selectedRows]);
    useEffect(() => {
        onOrderChanged?.(orderState);
    }, [orderState]);

    const [simpleSearchText, setSimpleSearchText] = useState("");
    const showMobileTable = useMemo(() => {
        return !!responsive && !!isMobile;
    }, [responsive]);
    useEffect(() => {
        let simpleSearchTableFields = undefined;
        if (simpleSearchFields) {
            const searchFields = simpleSearchFields.filter((x) => fields.filter((y) => y.name === x.name));
            if (searchFields.length !== 0) {
                simpleSearchTableFields = searchFields;
            }
        }
        const transformedValues = transformValues ? values.map(transformValues) : values;

        const simpleValues = simpleTextSearch(simpleSearchText, transformedValues, simpleSearchTableFields ?? fields);
        const startIndex = (paginationState.pageNumber - 1) * paginationState.pageSize;
        let arr = sortAndOrder(simpleValues, fields, filters, orderState);
        setFilteredValuesTotalCount(arr?.length || 0);
        if (startIndex >= arr.length || paginationState.pageNumber < 1) {
            arr = [];
        } else {
            const endIndex = startIndex + paginationState.pageSize;
            arr = arr.slice(startIndex, endIndex);
        }
        setFilteredValues(arr);
        if (typeSelection !== "no") {
            setSelectedRows((prev) => {
                const newSelectedRows = [...prev];
                if (newSelectedRows.length && transformedValues.length) {
                    const valuesIds = transformedValues.map((x: any) => x?.[idName]);

                    return newSelectedRows.filter((x: any) => valuesIds.includes(x?.[idName]));
                }
                return newSelectedRows;
            });
        }
    }, [
        values,
        fields,
        filters,
        orderState,
        simpleSearchText,
        idName,
        paginationState.pageSize,
        paginationState.pageNumber,
        typeSelection,
        simpleSearchFields,
    ]);
    const containerSx = useMemo(() => {
        const newContainerSx: any = { ...sx };
        if (height) {
            newContainerSx.maxHeight = height;
        } else if (stickyHeader) {
            newContainerSx.maxHeight = defTableMaxHeight;
        }
        return newContainerSx;
    }, [height, stickyHeader, sx]);

    const isShowedPagination = useMemo(() => {
        if (paginationState && !!paginationState?.pageSize && values?.length) {
            return values.length > paginationState.pageSize;
        }
        return false;
    }, [paginationState, values?.length]);
    useEffect(() => {
        toPaginationChange(1, paginationState.pageSize);
    }, [filteredValuesTotalCount]);

    useEffect(() => {
        setPaginationState((prev) => {
            const newData = pagination ? pagination : goodTableDefPagination;
            return {
                ...prev,
                ...newData,
            };
        });
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
        switch (typeSelection) {
            case "single":
                setSelectedRows(isAlreadySelected ? [] : [rowData]);
                break;
            case "multiple":
                setSelectedRows((prev) =>
                    isAlreadySelected
                        ? prev.filter((x: any) => x[idName] !== (rowData as any)[idName])
                        : [...prev, rowData]
                );
                break;
        }
    };

    const onSelectAllRows = (action: "select" | "unselect") => {
        if (typeSelection === "no") {
            return;
        }
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
                    newResult.push(newFilter);
                }
            }
            return newResult;
        });
    };
    const toFilterClear = (fieldName: string) => {
        const field = fields.find((x) => x.name === fieldName);

        if (field) {
            setFilters((prev) => prev.filter((x) => x.name !== fieldName));
        }
    };
    const toCsvExportClick = () => {
        if (csvExport) {
            let arr: any[] = [];
            if (values.length) {
                let simpleSearchTableFields = undefined;
                if (simpleSearchFields) {
                    const searchFields = simpleSearchFields.filter((x) => fields.filter((y) => y.name === x.name));
                    if (searchFields.length !== 0) {
                        simpleSearchTableFields = searchFields;
                    }
                }
                const simpleValues = simpleTextSearch(simpleSearchText, values, simpleSearchTableFields ?? fields);
                arr = sortAndOrder(simpleValues, fields, filters, orderState);
                if (arr?.length) {
                    const results: string[][] = [];
                    const showedFields = fields.filter((x) => !x?.hidden);
                    results.push(showedFields.map((x) => x.title || ""));
                    for (const row of arr) {
                        const newResultRow: string[] = [];
                        for (const field of showedFields) {
                            const value = field.name in row ? row[field.name] : "";
                            newResultRow.push(transformGoodTableFieldValue(value, field, "text"));
                        }
                        results.push(newResultRow);
                    }
                    if (results.length) {
                        downloadCsv(arrayToCSV(results), csvExport);

                        return;
                    }
                }
                showError(lang.components.goodTable.noCsvExportData);
            }
        }
    };
    if (showMobileTable) {
        return (
            <>
                <TableContainer
                    sx={sx}
                    component={variant === "paper" ? Paper : Box}
                >
                    <GoodTableToolbar
                        title={title}
                        actions={actions}
                        selectedRows={selectedRows}
                        withoutSimpleTextFilter={withoutSimpleTextFilter}
                        onChangeSimpleSearchText={setSimpleSearchText}
                        isMobileView={mobileBottomAction}
                        csvExport={csvExport}
                        onCsvExportClick={toCsvExportClick}
                    />
                    <GoodTableMobile
                        fields={fields}
                        onSort={setOrderState}
                        order={orderState}
                        values={filteredValues}
                        sxRowConditions={sxRowConditions}
                        sxCellsProps={sxCellsProps}
                        idName={idName}
                        loading={loading}
                        selectedRows={selectedRows}
                        variant={variant}
                        onSelectRow={toSelectRow}
                        onRowDoubleClick={onRowDoubleClick}
                        noRecordsText={noRecordsText}
                        onRowClick={onRowClick}
                        isNotSelectable={typeSelection === "no"}
                    />
                    {!!isShowedPagination && !!paginationState && (
                        <GoodTablePagination
                            {...paginationState}
                            totalItemCount={filteredValuesTotalCount}
                            onPaginationChange={toPaginationChange}
                            isMobileView
                        />
                    )}
                </TableContainer>
                {!!actions?.length && <Box sx={{ pt: 4.1 }}></Box>}
            </>
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
                isMobileView={false}
                autoFocus={autoFocus === "simpleSearchInput"}
                csvExport={csvExport}
                onCsvExportClick={toCsvExportClick}
            />
            <MuiTable
                stickyHeader={stickyHeader}
                size={size}
            >
                <GoodTableHead
                    fields={fields}
                    onSort={setOrderState}
                    order={orderState}
                    isMultiSelection={typeSelection === "multiple"}
                    selectedRows={selectedRows}
                    rowCount={filteredValuesTotalCount}
                    selectRows={onSelectAllRows}
                    filters={filters}
                    onFilterChanged={toFilterChange}
                    onFilterClear={toFilterClear}
                />
                <GoodTableBody
                    fields={fields}
                    values={filteredValues}
                    idName={idName}
                    loading={loading}
                    onRowDoubleClick={onRowDoubleClick}
                    noRecordsText={noRecordsText}
                    isMultiSelection={typeSelection === "multiple"}
                    selectedRows={selectedRows}
                    onSelectRow={toSelectRow}
                    onRowClick={onRowClick}
                    onRowMiddleClick={onRowMiddleClick}
                    sxRowConditions={sxRowConditions}
                    sxCellsProps={sxCellsProps}
                />
                {!!isShowedPagination && !!paginationState && (
                    <TableFooter>
                        <TableRow>
                            <TableCell
                                colSpan={
                                    fields?.length
                                        ? typeSelection === "multiple"
                                            ? 1 + fields.length
                                            : fields.length
                                        : 100
                                }
                            >
                                <GoodTablePagination
                                    {...paginationState}
                                    totalItemCount={filteredValuesTotalCount}
                                    onPaginationChange={toPaginationChange}
                                    isMobileView={false}
                                />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                )}
            </MuiTable>
        </TableContainer>
    );
}
