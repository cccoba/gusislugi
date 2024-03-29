import { useMemo } from "react";
import { TableBody as MuiTableBody } from "@mui/material";

import TableLoading from "./TableLoading";
import TableRow from "./TableRow";
import TableNoRecordsRow from "./TableNoRecordsRow";

import { ITableField, ITableProps } from ".";

interface IProps {
    fields: ITableField[];
    values: ITableProps["values"];
    idName: string;
    loading: boolean;
    noRecordsText?: string;
    isMultiSelection?: boolean;
    selectedRows: any[];
    onSelectRow: (data: any) => void;
    onDoubleClick?: (data: any) => void;
}

function TableBofy({
    fields = [],
    values = [],
    idName = "id",
    loading = false,
    noRecordsText = "",
    isMultiSelection = false,
    selectedRows = [],
    onSelectRow,
    onDoubleClick,
}: IProps) {
    const cursor = "pointer";
    /*const cursor = useMemo(() => {
        return onSelect || isMultiSelection ? "pointer" : undefined;
    }, [onSelect, isMultiSelection]);*/

    const isSelected = (id: any) => {
        if (!selectedRows?.length) {
            return false;
        }
        const index = selectedRows.findIndex((x) => x[idName] === id);
        return index > -1;
    };
    const onRowClick = (data: any) => {
        if (isMultiSelection) {
            onSelectRow(data);
        } else {
            onSelectRow(data);
        }
    };
    return (
        <MuiTableBody>
            {!!loading ? (
                <TableLoading
                    colSpan={fields.length}
                    responsiveView={false}
                />
            ) : (
                <>
                    {!!values?.length ? (
                        values.map((row) => {
                            const { rowProps, ...oterProps } = row;
                            const isItemSelected = isSelected(row[idName]);

                            return (
                                <TableRow
                                    key={row[idName]}
                                    row={oterProps}
                                    rowProps={rowProps}
                                    fields={fields}
                                    onClick={onRowClick}
                                    onDoubleClick={onDoubleClick}
                                    isMultiSelection={isMultiSelection}
                                    isSelected={isItemSelected}
                                    cursor={cursor}
                                />
                            );
                        })
                    ) : (
                        <TableNoRecordsRow
                            noRecordsText={noRecordsText}
                            fieldsLength={fields?.length || 1}
                        />
                    )}
                </>
            )}
        </MuiTableBody>
    );
}
export default TableBofy;
