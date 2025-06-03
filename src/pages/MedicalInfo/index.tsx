import { title } from "process";

import dayjs from "dayjs";

import lang, { getEnumSelectValues } from "lang";
import { CRUDAsync } from "components";
import type { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import type { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { medicalInfo } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import type { IMedicalInfoDto } from "api/interfaces/user/IMedicalInfoDto";
import { useAppSelector } from "api/hooks/redux";
import { useMemo } from "react";
import type { ICRUDAsyncAction } from "components/CRUDAsync/Main";
import { cutText } from "api/common/helper";
import { MedicalInfoStatusEnum } from "api/enums/MedicalInfoStatusEnum";

interface IProps {
    userId?: number;
}

export default function MedicalInfo({ userId }: IProps) {
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
            medicalSicknessName: cutText(data.medicalSickness?.title || "", 30),
        }),
    };

    const editConfig: ICRUDAsyncEditConfig = {
        fields: [
            {
                name: "medicalSicknessName",
                title: langPage.fields.title,
                type: "select",
                required: true,
                values: [],
            },
            {
                name: "status",
                title: langPage.fields.status,
                type: "select",
                values: getEnumSelectValues(MedicalInfoStatusEnum, "MedicalInfoStatusEnum"),
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
        medicalSicknessesId: 0,
        uid: 0,
        status: MedicalInfoStatusEnum.Active,
        endDate: dayjs().add(24, "hour").toDate(),
    };
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
