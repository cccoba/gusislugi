import { CompanyMoneyTypeEnum } from "api/enums/CompanyMoneyTypeEnum";
import { ICompanyDto } from "api/interfaces/user/ICompanyDto";
import { ICompanyMoneyDto } from "api/interfaces/user/ICompanyMoneyDto";
import { Form, Modal } from "components";
import { ISelectValue } from "components/Inputs/Select";
import lang, { getEnumTitleValue } from "lang";
import { useMemo } from "react";

interface IProps {
    company: ICompanyDto;
    onSave: (data: ICompanyMoneyDto) => void;
    onCancel: () => void;
    withAdd?: boolean;
    withSubtract?: boolean;
}

export default function CompanyMoneyAdd({ company, onSave, onCancel, withAdd, withSubtract }: IProps) {
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
                    companyId: company.id,
                    message: "",
                    type: availableTypes?.[0]?.id,
                    value: 0,
                }}
                fields={[
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
                ]}
                onCancel={onCancel}
                onSubmit={onSave}
            />
        </Modal>
    );
}
