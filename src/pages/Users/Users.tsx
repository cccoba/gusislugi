import { useMemo } from "react";

import lang from "lang";
import { GoodTable, Page } from "components";
import useGetData from "store/rtkProvider";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { IUserDto } from "api/interfaces/user/IUserDto";
import { IGoodTableField } from "components/GoodTable";
import { useAppSelector } from "api/hooks/redux";

const langPage = lang.pages.users;
const defFields: IGoodTableField[] = [
    { name: "id", title: langPage.fields.id, width: "10px", format: "number", noSearch: true },
    { name: "image", title: langPage.fields.image, format: "image", noSort: true, width: "50px" },
    { name: "fullName", title: langPage.fields.fullName },
    { name: "nationalityId", title: langPage.fields.nationalityId, format: "list" },
    { name: "citizenshipId", title: langPage.fields.citizenshipId, format: "list" },
    { name: "created_at", title: langPage.fields.created_at, format: "date" },
];

function Users({ roles }: IPageWithRoles) {
    const { data, isLoading } = useGetData<IUserDto[]>("users", []);
    const nationalities = useAppSelector((x) => x.user.nationalities);
    const citizenships = useAppSelector((x) => x.user.citizenships);
    const fields = useMemo(() => {
        const newFields = [...defFields];
        const nationalityId = newFields.find((x) => x.name === "nationalityId");
        if (nationalityId) {
            nationalityId.formatProps = nationalities;
        }
        const citizenshipId = newFields.find((x) => x.name === "citizenshipId");
        if (citizenshipId) {
            citizenshipId.formatProps = citizenships;
        }
        return newFields;
    }, [nationalities, citizenships]);
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
            <GoodTable
                fields={fields}
                values={values}
            />
        </Page>
    );
}
export default Users;
