import { useMemo, useRef, useState } from "react";
import { Box } from "@mui/material";

import { MedicineParamsTypeEnum } from "api/enums/MedicineParamsTypeEnum";
import { IMedicineParam } from "api/interfaces/Medicine/IMedicineParam";

import lang from "lang";
import InputSelect from "components/Inputs/InputSelect/InputSelect";
import Select, { ISelectValue } from "components/Inputs/Select";
import Counter from "components/Inputs/Counter";
import Fieldset from "components/Fieldset";
export interface IMedicineDiseaseParamAction {
    paramId: number;
    value: number;
    action: "add" | "minus" | "equal";
}
interface IMedicineDiseaseParamActionProps {
    action: IMedicineDiseaseParamAction;
    params: IMedicineParam[];
    index: number;
    onChangeValue: (value: IMedicineDiseaseParamAction, index: number) => void;
}
export default function MedicineParamsAction({
    params,
    action,
    index,
    onChangeValue,
}: IMedicineDiseaseParamActionProps) {
    const langPage = lang.components.medicineDisease;
    const actions = useRef<ISelectValue[]>([
        { id: "add", title: langPage.actions.add },
        { id: "minus", title: langPage.actions.minus },
        { id: "equal", title: langPage.actions.equal },
    ]);
    const [actionList, setActionList] = useState<ISelectValue[]>(actions.current);
    const activeParam = useMemo(() => {
        return params.find((x) => x.id === action.paramId);
    }, [action.paramId]);

    const toChangeParamId = (paramId: number) => {
        const param = params.find((x) => x.id === paramId);
        if (param) {
            let newActions = actions.current;
            switch (param.type) {
                case MedicineParamsTypeEnum.Boolean:
                    newActions = newActions.filter((x) => x.id === "equal");
                    break;
            }
            onChangeValue({ value: 1, paramId: paramId, action: "equal" }, index);
            setActionList(newActions);
        }
    };
    const toChangeAction = (newAction: IMedicineDiseaseParamAction["action"]) => {
        onChangeValue({ ...action, action: newAction }, index);
    };
    const toChangeValue = (value: number) => {
        onChangeValue({ ...action, value: value }, index);
    };

    return (
        <Fieldset
            label={`${langPage.param} #${1 + index}${activeParam ? ` ( ${activeParam.title} )` : ""}`}
            variant="accordion"
            accordionProps={{ defaultHide: true }}
        >
            <InputSelect
                values={params.map((x) => ({ title: x.title, id: x.id }))}
                onChangeValue={toChangeParamId}
                label={lang.pages.medicine.params.param}
                value={action.paramId}
            />
            <Box display="flex">
                <Select
                    values={actionList}
                    onChangeValue={toChangeAction}
                    label={langPage.actions.title}
                    value={action.action}
                />
                {!activeParam ? null : activeParam?.type === MedicineParamsTypeEnum.Boolean ? (
                    <Select
                        values={[
                            { id: 0, title: lang.no },
                            { id: 1, title: lang.yes },
                        ]}
                        onChangeValue={toChangeValue}
                        label={langPage.actions.value}
                        value={action.value}
                    />
                ) : activeParam?.type === MedicineParamsTypeEnum.Ball ? (
                    <Counter
                        onChangeValue={toChangeValue}
                        label={langPage.actions.value}
                        value={action.value}
                        minValue={0}
                        maxValue={5}
                    />
                ) : (
                    <Counter
                        onChangeValue={toChangeValue}
                        label={langPage.actions.value}
                        value={action.value}
                        minValue={0}
                        maxValue={100}
                    />
                )}
            </Box>
        </Fieldset>
    );
}
