import { ICompanyDto } from "api/interfaces/user/ICompanyDto";
import { GoodTable } from "components";
import { IGoodTableToolbarAction } from "components/GoodTable";
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
            addUserName: x.addUser?.firstName || lang.no,
            deputyUserName: x.deputyUser?.firstName || lang.no,
            nickname: x.addUser?.nickname || "",
        }));
    }, [data]);
    return (
        <GoodTable<ICompanyDto>
            values={values}
            fields={[
                {
                    name: "title",
                    title: lang.title,
                },
                {
                    name: "money",
                    title: langPage.money,
                },
                {
                    name: "addUserName",
                    title: langPage.addUserId,
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
        />
    );
}
