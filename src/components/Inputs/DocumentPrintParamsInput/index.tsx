import { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";

import type { IInputProps } from "api/interfaces/components/IInputProps";
import type { IDocumentPrintParamDto } from "api/interfaces/DocumentPrint/IDocumentPrintParamDto";
import getConst from "api/common/getConst";
import { DocumentPrintParamTypeEnum } from "api/enums/DocumentPrintParamTypeEnum";

import lang, { getEnumSelectValues } from "lang";
import Fieldset from "components/Fieldset";
import GoodTable from "components/GoodTable";

import { DocumentPrintParamAlignEnum } from "api/enums/DocumentPrintParamAlignEnum";

import FormControl from "../FormControl";

import DocumentPrintParamsEdit from "./Edit";
import DocumentPrintParamsImageResult from "./ImageResult";
import DocumentPrintParamsImageExample from "./ImageExaple";

interface IProps extends IInputProps<IDocumentPrintParamDto[]> {
    originalName: string;
    exampleName: string;
}

export interface IDocumentPrintParamsCopyPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}
export default function DocumentPrintParamsInput({
    label = "",
    variant = "standard",
    fullWidth = true,
    error = false,
    required = false,
    helperText = "",
    disabled = false,
    value,
    originalName,
    exampleName,
    onChangeValue,
}: IProps) {
    const langPage = lang.components.documentPrintParams;
    const [editItem, setEditItem] = useState<IDocumentPrintParamDto | null>(null);
    const imageData = useMemo(() => {
        return {
            example: exampleName ? `${getConst("images-url")}${exampleName}` : "",
            model: originalName ? `${getConst("images-url")}${originalName}` : "",
        };
    }, [originalName, exampleName]);
    const [copyPosition, setCopyPosition] = useState<IDocumentPrintParamsCopyPosition | null>(null);
    const toAdd = () => {
        setEditItem({
            type: DocumentPrintParamTypeEnum.FirstName,
            size: 10,
            color: "#000000",
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            align: DocumentPrintParamAlignEnum.Center,
        });
    };
    const toEdit = ([item]: IDocumentPrintParamDto[]) => {
        setEditItem(item);
    };
    const toDelete = ([item]: IDocumentPrintParamDto[]) => {
        onChangeValue(value.filter((x) => x.type !== item.type));
    };
    const hideEdit = () => {
        setEditItem(null);
    };
    const toSave = (newItem: IDocumentPrintParamDto) => {
        const newValueIndex = value.findIndex((x) => x.type === newItem.type);
        const newValue = [...value];
        if (newValueIndex !== -1) {
            newValue[newValueIndex] = newItem;
        } else {
            newValue.push(newItem);
        }
        onChangeValue(newValue);
        setEditItem(null);
    };

    /**
     * Обработчик получения координат нарисованного прямоугольника
     */
    const onCopyPosition = (position: IDocumentPrintParamsCopyPosition) => {
        setCopyPosition(position);
    };

    return (
        <>
            {editItem && (
                <DocumentPrintParamsEdit
                    item={editItem}
                    copyPosition={copyPosition}
                    onCancel={hideEdit}
                    onSave={toSave}
                />
            )}
            <FormControl
                fullWidth={fullWidth}
                error={error}
                required={required}
                disabled={disabled}
                variant={variant}
                label={label}
                helperText={helperText}
            >
                <GoodTable<IDocumentPrintParamDto>
                    fields={[
                        {
                            name: "type",
                            title: langPage.type,
                            format: "list",
                            formatProps: getEnumSelectValues(DocumentPrintParamTypeEnum, "DocumentPrintParamTypeEnum"),
                        },
                        {
                            name: "size",
                            title: langPage.size,
                            format: "number",
                        },
                    ]}
                    actions={[
                        {
                            name: "add",
                            icon: "add",
                            onClick: toAdd,
                        },
                        {
                            name: "edit",
                            icon: "edit",
                            onClick: toEdit,
                            disable: (selectedRows: IDocumentPrintParamDto[]) => selectedRows.length !== 1,
                        },
                        {
                            name: "delete",
                            color: "error",
                            icon: "delete",
                            onClick: toDelete,
                            disable: (selectedRows: IDocumentPrintParamDto[]) => selectedRows.length !== 1,
                        },
                    ]}
                    values={value}
                    onRowDoubleClick={(x: IDocumentPrintParamDto) => toEdit([x])}
                />
                <Box
                    sx={{
                        maxHeight: "40vh",
                        maxWidth: "100vw",
                        overflow: "auto",
                    }}
                >
                    <Box
                        display="flex"
                        gap={2}
                    >
                        {!!imageData.model && (
                            <Fieldset label={langPage.result}>
                                <DocumentPrintParamsImageResult
                                    url={imageData.model}
                                    params={value}
                                    onItemClick={(x) => toEdit([x])}
                                />
                            </Fieldset>
                        )}
                        {!!imageData.example && (
                            <Fieldset label={langPage.example}>
                                <DocumentPrintParamsImageExample
                                    url={imageData.example}
                                    onCopyPosition={onCopyPosition}
                                />
                            </Fieldset>
                        )}
                    </Box>
                    {copyPosition && (
                        <Box mt={1}>
                            <Typography
                                variant="caption"
                                color="primary"
                            >
                                {langPage.copiedPosition}: {langPage.x}={copyPosition.x}, {langPage.y}={copyPosition.y},{" "}
                                {langPage.width}={copyPosition.width}, {langPage.height}={copyPosition.height}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </FormControl>
        </>
    );
}
