import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

import lang from "lang";
import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import IconButton from "components/Icon/IconButton";
import Select from "components/Inputs/Select";
import { IMedicineParam } from "api/interfaces/Medicine/IMedicineParam";

export interface IFormFieldMedicineDiseaseParam extends IFormField {
    type: "medicineDiseaseParam";
    params: IMedicineParam[];
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
interface IMedicineDiseaseParamAction {
    paramId: number;
    value: string;
    action: string;
}
interface IMedicineDiseaseParam {
    description: string;
    actions: IMedicineDiseaseParamAction[];
}
interface IMedicineDiseaseParamFormAdapterInputProps extends IFormAdapterInputProps {
    value: IMedicineDiseaseParam;
    onChangeValue: (value: IMedicineDiseaseParam) => void;
}

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
    useEffect(() => {
        setDescription(value?.description || "");
    }, [value]);
    useEffect(() => {
        onChangeValue({ actions, description });
    }, [description, actions]);
    const defAction: IMedicineDiseaseParamAction = {
        paramId: 0,
        value: "",
        action: "",
    };

    const toChangeValue = (data: any, type: "description" | "actions") => {
        if (type === "description") {
            setDescription(data);
        }
        if (type === "actions") {
            //setActions(data);
        }
    };
    const toActionChange = (action: IMedicineDiseaseParamAction, index: number) => {
        console.log("toActionChange", action, index);
    };
    const toAddAction = () => {
        setActions([...actions, defAction]);
    };

    return (
        <>
            {!!label && (
                <Typography variant="button">
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
                    <MedicineDiseaseParamAction
                        key={index}
                        action={x}
                        index={index}
                        onChangeValue={toActionChange}
                        params={fieldParams?.params || []}
                    />
                ))}
            </Box>
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
interface IMedicineDiseaseParamActionProps {
    action: IMedicineDiseaseParamAction;
    params: IMedicineParam[];
    index: number;
    onChangeValue: (value: IMedicineDiseaseParamAction, index: number) => void;
}
function MedicineDiseaseParamAction({ params, action, index, onChangeValue }: IMedicineDiseaseParamActionProps) {
    const toChangeParamId = (paramId: number) => {
        onChangeValue({ ...action, paramId }, index);
    };
    return (
        <Box>
            <Select
                type="select"
                values={params.map((x) => ({ title: x.title, id: x.id }))}
                onChangeValue={toChangeParamId}
                label={lang.pages.medicine.params.param}
                value={action.paramId}
            />
        </Box>
    );
}
export default MedicineDiseaseParamAdapter;
