import { CompanyMoneyTypeEnum } from "api/enums/CompanyMoneyTypeEnum";
import { ICompanyMoneyDto } from "api/interfaces/user/ICompanyMoneyDto";
import { Form, Modal } from "components";
import { ISelectValue } from "components/Inputs/Select";
import lang, { getEnumTitleValue } from "lang";
import { useMemo } from "react";
import { TFormField } from "components/Form/FormAdapters";

interface IProps {
    companyId: number;
    onSave: (data: ICompanyMoneyDto) => void;
    onCancel: () => void;
    withCompanySelector?: boolean;
    withAdd?: boolean;
    withSubtract?: boolean;
}

export default function CompanyMoneyAdd({
    companyId,
    onSave,
    onCancel,
    withAdd,
    withSubtract,
    withCompanySelector,
}: IProps) {
    const langPage = lang.pages.companies;

    const availableTypes = useMemo<ISelectValue[]>(() => {
        const types: ISelectValue[] = [];
        if (withAdd) {
            types.push({
                id: CompanyMoneyTypeEnum.Add,
                title: getEnumTitleValue(CompanyMoneyTypeEnum, "CompanyMoneyTypeEnum", CompanyMoneyTypeEnum.Add),
            });
        }
        if (withSubtract) {
            types.push({
                id: CompanyMoneyTypeEnum.Subtract,
                title: getEnumTitleValue(CompanyMoneyTypeEnum, "CompanyMoneyTypeEnum", CompanyMoneyTypeEnum.Subtract),
            });
        }
        return types;
    }, [withAdd, withSubtract]);
    const fields = useMemo<TFormField[]>(() => {
        const newFields: TFormField[] = [
            {
                name: "money",
                title: langPage.money,
                type: "counter",
                minValue: 0,
                required: true,
            },
            {
                name: "type",
                title: lang.type,
                type: "select",
                values: availableTypes,
            },
            {
                name: "message",
                title: lang.description,
                type: "text",
                multiline: true,
            },
        ];
        if (withCompanySelector) {
            newFields.unshift({
                name: "companyId",
                title: langPage.company,
                type: "company",
                required: true,
            });
        }
        return newFields;
    }, [withCompanySelector]);
    return (
        <Modal
            open
            onClose={onCancel}
            title={langPage.addMoney}
            withCloseButton
            responsiveWidth
        >
            <Form
                values={{
                    companyId,
                    message: "",
                    type: availableTypes?.[0]?.id,
                    value: 0,
                }}
                fields={fields}
                onCancel={onCancel}
                onSubmit={onSave}
            />
        </Modal>
    );
}
