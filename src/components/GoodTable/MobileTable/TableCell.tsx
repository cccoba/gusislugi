import { useMemo } from "react";
import { Box, SxProps } from "@mui/material";

import { IGoodTableField } from "..";
import { getFieldTitle } from "../Head";
import GoodTableCellExtraElement from "../Cell/ExtraElement";
import { transformGoodTableFieldValue } from "../Cell";

interface IProps {
    value?: any;
    field: IGoodTableField;
    cursor?: string;
    rowValues: any;
    sx?: SxProps;
    sxCellsProps?: { [key: string]: SxProps };
}

export default function GoodTableMobileCell({
    value = "",
    field,
    sx = {},
    rowValues,
    sxCellsProps,
}: IProps) {
    const sxProps = useMemo<any>(() => {
        const mobileSxProps: any = {
            cell: { display: "flex", p: 1.5, ...sx },
            box: { overflowWrap: "break-word", width: "50%" },
        };
        if (sxCellsProps?.[field.name]) {
            return { ...mobileSxProps.cell, ...sxCellsProps[field.name] };
        }
        return mobileSxProps;
    }, [field, sx, sxCellsProps]);

    const valueString = useMemo(() => {
        return transformGoodTableFieldValue(value, field, "component");
    }, [value, field]);

    if (field?.hidden) {
        return null;
    }
    return (
        <Box
            className="MuiTableCell-root"
            sx={sxProps.cell}
        >
            <Box sx={sxProps.box}>{getFieldTitle(field)}</Box>
            <Box sx={sxProps.box}>
                <GoodTableCellExtraElement
                    element={field?.beforeElement}
                    rowValues={rowValues}
                />
                {!!field?.format && field.format === "component" ? value : valueString}
                <GoodTableCellExtraElement
                    element={field?.afterElement}
                    rowValues={rowValues}
                />
            </Box>
        </Box>
    );
}
