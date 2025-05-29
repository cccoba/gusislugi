import { useMemo } from "react";

import { CompanyMoneyTypeEnum } from "api/enums/CompanyMoneyTypeEnum";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { type ICompanyMoneyDto } from "api/interfaces/user/ICompanyMoneyDto";

import { GoodTable } from "components";
import { type IGoodTableProps } from "components/GoodTable";
import lang, { getEnumSelectValues, sprintf } from "lang";

interface IProps {
    data: ICompanyMoneyDto[];
    withDetails?: boolean;
    withAdd?: boolean;
    onAddClick?: () => void;
}

export default function CompanyMoneyHistory({ data, withDetails = false, withAdd, onAddClick }: IProps) {
    const langPage = lang.pages.companies;
    const values = useMemo(() => {
        return data.map((x) => ({
            ...x,
            valueTitle: `${x.type === CompanyMoneyTypeEnum.Add ? "+" : "-"}${sprintf(lang.money, x.value)}`,
            creatorName: x.creator?.firstName ?? "",
        }));
    }, [data]);
    const tableProps = useMemo<Omit<IGoodTableProps<ICompanyMoneyDto>, "values">>(() => {
        const newTableProps: Omit<IGoodTableProps<ICompanyMoneyDto>, "values"> = {
            order: { sort: "created_at", direction: SortOrderEnum.Descending },
            fields: [
                {
                    name: "created_at",
                    title: langPage.transactionDate,
                    format: "date",
                },
                {
                    name: "valueTitle",
                    title: langPage.money,
                    format: "number",
                },
                {
                    name: "type",
                    title: lang.type,
                    format: "list",
                    formatProps: getEnumSelectValues(CompanyMoneyTypeEnum, "CompanyMoneyTypeEnum"),
                },
            ],
            actions: [],
        };
        if (withDetails) {
            newTableProps.fields.push({
                name: "creatorName",
                title: langPage.creatorId,
                format: "text",
            });
        }
        if (withAdd && onAddClick) {
            newTableProps?.actions?.push({
                name: "add",
                icon: "add",
                onClick: onAddClick,
            });
        }
        return newTableProps;
    }, [withDetails, withAdd]);
    return (
        <GoodTable
            {...tableProps}
            values={values}
        />
    );
}
