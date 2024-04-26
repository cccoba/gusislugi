import { useState } from "react";

import lang, { getEnumSelectValues, sprintf } from "lang";
import { CRUDAsync } from "components";
import { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";
import SendUserNotification, { ISendUserNotificationProps } from "components/SendUserNotification";
import { TCRUDAsyncActionCb } from "components/CRUDAsync/Main";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { wanteds } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { IMedicalPoliciesDto } from "api/interfaces/user/IMedicalPoliciesDto";
import { useAppSelector } from "api/hooks/redux";
import { IWantedDto } from "api/interfaces/user/IWantedDto";
import { WantedTypeEnum } from "api/enums/WantedTypeEnum";

const langPage = lang.pages.wanteds;

const listConfig: ICRUDAsyncListConfig = {
    isMultiSelection: false,
    orderBy: { direction: SortOrderEnum.Descending, sort: "id" },
    fields: [
        { name: "id", title: langPage.fields.id, width: "30px" },
        { name: "image", title: langPage.fields.image, width: "30px", format: "image" },
        { name: "user", title: langPage.fields.uid },
        {
            name: "type",
            title: langPage.fields.type,
            format: "list",
            formatProps: getEnumSelectValues(WantedTypeEnum, "WantedTypeEnum"),
        },
        { name: "status", title: langPage.fields.status },
        { name: "created_at", title: langPage.fields.created_at, format: "date" },
    ],
    transform: (data: IMedicalPoliciesDto) => ({
        ...data,
        user: data.user?.firstName || lang.unknown,
        image: data.user?.image || "",
        status: data.status ? langPage.statusActive : langPage.statusNotActive,
    }),
};

const editConfig: ICRUDAsyncEditConfig = {
    fields: [
        {
            name: "uid",
            title: langPage.fields.uid,
            type: "user",
            required: true,
        },
        {
            name: "type",
            title: langPage.fields.type,
            type: "select",
            required: true,
            values: getEnumSelectValues(WantedTypeEnum, "WantedTypeEnum"),
        },
        {
            name: "status",
            title: langPage.fields.status,
            text: langPage.statusActive,
            type: "switcher",
        },
        {
            name: "description",
            title: langPage.fields.description,
            type: "text",
            required: true,
            fieldProps: { multiline: true },
        },
        {
            name: "created_at",
            title: langPage.fields.created_at,
            type: "dateTime",
            disabled: true,
        },
    ],
};

function Wanteds({ roles, icon, backUrl }: IPageWithRoles) {
    const currentUserRoleParams = useAppSelector((s) => s.user.user?.role?.params?.wanteds);
    const [notificationData, setNotificationData] = useState<null | ISendUserNotificationProps>(null);
    const onSaveStart: TCRUDAsyncActionCb = async (data: IWantedDto) => {
        return new Promise((resolve, reject) => {
            wanteds.crudSave(data).then(resolve).catch(reject);
            setNotificationData({
                uid: data.uid,
                title: langPage.message.title,
                text: sprintf(langPage.message.text, data.status ? langPage.statusActive : langPage.statusNotActive),
            });
        });
    };
    const hideNotificationData = () => {
        setNotificationData(null);
    };
    return (
        <>
            {!!notificationData && (
                <SendUserNotification
                    {...notificationData}
                    onClose={hideNotificationData}
                />
            )}
            <CRUDAsync
                backUrl={backUrl || "/"}
                roles={roles}
                title={langPage.title}
                icon={icon}
                listConfig={listConfig}
                editConfig={editConfig}
                actions={[
                    { name: "list", cb: wanteds.crudList },
                    { name: "delete", cb: wanteds.crudDelete },
                    { name: "edit", cb: wanteds.crudGet },
                    { name: "save", cb: onSaveStart },
                ]}
                permissions={currentUserRoleParams}
                initialValue={{
                    id: 0,
                    uid: 0,
                    status: true,
                    hidden: false,
                    type: WantedTypeEnum.Minima,
                    description: "",
                }}
            />
        </>
    );
}

export default Wanteds;
