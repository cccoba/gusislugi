import { useEffect, useMemo, useState } from "react";
import { Box, Button } from "@mui/material";

import List, { IListItem } from "components/List";
import lang, { getEnumSelectValues, getEnumTitle, getEnumTitleValue } from "lang";
import IconButton from "components/Icon/IconButton";
import useGetData from "store/rtkProvider";
import Modal from "components/Modal";

import { IInputProps } from "api/interfaces/components/IInputProps";
import { IMedicineDiseaseCondition } from "api/interfaces/Medicine/IMedicineDiseaseCondition";
import { ComparisonOperatorEnum } from "api/enums/ComparisonOperatorEnum";
import { MedicineParamsTypeEnum } from "api/enums/MedicineParamsTypeEnum";
import { IMedicineParam } from "api/interfaces/Medicine/IMedicineParam";

import InputSelect from "./InputSelect/InputSelect";
import Counter from "./Counter";
import FormControl from "./FormControl";

interface IMedicineDiseaseConditionsProps extends IInputProps<IMedicineDiseaseCondition[]> {}

function getDiseaseConditionsValueString(
    param: IMedicineParam | undefined,
    value: number,
    action: ComparisonOperatorEnum
) {
    if (!param) return "";
    const paramValue = param?.type === MedicineParamsTypeEnum.Boolean ? (value ? lang.yes : lang.no) : value;
    return `${param?.title} ${getEnumTitleValue(
        ComparisonOperatorEnum,
        "ComparisonOperatorEnum",
        action
    )} ${paramValue}`;
}
export default function MedicineDiseaseConditions({
    value,
    onChangeValue,
    label = "",
    variant = "standard",
    fullWidth = true,
    error = false,
    required = false,
    helperText = "",
    disabled = false,
    ...props
}: IMedicineDiseaseConditionsProps) {
    const langPage = lang.components.medicineDisease;
    const [selectedCondition, setSelectedCondition] = useState<{
        value: IMedicineDiseaseCondition;
        index: number;
    } | null>(null);
    const { data: medicineParams } = useGetData<IMedicineParam[]>("medicineParams", []);
    const values = useMemo<IListItem[]>(() => {
        if (value) {
            return value.map((x) => {
                const param = medicineParams?.find((p) => p.id === x.paramId);
                return {
                    id: x.paramId,
                    title: getDiseaseConditionsValueString(param, x.value, x.action),
                    actions: [
                        {
                            icon: "delete",
                            cb: toDelete,
                            color: "error",
                        },
                        {
                            icon: "edit",
                            cb: toEdit,
                        },
                    ],
                };
            });
        }
        return [];
    }, [value, medicineParams]);
    function toDelete(id: any) {
        onChangeValue(value.filter((x) => x.paramId !== id));
    }
    function toEdit(id: any) {
        const conditionIndex = value.findIndex((x) => x.paramId === id);
        if (conditionIndex > -1) {
            setSelectedCondition({ value: value[conditionIndex], index: conditionIndex });
        }
    }
    const onAdd = () => {
        setSelectedCondition({ value: { paramId: 0, value: 0, action: ComparisonOperatorEnum.Equal }, index: -1 });
    };
    const hideSelectedCondition = () => {
        setSelectedCondition(null);
    };
    const toEditSave = (newValue: IMedicineDiseaseCondition) => {
        if (!selectedCondition) return;
        if (selectedCondition?.index > -1) {
            onChangeValue(value.map((x, index) => (index === selectedCondition.index ? newValue : x)));
        } else {
            onChangeValue([...value, newValue]);
        }
        hideSelectedCondition();
    };
    return (
        <>
            {selectedCondition && (
                <Modal
                    open
                    onClose={hideSelectedCondition}
                    responsiveWidth
                    withCloseButton
                    title={selectedCondition.index > -1 ? langPage.actions.editTitle : langPage.actions.addTitle}
                >
                    <MedicineParamCondition
                        value={selectedCondition.value}
                        onChangeValue={toEditSave}
                        onCancel={hideSelectedCondition}
                        params={medicineParams || []}
                    />
                </Modal>
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
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <List
                        values={values}
                        sx={{ flexGrow: 5 }}
                    />
                    <IconButton
                        name="add"
                        color="primary"
                        onClick={onAdd}
                    />
                </Box>
            </FormControl>
        </>
    );
}

interface IMedicineParamConditionProps {
    value: IMedicineDiseaseCondition;
    params: IMedicineParam[];
    onChangeValue: (value: IMedicineDiseaseCondition) => void;
    onCancel: () => void;
}
function MedicineParamCondition({ value, params, onChangeValue, onCancel }: IMedicineParamConditionProps) {
    const langPage = lang.components.medicineDisease;
    const [localValue, setLocalValue] = useState<IMedicineDiseaseCondition>(value);
    useEffect(() => {
        setLocalValue(value);
    }, [value]);
    const activeParam = useMemo(() => {
        return params.find((x) => x.id === localValue.paramId);
    }, [localValue.paramId]);
    const onChange = (newValue: any, actionName: "action" | "paramId" | "value") => {
        switch (actionName) {
            case "paramId":
                setLocalValue((prev) => ({ ...prev, paramId: newValue }));
                break;
            case "value":
                setLocalValue((prev) => ({ ...prev, value: newValue }));
                break;
            case "action":
                setLocalValue((prev) => ({ ...prev, action: newValue }));
                break;
        }
    };
    const toEditSave = () => {
        onChangeValue(localValue);
    };

    return (
        <>
            <InputSelect
                values={params.map((x) => ({ id: x.id, title: x.title }))}
                onChangeValue={(v) => onChange(v, "paramId")}
                label={langPage.actions.title}
                value={localValue.paramId}
            />
            <InputSelect
                values={getEnumSelectValues(ComparisonOperatorEnum, "ComparisonOperatorEnum")}
                onChangeValue={(v) => onChange(v, "action")}
                label={langPage.actions.title}
                value={localValue.action}
            />
            {!activeParam ? null : activeParam?.type === MedicineParamsTypeEnum.Boolean ? (
                <InputSelect
                    values={[
                        { id: 0, title: lang.no },
                        { id: 1, title: lang.yes },
                    ]}
                    onChangeValue={(value) => onChange(value, "value")}
                    label={langPage.actions.value}
                    value={localValue.value}
                />
            ) : activeParam?.type === MedicineParamsTypeEnum.Ball ? (
                <Counter
                    onChangeValue={(value) => onChange(value, "value")}
                    label={langPage.actions.value}
                    value={localValue.value}
                    minValue={0}
                    maxValue={5}
                />
            ) : (
                <Counter
                    onChangeValue={(value) => onChange(value, "value")}
                    label={langPage.actions.value}
                    value={localValue.value}
                    minValue={0}
                    maxValue={100}
                />
            )}
            <Box sx={{ textAlign: "right", mt: 1 }}>
                <Button
                    onClick={onCancel}
                    color="inherit"
                >
                    {lang.cancel}
                </Button>
                <Button
                    onClick={toEditSave}
                    disabled={!activeParam}
                >
                    {lang.save}
                </Button>
            </Box>
        </>
    );
}
