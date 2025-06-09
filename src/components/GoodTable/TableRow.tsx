import type { SxProps, TableRowProps } from "@mui/material";
import { Checkbox, TableCell as MuiTableCell, TableRow as MuiTableRow } from "@mui/material";
import DoubleClickProvider from "components/DoubleClickProvider";
import { useMemo } from "react";

import GoodTableCell from "./Cell";

import type { IGoodTableField } from ".";

interface IProps<T> {
    fields: IGoodTableField[];
    row: T;
    hover?: boolean;
    rowProps?: TableRowProps;
    isMultiSelection?: boolean;
    cursor?: string;
    isSelected?: boolean;
    sxConditions?: { predicate: (row: T) => boolean; sx: SxProps }[];
    sxCellsProps?: { [key: string]: SxProps };
    onClick?: (row: T) => void;
    onDoubleClick?: (row: T) => void;
    onMiddleClick?: (row: T) => void;
}

export default function GoodTableRow<T>({
    fields,
    row,
    hover = true,
    rowProps,
    isMultiSelection = false,
    isSelected = false,
    cursor,
    sxConditions = [],
    sxCellsProps,
    onClick,
    onMiddleClick,
    onDoubleClick,
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
    const toDoubleClick = () => {
        onDoubleClick?.(row);
    };
    const handleMiddleClick = (e: any) => {
        if (!!onMiddleClick && e?.button === 1) {
            e.preventDefault();
            onMiddleClick(row);
        }
    };

    return (
        <DoubleClickProvider
            component={MuiTableRow}
            hover={hover}
            onClick={onRowClick}
            onDoubleClick={toDoubleClick}
            onMouseDown={handleMiddleClick}
            selected={isSelected}
            {...rowProps}
        >
            {!!isMultiSelection && (
                <MuiTableCell
                    padding="checkbox"
                    sx={{ textAlign: "center" }}
                >
                    <Checkbox
                        color="primary"
                        checked={isSelected}
                    />
                </MuiTableCell>
            )}
            {fields.map((field) => {
                let value: any = "";
                if (field.name in (row as any)) {
                    value = (row as any)[field.name];
                }
                return (
                    <GoodTableCell
                        sx={sxConditionedProps}
                        key={field.name}
                        value={value}
                        field={field}
                        cursor={cursor}
                        rowValues={row}
                        sxCellsProps={sxCellsProps}
                    />
                );
            })}
        </DoubleClickProvider>
    );
}
