import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import type { IDocumentPrintParamDto } from "api/interfaces/DocumentPrint/IDocumentPrintParamDto";
import { DocumentPrintParamTypeEnum } from "api/enums/DocumentPrintParamTypeEnum";

import lang, { getEnumSelectValues } from "lang";
import Icon from "components/Icon";

import { DocumentPrintParamAlignEnum } from "api/enums/DocumentPrintParamAlignEnum";

import ColorPicker from "../ColorPicker";
import Modal from "../../Modal";
import Select from "../Select";
import Counter from "../Counter";

import type { IDocumentPrintParamsCopyPosition } from ".";
interface IDocumentPrintParamsEditProps {
    item: IDocumentPrintParamDto;
    copyPosition: IDocumentPrintParamsCopyPosition | null;
    onCancel: () => void;
    onSave: (item: IDocumentPrintParamDto) => void;
}
export default function DocumentPrintParamsEdit({
    item,
    copyPosition,
    onCancel,
    onSave,
}: IDocumentPrintParamsEditProps) {
    const langPage = lang.components.documentPrintParams;
    const [localValue, setLocalValue] = useState<IDocumentPrintParamDto>(item);
    useEffect(() => {
        setLocalValue(item);
    }, [item]);
    const toChangeValue = (value: any, name: keyof IDocumentPrintParamDto) => {
        setLocalValue((prev) => ({ ...prev, [name]: value }));
    };
    const toPastePosition = () => {
        setLocalValue((prev) => ({ ...prev, ...copyPosition }));
    };
    const toSave = () => {
        onSave(localValue);
    };
    return (
        <Modal
            open
            title={lang.edit}
            withCloseButton
            onClose={onCancel}
            actions={[
                <Button
                    onClick={onCancel}
                    color="inherit"
                >
                    {lang.cancel}
                </Button>,
                <Button onClick={toSave}>{lang.save}</Button>,
            ]}
        >
            <Select
                label={langPage.type}
                value={localValue.type}
                onChangeValue={(v) => toChangeValue(v, "type")}
                required
                values={getEnumSelectValues(DocumentPrintParamTypeEnum, "DocumentPrintParamTypeEnum")}
            />
            <ColorPicker
                label={langPage.color}
                value={localValue.color}
                onChangeValue={(v) => toChangeValue(v, "color")}
            />
            <Select
                label={langPage.align}
                value={localValue.align}
                onChangeValue={(v) => toChangeValue(v, "align")}
                required
                values={getEnumSelectValues(DocumentPrintParamAlignEnum, "DocumentPrintParamAlignEnum")}
            />
            <Counter
                label={langPage.size}
                value={localValue.size}
                onChangeValue={(v) => toChangeValue(v, "size")}
                required
                minValue={1}
            />
            <Counter
                label={langPage.x}
                value={localValue.x}
                onChangeValue={(v) => toChangeValue(v, "x")}
                required
                minValue={1}
            />
            <Counter
                label={langPage.y}
                value={localValue.y}
                onChangeValue={(v) => toChangeValue(v, "y")}
                required
                minValue={1}
            />
            <Counter
                label={langPage.width}
                value={localValue.width}
                onChangeValue={(v) => toChangeValue(v, "width")}
                required
                minValue={1}
            />
            <Counter
                label={langPage.height}
                value={localValue.height}
                onChangeValue={(v) => toChangeValue(v, "height")}
                required
                minValue={1}
            />
            {!!copyPosition && (
                <Button
                    onClick={toPastePosition}
                    startIcon={<Icon name="paste" />}
                >
                    {langPage.pastePosition}
                </Button>
            )}
        </Modal>
    );
}
