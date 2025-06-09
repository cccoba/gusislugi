import { useMemo } from "react";
import type { SxProps } from "@mui/material";
import { Box, TableCell as MuiTableCell } from "@mui/material";

import Image from "components/Image";
import type { ISelectValue } from "components/Inputs/Select";
import { getEnumTitleValue } from "lang";

import dateTime from "api/common/dateTime";

import type { IGoodTableField } from "..";

import GoodTableCellBoolean, { getGoodTableCellBooleanConfig } from "./Boolean";
import GoodTableCellExtraElement from "./ExtraElement";

interface IProps {
    value?: any;
    field: IGoodTableField;
    cursor?: string;
    rowValues: any;
    sx?: SxProps;
    sxCellsProps?: { [key: string]: SxProps };
}

export function transformGoodTableFieldValue(value: any, field: IGoodTableField, returnType: "component" | "text") {
    if (typeof value !== "object") {
        switch (field?.format) {
            case "date":
                return dateTime(value, field?.formatProps);
            case "enum":
                if (typeof field?.formatProps === "object" && field.formatProps?.length === 2) {
                    return getEnumTitleValue(field.formatProps[0], field.formatProps[1], value);
                }
                return value;
            case "image":
                if (returnType === "text") {
                    return "";
                }
                const imageProps =
                    typeof field?.formatProps !== "undefined"
                        ? field.formatProps
                        : { width: "32px", zoom: true, preview: true };

                return (
                    <Image
                        image={value}
                        {...imageProps}
                    />
                );
            case "list":
                if (field?.formatProps?.length && typeof field?.formatProps === "object") {
                    return field?.formatProps.find((x: ISelectValue) => x.id === value)?.title || value;
                }
                return value;
            case "boolean":
                if (returnType === "text") {
                    const valueConfig = getGoodTableCellBooleanConfig(value, field?.formatProps);
                    return valueConfig.title;
                }
                return (
                    <GoodTableCellBoolean
                        value={value}
                        config={field?.formatProps}
                    />
                );
        }
        return value.toString();
    } else {
        switch (field?.format) {
            case "listMany":
                if (value?.length && field?.formatProps?.length && typeof field?.formatProps === "object") {
                    const values = field.formatProps.filter((x: any) => value.includes(x.id));
                    return values.map((x: any) => x.title).join(", ");
                }
                break;
            case "date":
                return dateTime(value, field?.formatProps);
        }
    }
    return "";
}

function GoodTableCell({ value = "", field, cursor = "", sx = {}, rowValues, sxCellsProps }: IProps) {
    const sxProps = useMemo(() => {
        const newSxProps: any = {
            box: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            cell: { p: 1 },
        };
        if (cursor) {
            newSxProps.cell.cursor = cursor;
        }
        if (typeof field.width !== "undefined") {
            newSxProps.cell.width = field.width;
        }
        if (typeof field.maxWidth !== "undefined") {
            newSxProps.cell.maxWidth = field.maxWidth;
        }
        if (typeof field.minWidth !== "undefined") {
            newSxProps.cell.minWidth = field.minWidth;
        }
        if (sxCellsProps?.[field.name]) {
            newSxProps.cell = { ...newSxProps.cell, ...sxCellsProps[field.name] };
        }
        newSxProps.cell = { ...newSxProps.cell, ...sx };
        return newSxProps;
    }, [field, cursor, sx, sxCellsProps]);

    const valueString = useMemo(() => {
        return transformGoodTableFieldValue(value, field, "component");
    }, [value, field]);
    if (field?.hidden) {
        return null;
    }
    return (
        <MuiTableCell sx={sxProps.cell}>
            <GoodTableCellExtraElement
                element={field?.beforeElement}
                rowValues={rowValues}
            />
            {field?.format === "component" ? (
                value
            ) : field?.wrap ? (
                valueString
            ) : (
                <Box sx={sxProps.box}>{valueString}</Box>
            )}
            <GoodTableCellExtraElement
                element={field?.afterElement}
                rowValues={rowValues}
            />
        </MuiTableCell>
    );
}

export default GoodTableCell;
