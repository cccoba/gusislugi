import { useMemo } from "react";

import lang from "lang";
import { Page, Table } from "components";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { SortOrderEnum } from "api/enums/SortOrderEnum";
import useGetData from "store/rtkProvider";
import { IUserDto } from "api/interfaces/user/IUserDto";
import { ITableField } from "components/Table";

const langPage = lang.pages.users;
const fields: ITableField[] = [
    { name: "id", title: langPage.fields.id, width: "50px" },
    { name: "image", title: langPage.fields.image, format: "image", noSort: true, width: "50px" },
    { name: "fullName", title: langPage.fields.fullName },
];
function Users({ roles }: IPageWithRoles) {
    const { data, isLoading } = useGetData<IUserDto[]>("users", []);
    const values = useMemo(() => {
        if (data?.length) {
            return data;
        }
        return [];
    }, [data]);
    const toSelectRow = (data: any) => {
        console.log("toSelectRow", data);
    };
    return (
        <Page
            title={langPage.title}
            icon="group"
            roles={roles}
            isLoading={isLoading}
        >
            <Table
                order={{ direction: SortOrderEnum.Ascending, sort: "fullName" }}
                fields={fields}
                values={values}
                isMultiSelection={false}
                onSelect={toSelectRow}
            />
        </Page>
    );
}
export default Users;
