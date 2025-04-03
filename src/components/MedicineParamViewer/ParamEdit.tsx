import { MedicineParamsTypeEnum } from "api/enums/MedicineParamsTypeEnum";
import { IMedicineParam } from "api/interfaces/Medicine/IMedicineParam";
import Form, { IFormProps } from "components/Form";
import { TFormField } from "components/Form/FormAdapters";
import Modal from "components/Modal";
import lang from "lang";
import { useMemo } from "react";

interface IProps {
    onChangeValue: (value: string) => void;
    onCancel: () => void;
    param: IMedicineParam;
    value: string;
}

export default function MedicineParamEdit({ onChangeValue, onCancel, param, value }: IProps) {
    const formProps = useMemo<IFormProps>(() => {
        const fields: TFormField[] = [];
        let newValue: any = value;
        switch (param.type) {
            case MedicineParamsTypeEnum.Boolean:
                fields.push({
                    name: "value",
                    title: param.title,
                    type: "switcher",
                    text: lang.yes,
                });
                newValue = value === lang.yes;
                break;
            case MedicineParamsTypeEnum.Ball:
                fields.push({
                    name: "value",
                    title: param.title,
                    type: "counter",
                    minValue: 1,
                    maxValue: 5,
                });
                newValue = parseInt(value);
                break;
            case MedicineParamsTypeEnum.Digital:
                fields.push({
                    name: "value",
                    title: param.title,
                    type: "counter",
                    minValue: parseInt(param.minValue || "0"),
                    maxValue: parseInt(param.maxValue || "100"),
                });
                newValue = parseInt(value);
                break;
        }
        return {
            fields: fields,
            values: {
                value: newValue,
            },
        };
    }, [param, value]);

    const toSave = (data: any) => {
        let newValue = "";
        switch (param.type) {
            case MedicineParamsTypeEnum.Boolean:
                newValue = data.value ? lang.yes : lang.no;
                break;
            case MedicineParamsTypeEnum.Ball:
            case MedicineParamsTypeEnum.Digital:
                newValue = data.value.toString();
                break;
        }
        onChangeValue(newValue);
    };

    return (
        <Modal
            open={true}
            onClose={onCancel}
            title={lang.pages.medicine.params.edit}
            responsiveWidth
            withCloseButton
        >
            <Form
                {...formProps}
                onSubmit={toSave}
                onCancel={onCancel}
            />
        </Modal>
    );
}
