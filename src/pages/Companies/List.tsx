import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import type { ICompanyDto } from "api/interfaces/user/ICompanyDto";
import { GoodTable, type IGoodTableToolbarAction } from "components";
import lang from "lang";
import { useMemo } from "react";

interface IProps {
    data: ICompanyDto[];
    onRowClick?: (data: ICompanyDto) => void;
    onRowDoubleClick?: (data: ICompanyDto) => void;
    actions: IGoodTableToolbarAction<ICompanyDto>[];
}

export default function CompanyList({ data, onRowClick, onRowDoubleClick, actions }: IProps) {
    const langPage = lang.pages.companies;
    const values = useMemo(() => {
        if (!data?.length) {
            return [];
        }
        return data?.map((x) => ({
            ...x,
            userName: x.user?.firstName || lang.no,
            deputyUserName: x.deputyUser?.firstName || lang.no,
            nickname: x.user?.nickname || "",
        }));
    }, [data]);
    return (
        <GoodTable<ICompanyDto>
            values={values}
            fields={[
                {
                    name: "id",
                    title: lang.id,
                    format: "number",
                },
                {
                    name: "title",
                    title: lang.title,
                    wrap: true,
                },
                {
                    name: "money",
                    title: langPage.money,
                },
                {
                    name: "userName",
                    title: langPage.userId,
                    wrap: true,
                },
                {
                    name: "deputyUserName",
                    title: langPage.deputyUserId,
                },
                {
                    name: "created_at",
                    title: lang.created_at,
                    format: "date",
                },
                { name: "nickname", title: "", hidden: true },
            ]}
            actions={actions}
            onRowClick={onRowClick}
            onRowDoubleClick={onRowDoubleClick}
            order={{ direction: SortOrderEnum.Descending, sort: "id" }}
            mobileBottomAction={false}
        />
    );
}
