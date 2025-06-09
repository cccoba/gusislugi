import { useMemo } from "react";
import { Box, TableRow as MuiTableRow, Paper, SxProps } from "@mui/material";

import DoubleClickProvider from "components/DoubleClickProvider";

import TableCell from "../Cell";
import { IGoodTableField } from "..";
import GoodTableMobileCell from "./TableCell";

interface IProps<T> {
    fields: IGoodTableField[];
    row: T;
    isSelected?: boolean;
    sxConditions?: { predicate: (row: T) => boolean; sx: SxProps }[];
    sxCellsProps?: { [key: string]: SxProps };
    onClick?: (row: T) => void;
    onRowDoubleClick?: (row: T) => void;
}

export default function GoodTableMobileRow<T>({
    fields,
    row,
    isSelected = false,
    sxConditions = [],
    sxCellsProps,
    onClick,
    onRowDoubleClick,
}: IProps<T>) {
    const sxConditionedProps = useMemo<SxProps>(() => {
        return (
            sxConditions.reduce(
                (sxCondition, { predicate, sx }) => {
                    if (predicate(row)) {
                        sxCondition = {
                            ...sxCondition,
                            sx: { ...sxCondition.sx, ...sx } as SxProps,
                        };
                    }
                    return sxCondition;
                },
                { predicate: (row: T) => !row, sx: {} }
            ).sx ?? {}
        );
    }, [row, sxConditions]);
    const onRowClick = () => {
        onClick?.(row);
    };
    return (
        <Paper
            sx={{ mb: 1.5 }}
            elevation={2}
        >
            <DoubleClickProvider onDoubleClick={() => onRowDoubleClick?.(row)}>
                <MuiTableRow
                    onClick={onRowClick}
                    selected={isSelected}
                    component={Box}
                    sx={{ ...sxConditionedProps, display: "block", width: "100%" }}
                >
                    {fields.map((field) => {
                        let value: any = "";
                        if (field.name in (row as any)) {
                            value = (row as any)[field.name];
                        }
                        return (
                            <GoodTableMobileCell
                                key={field.name}
                                value={value}
                                field={field}
                                rowValues={row}
                                sxCellsProps={sxCellsProps}
                            />
                        );
                    })}
                </MuiTableRow>
            </DoubleClickProvider>
        </Paper>
    );
}
