import { TaxeStatusEnum } from "api/enums/TaxeStatusEnum";
import type { ITaxeDto } from "api/interfaces/user/ITaxeDto";
import { Form } from "components";
import type { TFormField } from "components/Form/FormAdapters";
import lang from "lang";
import { useMemo } from "react";

interface IProps {
    data: ITaxeDto;
    filterTypes?: number;
    onSave: (data: any) => void;
    onCancel: () => void;
}

export default function TaxesAdd({ data, onSave, onCancel, filterTypes }: IProps) {
    const langPage = lang.pages.taxes;
    const fields = useMemo<TFormField[]>(() => {
        return [
            {
                name: "title",
                title: langPage.fields.title,
                type: "text",
                required: true,
            },
            {
                name: "value",
                title: langPage.fields.value,
                type: "counter",
                minValue: 1,
                required: true,
                validateFn: (value) => {
                    return (!!value && value > 0) || lang.pages.money.send.errors.positiveCount;
                },
            },
            {
                name: "taxesTypeId",
                title: langPage.fields.taxesTypeId,
                type: "taxesTypes",
                required: true,
                filterTypes,
            },

            {
                name: "uids",
                title: langPage.fields.uids,
                type: "user",
                required: true,
                multiple: true,
            },
            {
                name: "endDate",
                title: langPage.fields.endDate,
                type: "dateTime",
                required: true,
            },
            {
                name: "sendMessage",
                title: "",
                text: langPage.fields.sendMessage,
                type: "switcher",
            },
        ];
    }, [data.id, filterTypes]);
    return (
        <Form
            values={{
                id: 0,
                value: data.value,
                title: data.title,
                uids: [],
                status: TaxeStatusEnum.Active,
                creatorId: 0,
                endDate: data.endDate,
                taxesTypeId: data.taxesTypeId,
                sendMessage: false,
            }}
            fields={fields}
            onSubmit={onSave}
            onCancel={onCancel}
            modalProps={{
                open: true,
                title: langPage.addTitle,
                withCloseButton: true,
                responsiveWidth: true,
                onClose: onCancel,
            }}
        />
    );
}
