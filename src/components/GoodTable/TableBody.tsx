import type { SxProps } from "@mui/material";
import { TableBody as MuiTableBody } from "@mui/material";
import type { ReactNode } from "react";
import { useMemo } from "react";

import GoodTableLoader from "./TableLoader";
import GoodTableNoRecordsRow from "./TableNoRecordsRow";
import GoodTableRow from "./TableRow";

import type { IGoodTableField } from ".";

interface IProps<T> {
    fields: IGoodTableField[];
    values: T[];
    idName: string;
    loading: boolean;
    noRecordsText?: string | ReactNode;
    isMultiSelection?: boolean;
    selectedRows: T[];
    sxRowConditions?: { predicate: (row: T) => boolean; sx: SxProps }[];
    sxCellsProps?: { [key: string]: SxProps };
    onSelectRow: (data: T) => void;
    onRowClick?: (data: T) => void;
    onRowDoubleClick?: (data: T) => void;
    onRowMiddleClick?: (data: T) => void;
}

export default function GoodTableBody<T>({
    fields = [],
    values = [],
    idName = "id",
    loading = false,
    noRecordsText,
    isMultiSelection = false,
    selectedRows = [],
    sxRowConditions,
    sxCellsProps,
    onSelectRow,
    onRowDoubleClick,
    onRowMiddleClick,
    onRowClick,
}: IProps<T>) {
    const cursor = useMemo(() => {
        return onRowClick || isMultiSelection ? "pointer" : undefined;
    }, [onRowClick, isMultiSelection]);
    const fieldsLength = useMemo(() => {
        let newFieldsLength = 1;
        if (fields?.length) {
            newFieldsLength = fields.length;
            if (isMultiSelection) {
                newFieldsLength++;
            }
        }
        return newFieldsLength;
    }, [isMultiSelection, fields?.length]);
    const isSelected = (id: any) => {
        if (!selectedRows?.length) {
            return false;
        }
        const index = selectedRows.findIndex((x: any) => (idName in x ? x[idName] === id : false));
        return index > -1;
    };
    const toRowClick = (data: any) => {
        onSelectRow(data);
        onRowClick?.(data);
    };
    return (
        <MuiTableBody>
            {loading ? (
                <GoodTableLoader
                    colSpan={fields.length}
                    responsiveView={false}
                />
            ) : (
                <>
                    {values?.length ? (
                        values.map((row: any, index: number) => {
                            let key = index;
                            if (idName in row) {
                                key = row[idName];
                            }
                            return (
                                <GoodTableRow
                                    key={key}
                                    row={row}
                                    fields={fields}
                                    onClick={toRowClick}
                                    sxConditions={sxRowConditions}
                                    sxCellsProps={sxCellsProps}
                                    onDoubleClick={onRowDoubleClick}
                                    onMiddleClick={onRowMiddleClick}
                                    isMultiSelection={isMultiSelection}
                                    isSelected={isSelected(key)}
                                    cursor={cursor}
                                />
                            );
                        })
                    ) : (
                        <GoodTableNoRecordsRow
                            noRecordsText={noRecordsText}
                            fieldsLength={fieldsLength}
                        />
                    )}
                </>
            )}
        </MuiTableBody>
    );
}
