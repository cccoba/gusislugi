import { TaxeStatusEnum } from "api/enums/TaxeStatusEnum";
import type { ITaxeDto } from "api/interfaces/user/ITaxeDto";
import { Form } from "components";
import type { TFormField } from "components/Form/FormAdapters";
import lang, { getEnumSelectValues } from "lang";
import { useMemo } from "react";

interface IProps {
    data: ITaxeDto;
    filterTypes?: number;
    onSave: (data: ITaxeDto) => void;
    onCancel: () => void;
}

export default function TaxesEdit({ data, onSave, onCancel, filterTypes }: IProps) {
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
                name: "status",
                title: langPage.fields.status,
                type: "select",
                required: true,
                values: getEnumSelectValues(TaxeStatusEnum, "TaxeStatusEnum"),
                disabled: !data.id,
            },

            {
                name: "uid",
                title: langPage.fields.uid,
                type: "user",
                required: true,
                disabled: true,
            },
            {
                name: "created_at",
                title: langPage.fields.created_at,
                type: "dateTime",
                disabled: true,
                hidden: !data.id,
            },

            {
                name: "endDate",
                title: langPage.fields.endDate,
                type: "dateTime",
                required: true,
            },
        ];
    }, [data.id, filterTypes]);
    return (
        <Form
            values={data}
            fields={fields}
            onSubmit={onSave}
            onCancel={onCancel}
            modalProps={{
                open: true,
                title: data.id ? langPage.editTitle : langPage.addTitle,
                withCloseButton: true,
                responsiveWidth: true,
                onClose: onCancel,
            }}
        />
    );
}
