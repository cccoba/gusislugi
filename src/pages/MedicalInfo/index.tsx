import dayjs from "dayjs";

import lang from "lang";
import { CRUDAsync } from "components";
import { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { medicalInfo } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { IMedicalInfoDto } from "api/interfaces/user/IMedicalInfoDto";
import { useAppSelector } from "api/hooks/redux";

const langPage = lang.pages.medicalInfo;

export const medicalInfoListConfig: ICRUDAsyncListConfig = {
    isMultiSelection: false,
    withRefresh: true,
    orderBy: { direction: SortOrderEnum.Descending, sort: "id" },
    fields: [
        { name: "id", title: langPage.fields.id, width: "30px" },
        {
            name: "title",
            title: langPage.fields.title,
        },
        { name: "status", title: langPage.fields.status },
        { name: "user", title: langPage.fields.uid },
        { name: "endDate", title: langPage.fields.endDate, format: "date" },
        { name: "nickname", title: "", hidden: true },
    ],
    transform: (data: IMedicalInfoDto) => ({
        ...data,
        status: data.status ? langPage.statusActive : langPage.statusNotActive,
        user: data.user?.firstName || lang.unknown,
        nickname: data.user?.nickname || "",
    }),
};

export const medicalInfoEditConfig: ICRUDAsyncEditConfig = {
    fields: [
        {
            name: "title",
            title: langPage.fields.title,
            type: "text",
            required: true,
        },
        {
            name: "status",
            title: "",
            text: langPage.fields.status,
            type: "switcher",
        },
        {
            name: "uid",
            title: langPage.fields.uid,
            type: "user",
            required: true,
        },
        {
            name: "created_at",
            title: langPage.fields.created_at,
            type: "dateTime",
            disabled: true,
        },
        {
            name: "endDate",
            title: langPage.fields.endDate,
            type: "dateTime",
        },
    ],
};

function MedicalInfo({ roles, icon }: IPageWithRoles) {
    const currentUserRolePermissions = useAppSelector((s) => s.user.user?.role?.params?.medicalInfo);
    return (
        <>
            <CRUDAsync
                backUrl="/medicalInfo"
                roles={roles}
                title={langPage.title}
                icon={icon}
                listConfig={medicalInfoListConfig}
                editConfig={medicalInfoEditConfig}
                actions={[
                    { name: "save", cb: medicalInfo.crudSave },
                    { name: "edit", cb: medicalInfo.crudGet },
                    { name: "delete", cb: medicalInfo.crudDelete },
                    { name: "list", cb: medicalInfo.crudList },
                ]}
                initialValue={{
                    id: 0,
                    title: "",
                    uid: 0,
                    status: true,
                    endDate: dayjs().add(24, "hour").toDate(),
                }}
                permissions={currentUserRolePermissions}
            />
        </>
    );
}

export default MedicalInfo;
