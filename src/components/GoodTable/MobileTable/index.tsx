import { ReactNode } from "react";
import { Box, Paper, SxProps } from "@mui/material";

import { ISortData } from "api/interfaces/components/GoodTable";

import GoodTableLoader from "../TableLoader";
import { IGoodTableField, IGoodTableProps } from "..";

import GoodTableMobileRow from "./TableRow";
import GoodTableMobileNoRecordsRow from "./TableNoRecordsRow";
import GoodTableMobileSort from "./Sort";

interface IProps<T> {
    fields: IGoodTableField[];
    values: IGoodTableProps<T>["values"];
    idName: string;
    loading: boolean;
    variant: IGoodTableProps<T>["variant"];
    noRecordsText?: string | ReactNode;
    selectedRows: T[];
    order?: ISortData;
    sxRowConditions?: { predicate: (row: T) => boolean; sx: SxProps }[];
    sxCellsProps?: { [key: string]: SxProps };
    isNotSelectable?: boolean;
    onSelectRow?: (data: T) => void;
    onRowClick?: (data: T) => void;
    onRowDoubleClick?: (data: T) => void;
    onSort: (data: ISortData) => void;
}

export default function GoodTableMobile<T>({
    fields = [],
    values = [],
    idName = "id",
    loading = false,
    variant = "box",
    noRecordsText,
    selectedRows = [],
    order,
    sxRowConditions,
    sxCellsProps,
    isNotSelectable,
    onSelectRow,
    onRowDoubleClick,
    onRowClick,
    onSort,
}: IProps<T>) {
    const onClick = (data: T) => {
        if (onSelectRow) {
            onSelectRow(data);
        }
        if (onRowClick) {
            onRowClick(data);
        }
    };
    return (
        <>
            <Box component={variant === "paper" ? Paper : Box}>
                {loading ? (
                    <GoodTableLoader
                        colSpan={fields.length}
                        responsiveView={true}
                    />
                ) : values?.length ? (
                    <>
                        <GoodTableMobileSort
                            fields={fields}
                            onSort={onSort}
                            order={order}
                        />
                        {values.map((row: any, index) => {
                            let key = index;
                            if (idName in row) {
                                key = row[idName];
                            }
                            const isSelected =
                                !isNotSelectable &&
                                selectedRows.findIndex((x: any) => {
                                    if (idName in x && idName in (row as any)) {
                                        return x[idName] === (row as any)[idName];
                                    }
                                    return false;
                                }) > -1;
                            return (
                                <GoodTableMobileRow
                                    key={key}
                                    row={row}
                                    fields={fields}
                                    onClick={onClick}
                                    isSelected={isSelected}
                                    onRowDoubleClick={onRowDoubleClick}
                                    sxConditions={sxRowConditions}
                                    sxCellsProps={sxCellsProps}
                                />
                            );
                        })}
                    </>
                ) : (
                    <GoodTableMobileNoRecordsRow noRecordsText={noRecordsText} />
                )}
            </Box>
        </>
    );
}
