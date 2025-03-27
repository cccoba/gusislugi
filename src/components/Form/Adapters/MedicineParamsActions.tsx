import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { IMedicineParam } from "api/interfaces/Medicine/IMedicineParam";

import IconButton from "components/Icon/IconButton";

import MedicineParamsAction, { IMedicineDiseaseParamAction } from "components/Inputs/MedicineParamsAction";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldMedicineParamsActions extends IFormField {
    type: "medicineParamsActions";
    params: IMedicineParam[];
}

const MedicineParamsActionsAdapter: IFormAdapter = {
    name: "medicineParamsActions",
    input: FormInput,
    validate: (v, required) => {
        if (required) {
            return !!v.length;
        }
        return true;
    },
};

interface IMedicineDiseaseParamFormAdapterInputProps extends IFormAdapterInputProps {
    value: IMedicineDiseaseParamAction[];
    onChangeValue: (value: IMedicineDiseaseParamAction[]) => void;
}

function FormInput({
    value,
    fieldParams,
    fieldProps,
    label,
    onChangeValue,
    ...props
}: IMedicineDiseaseParamFormAdapterInputProps) {
    const [actions, setActions] = useState<IMedicineDiseaseParamAction[]>(value || []);
    useEffect(() => {
        setActions(value || []);
    }, [value]);

    const defAction: IMedicineDiseaseParamAction = {
        paramId: 0,
        value: 0,
        action: "equal",
    };

    const toChangeValue = (data: any) => {
        setActions(data);
        onChangeValue(data);
    };
    const toActionChange = (action: IMedicineDiseaseParamAction, index: number) => {
        const newActions = [...actions];
        if (newActions?.[index]) {
            newActions[index] = action;
        } else {
            newActions.push(action);
        }
        toChangeValue(newActions);
    };
    const toAddAction = () => {
        setActions([...actions, defAction]);
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
        </>
    );
}

export default MedicineParamsActionsAdapter;
