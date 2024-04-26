import { useMemo } from "react";
import { Box, TableCell as MuiTableCell } from "@mui/material";

import CutText from "components/CutText";
import Image from "components/Image";

import dateTime from "api/common/dateTime";

import { getFieldTitle } from "./TableHead";

import { IGoodTableField } from ".";
import { ISelectValue } from "components/Inputs/Select";

interface IProps {
    value?: any;
    field: IGoodTableField;
    cursor?: string;
    responsiveView: boolean;
}

const defSxProps = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
};

function GoodTableCell({ value = "", field, cursor = "", responsiveView }: IProps) {
    const sx = useMemo(() => {
        if (responsiveView) {
            return { cell: { display: "flex", p: 1.5 }, box: { overflowWrap: "break-word", width: "50%" } };
        }
        const newSxProps: any = { box: { ...defSxProps }, cell: { p: 1 } };
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
                case "image":
                    return (
                        <Image
                            image={value}
                            width="32px"
                            zoom
                        />
                    );
                case "list":
                    if (field?.formatProps?.length && typeof field?.formatProps === "object") {
                        return field?.formatProps.find((x: ISelectValue) => x.id === value)?.title || value;
                    }
                    return value;
            }
            return value.toString();
        }
        return "";
    }, [value, field]);
    if (!!field?.hidden) {
        return null;
    }
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
                    {!!field?.format && field.format === "image" ? valueString : <CutText value={valueString} />}
                </Box>
            )}
        </MuiTableCell>
    );
}
export default GoodTableCell;
