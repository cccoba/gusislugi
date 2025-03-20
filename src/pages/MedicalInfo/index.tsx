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
import { useMemo } from "react";
import { ICRUDAsyncAction } from "components/CRUDAsync/Main";
import { title } from "process";
import { cutText } from "api/common/helper";

const langPage = lang.pages.medicalInfo;

const listConfig: ICRUDAsyncListConfig = {
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
        title: cutText(data.title, 30),
    }),
};

const editConfig: ICRUDAsyncEditConfig = {
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

const defInitialData: IMedicalInfoDto = {
    id: 0,
    title: "",
    uid: 0,
    status: true,
    endDate: dayjs().add(24, "hour").toDate(),
};
interface IProps {
    userId?: number;
}

function MedicalInfo({ userId }: IProps) {
    const currentUserRolePermissions = useAppSelector((s) => s.user.user?.role?.params?.medicalInfo);
    const props = useMemo(() => {
        const newProps: {
            actions: ICRUDAsyncAction[];
            initialData: IMedicalInfoDto;
            listConfig: ICRUDAsyncListConfig;
        } = {
            actions: [
                { name: "getAll", cb: medicalInfo.crudList },
                { name: "save", cb: medicalInfo.crudSave },
                { name: "getRecord", cb: medicalInfo.crudGet },
                { name: "remove", cb: medicalInfo.crudDelete },
            ],
            initialData: { ...defInitialData },
            listConfig: { ...listConfig },
        };

        if (userId) {
            newProps.actions[0].cbArgs = [userId];
            newProps.actions[0].cb = medicalInfo.crudUserList;
            newProps.initialData.uid = userId;
            newProps.listConfig.fields = newProps.listConfig.fields.filter((x) => x.name !== "user");
        }
        return newProps;
    }, [userId]);

    return (
        <>
            <CRUDAsync
                backUrl="/medicalInfo"
                roles={[["medicalInfo"]]}
                icon="medicalInfo"
                title={langPage.title}
                listConfig={props.listConfig}
                editConfig={editConfig}
                actions={props.actions}
                initialValue={props.initialData}
                permissions={currentUserRolePermissions}
                withOutPage={!!userId}
            />
        </>
    );
}

export default MedicalInfo;
