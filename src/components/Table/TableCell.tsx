import { useMemo } from "react";
import { Box, TableCell as MuiTableCell } from "@mui/material";

import CutText from "components/CutText";

import dateTime from "api/common/dateTime";

import { getFieldTitle } from "./TableHead";

import { ITableField } from ".";

interface IProps {
    value?: any;
    field: ITableField;
    cursor?: string;
    responsiveView: boolean;
}

const defSxProps = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
};

function TableCell({ value = "", field, cursor = "", responsiveView }: IProps) {
    const sx = useMemo(() => {
        if (responsiveView) {
            return { cell: { display: "flex", p: 1.5 }, box: { overflowWrap: "break-word", width: "50%" } };
        }
        const newSxProps: any = { box: { ...defSxProps }, cell: {} };
        if (!!field?.width) {
            newSxProps.box.width = field.width;
            newSxProps.cell.width = field.width;
        }
        if (!!cursor) {
            newSxProps.cell.cursor = cursor;
        }
        return newSxProps;
    }, [field, cursor, responsiveView]);
    const valueString = useMemo(() => {
        if (typeof value !== "object") {
            switch (field?.format) {
                case "date":
                    return dateTime(value, field?.formatProps);
            }
            return value.toString();
        }
        return "";
    }, [value, field]);

    if (responsiveView) {
        return (
            <Box
                className="MuiTableCell-root"
                sx={sx.cell}
            >
                <Box sx={sx.box}>{getFieldTitle(field)}</Box>
                <Box sx={sx.box}>{!!field?.format && field.format === "component" ? value : valueString}</Box>
            </Box>
        );
    }
    return (
        <MuiTableCell sx={sx.cell}>
            {!!field?.format && field.format === "component" ? (
                value
            ) : !!field?.wrap ? (
                valueString
            ) : (
                <Box sx={sx.box}>
                    <CutText value={valueString} />
                </Box>
            )}
        </MuiTableCell>
    );
}
export default TableCell;
