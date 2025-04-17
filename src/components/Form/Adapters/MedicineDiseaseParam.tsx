import { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

import { IMedicineParam } from "api/interfaces/Medicine/IMedicineParam";

import lang from "lang";
import IconButton from "components/Icon/IconButton";
import InputTimeDuration from "components/Inputs/InputTimeDuration";
import MedicineParamsAction, { IMedicineDiseaseParamAction } from "components/Inputs/MedicineParamsAction";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldMedicineDiseaseParam extends IFormField {
    type: "medicineDiseaseParam";
    params: IMedicineParam[];
}
interface IMedicineDiseaseParam {
    description: string;
    actions: IMedicineDiseaseParamAction[];
    paramTimer: number;
    maxParamTimer: number;
}
interface IMedicineDiseaseParamFormAdapterInputProps extends IFormAdapterInputProps {
    value: IMedicineDiseaseParam;
    onChangeValue: (value: IMedicineDiseaseParam) => void;
}
const MedicineDiseaseParamAdapter: IFormAdapter = {
    name: "medicineDiseaseParam",
    input: FormInput,
    validate: (v, required) => {
        if (required) {
            if (!v?.description) {
                return lang.components.form.isRequired;
            }
            return !!v.actions?.length;
        }
        return true;
    },
};

function FormInput({
    value,
    fieldParams,
    fieldProps,
    label,
    onChangeValue,
    ...props
}: IMedicineDiseaseParamFormAdapterInputProps) {
    const [description, setDescription] = useState(value?.description || "");
    const [actions, setActions] = useState<IMedicineDiseaseParamAction[]>(value?.actions || []);
    const [paramTimer, setParamTimer] = useState(value?.paramTimer || 0);
    const [maxParamTimer, setMaxParamTimer] = useState(value?.maxParamTimer || 0);
    useEffect(() => {
        setDescription(value?.description || "");
    }, [value?.description]);
    useEffect(() => {
        setActions(value?.actions || []);
    }, [value?.actions]);
    useEffect(() => {
        setParamTimer(value?.paramTimer || 0);
    }, [value?.paramTimer]);
    useEffect(() => {
        setMaxParamTimer(value?.maxParamTimer || 0);
    }, [value?.maxParamTimer]);
    const defAction: IMedicineDiseaseParamAction = {
        paramId: 0,
        value: 0,
        action: "equal",
    };

    const toChangeValue = (data: any, type: "description" | "actions" | "paramTimer" | "maxParamTimer") => {
        switch (type) {
            case "description":
                setDescription(data);
                onChangeValue({ description: data, actions, paramTimer, maxParamTimer });
                break;
            case "actions":
                setActions(data);
                onChangeValue({ description, actions: data, paramTimer, maxParamTimer });
                break;
            case "paramTimer":
                setParamTimer(data);
                onChangeValue({ description, actions, paramTimer: data, maxParamTimer });
                break;
            case "maxParamTimer":
                setMaxParamTimer(data);
                onChangeValue({ description, actions, paramTimer, maxParamTimer: data });
                break;
        }
    };
    const toActionChange = (action: IMedicineDiseaseParamAction, index: number) => {
        const newActions = [...actions];
        if (newActions?.[index]) {
            newActions[index] = action;
        } else {
            newActions.push(action);
        }
        toChangeValue(newActions, "actions");
    };
    const toAddAction = () => {
        setActions([...actions, defAction]);
    };
    const toChangeParamTimer = (data: number) => {
        setParamTimer(data);
        toChangeValue(data, "paramTimer");
    };
    const toChangeMaxParamTimer = (data: number) => {
        setMaxParamTimer(data);
        toChangeValue(data, "maxParamTimer");
    };

    return (
        <>
            {!!label && (
                <Typography variant="caption">
                    {label}
                    {props?.required && "*"}
                </Typography>
            )}
            <Box>
                <Box textAlign="right">
                    <IconButton
                        name="add"
                        onClick={toAddAction}
                    />
                </Box>
                {actions.map((x, index) => (
                    <MedicineParamsAction
                        key={index}
                        action={x}
                        index={index}
                        onChangeValue={toActionChange}
                        params={fieldParams?.params || []}
                    />
                ))}
            </Box>
            <InputTimeDuration
                value={paramTimer}
                onChangeValue={toChangeParamTimer}
                label={lang.components.medicineDisease.paramTimer}
                helperText={lang.components.medicineDisease.paramTimerHelperText}
                withOutDays
            />
            <InputTimeDuration
                value={maxParamTimer}
                onChangeValue={toChangeMaxParamTimer}
                label={lang.components.medicineDisease.maxParamTimer}
                withOutDays
            />
            <TextField
                {...props}
                {...fieldProps}
                onChange={(e: any) => toChangeValue(e.target.value, "description")}
                value={description}
                multiline
                label={lang.description}
            />
        </>
    );
}

export default MedicineDiseaseParamAdapter;
