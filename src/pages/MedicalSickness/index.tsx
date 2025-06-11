import { useMemo } from "react";

import lang from "lang";
import { CRUDAsync } from "components";
import type { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";
import type { ICRUDAsyncAction } from "components/CRUDAsync/Main";

import type { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { medicalSickness } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

import { useAppSelector } from "api/hooks/redux";
import type { IMedicalSicknessDto } from "api/interfaces/user/IMedicalSicknessDto";

interface IProps {
    userId?: number;
}
export default function MedicalSickness({ userId }: IProps) {
    const langPage = lang.pages.medicalSickness;

    const listConfig: ICRUDAsyncListConfig = {
        isMultiSelection: false,
        withRefresh: true,
        orderBy: { direction: SortOrderEnum.Ascending, sort: "title" },
        fields: [
            { name: "id", title: lang.id, width: "30px" },
            { name: "title", title: lang.title },
            {
                name: "public",
                title: langPage.public,
                format: "list",
                formatProps: [
                    { id: true, title: "Да" },
                    { id: false, title: "Нет" },
                ],
            },
            { name: "nickname", title: "", hidden: true },
        ],
    };

    const editConfig: ICRUDAsyncEditConfig = {
        fields: [
            {
                name: "title",
                title: lang.title,
                type: "text",
                required: true,
            },
            {
                name: "description",
                title: lang.description,
                type: "text",
                multiline: true,
            },
            {
                name: "userDescription",
                title: langPage.userDescription,
                type: "html",
            },
            {
                name: "public",
                title: "",
                text: langPage.public,
                type: "switcher",
            },
        ],
    };

    const defInitialData: IMedicalSicknessDto = {
        id: 0,
        title: "",
        description: "",
        userDescription: "",
        public: false,
    };

    const currentUserRoleMedicalSickness = useAppSelector((s) => s.user.user?.role?.params?.medicalSickness);

    const props = useMemo(() => {
        const newProps: {
            actions: ICRUDAsyncAction[];
            initialData: IMedicalSicknessDto;
            listConfig: ICRUDAsyncListConfig;
        } = {
            actions: [
                { name: "getAll", cb: medicalSickness.crudList },
                { name: "save", cb: medicalSickness.crudSave },
                { name: "getRecord", cb: medicalSickness.crudGet },
                { name: "remove", cb: medicalSickness.crudDelete },
            ],
            initialData: { ...defInitialData },
            listConfig: { ...listConfig },
        };

        if (userId) {
            newProps.actions[0].cbArgs = [userId];
            newProps.actions[0].cb = medicalSickness.crudUserList;
            newProps.listConfig.fields = newProps.listConfig.fields.filter((x) => x.name !== "user");
        }
        return newProps;
    }, [userId]);

    return (
        <CRUDAsync
            roles={[["medicalSickness"]]}
            icon="medicine"
            title={langPage.title}
            listConfig={props.listConfig}
            editConfig={editConfig}
            actions={props.actions}
            permissions={currentUserRoleMedicalSickness}
            initialValue={props.initialData}
            withOutPage={!!userId}
        />
    );
}
