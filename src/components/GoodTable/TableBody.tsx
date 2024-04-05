import { useMemo } from "react";
import { TableBody as MuiTableBody } from "@mui/material";

import GoodTableLoader from "./TableLoader";
import GoodTableRow from "./TableRow";
import GoodTableNoRecordsRow from "./TableNoRecordsRow";

import { IGoodTableField, IGoodTableProps } from ".";

interface IProps<T> {
    fields: IGoodTableField[];
    values: T[];
    idName: string;
    loading: boolean;
    noRecordsText?: string;
    isMultiSelection?: boolean;
    selectedRows: T[];
    onSelectRow: (data: T) => void;
    onRowClick?: (data: T) => void;
    onRowDoubleClick?: (data: T) => void;
}

function GoodTableBody<T>({
    fields = [],
    values = [],
    idName = "id",
    loading = false,
    noRecordsText = "",
    isMultiSelection = false,
    selectedRows = [],
    onSelectRow,
    onRowDoubleClick,
    onRowClick,
}: IProps<T>) {
    const cursor = useMemo(() => {
        return onRowClick || isMultiSelection ? "pointer" : undefined;
    }, [onRowClick, isMultiSelection]);

    const isSelected = (id: any) => {
        if (!selectedRows?.length) {
            return false;
        }
        const index = selectedRows.findIndex((x: any) => (idName in x ? x[idName] === id : false));
        return index > -1;
    };
    const toRowClick = (data: any) => {
        if (isMultiSelection) {
            onSelectRow(data);
        } else {
            onSelectRow(data);
        }
        if (!!onRowClick) {
            onRowClick(data);
        }
    };
    return (
        <MuiTableBody>
            {!!loading ? (
                <GoodTableLoader
                    colSpan={fields.length}
                    responsiveView={false}
                />
            ) : (
                <>
                    {!!values?.length ? (
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
                                    onDoubleClick={onRowDoubleClick}
                                    isMultiSelection={isMultiSelection}
                                    isSelected={isSelected(key)}
                                    cursor={cursor}
                                />
                            );
                        })
                    ) : (
                        <GoodTableNoRecordsRow
                            noRecordsText={noRecordsText}
                            fieldsLength={fields?.length || 1}
                        />
                    )}
                </>
            )}
        </MuiTableBody>
    );
}
export default GoodTableBody;
