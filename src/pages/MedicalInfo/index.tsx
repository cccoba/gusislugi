import { useMemo, useState, Fragment } from "react";

import lang, { getEnumSelectValues } from "lang";
import { CRUDAsync } from "components";
import type { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";
import type { ICRUDAsyncAction } from "components/CRUDAsync/Main";
import type { ICRUDAsyncListConfig } from "components/CRUDAsync/List";

import { medicalInfo } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import type { IMedicalInfoDto } from "api/interfaces/user/IMedicalInfoDto";
import { useAppSelector } from "api/hooks/redux";
import { cutText } from "api/common/helper";
import { MedicalInfoStatusEnum } from "api/enums/MedicalInfoStatusEnum";

import MedicalInfoAdd from "./Add";

interface IProps {
    userId?: number;
}

export default function MedicalInfo({ userId }: IProps) {
    const langPage = lang.pages.medicalInfo;
    const [id, setId] = useState(0);
    const listConfig: ICRUDAsyncListConfig = {
        isMultiSelection: false,
        withRefresh: true,
        orderBy: { direction: SortOrderEnum.Descending, sort: "id" },
        fields: [
            { name: "id", title: lang.id, width: "30px" },

            {
                name: "medicalSicknessName",
                title: langPage.fields.medicalSickness,
            },

            { name: "userName", title: langPage.fields.uid },
            {
                name: "status",
                title: lang.status,
                format: "list",
                formatProps: getEnumSelectValues(MedicalInfoStatusEnum, "MedicalInfoStatusEnum"),
            },
            { name: "created_at", title: lang.created_at, format: "date" },
            { name: "updated_at", title: lang.updated_at, format: "date" },
            { name: "nickname", title: "", hidden: true },
        ],
        transform: (data: IMedicalInfoDto) => ({
            ...data,
            userName: data.user?.firstName || lang.unknown,
            nickname: data.user?.nickname || "",
            medicalSicknessName: cutText(data.medicalSickness?.title || "", 30),
        }),
    };

    const editConfig: ICRUDAsyncEditConfig = {
        fields: [
            {
                name: "medicalSicknessId",
                title: langPage.fields.medicalSickness,
                type: "medicalSickness",
                required: true,
                disabled: true,
            },
            {
                name: "uid",
                title: langPage.fields.uid,
                type: "user",
                required: true,
                disabled: true,
            },

            {
                name: "created_at",
                title: langPage.fields.created_at,
                type: "dateTime",
                disabled: true,
            },
            {
                name: "updated_at",
                title: lang.updated_at,
                type: "dateTime",
                disabled: true,
            },
            {
                name: "creatorId",
                title: lang.creator,
                type: "user",
                disabled: true,
            },
            {
                name: "status",
                title: lang.status,
                type: "select",
                values: getEnumSelectValues(MedicalInfoStatusEnum, "MedicalInfoStatusEnum"),
            },
            {
                name: "comments",
                title: lang.comments,
                type: "text",
                multiline: true,
            },
        ],
    };
    const currentUserRolePermissions = useAppSelector((s) => s.user.user?.role?.params?.medicalInfo);
    const props = useMemo(() => {
        const newProps: {
            actions: ICRUDAsyncAction[];
            listConfig: ICRUDAsyncListConfig;
        } = {
            actions: [
                { name: "getAll", cb: medicalInfo.crudList },
                { name: "save", cb: medicalInfo.crudSave },
                { name: "getRecord", cb: medicalInfo.crudGet },
                { name: "remove", cb: medicalInfo.crudDelete },
            ],
            listConfig: { ...listConfig },
        };

        if (userId) {
            newProps.actions[0].cbArgs = [userId];
            newProps.actions[0].cb = medicalInfo.crudUserList;
            newProps.listConfig.fields = newProps.listConfig.fields.filter((x) => x.name !== "userName");
        }
        return newProps;
    }, [userId]);

    const toUpdate = () => {
        setId((prev) => prev + 1);
    };

    return (
        <Fragment key={id}>
            <MedicalInfoAdd needRefresh={toUpdate} />
            <CRUDAsync
                roles={[["medicalInfo"]]}
                icon="medicalInfo"
                title={langPage.title}
                listConfig={props.listConfig}
                editConfig={editConfig}
                actions={props.actions}
                permissions={currentUserRolePermissions}
                withOutPage={!!userId}
            />
        </Fragment>
    );
}
