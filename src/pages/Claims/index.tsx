import { useState } from "react";

import lang, { getEnumTitleValue, sprintf } from "lang";
import { CRUD } from "components";
import { ICRUDAction, TCRUDActionCb } from "components/CRUDAsync";
import SendUserNotification, { ISendUserNotificationProps } from "components/SendUserNotification";
import { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { claims } from "api/data";
import { IClaimDto } from "api/interfaces/user/IClaimDto";
import { ClaimStatusEnum } from "api/enums/ClaimStatusEnum";
import { getEnumSelectValues } from "api/common/enumHelper";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

const langPage = lang.pages.claims;

const listConfig: ICRUDAsyncListConfig = {
    isMultiselection: true,
    orderBy: { direction: SortOrderEnum.Descending, sort: "id" },
    fields: [
        { name: "id", title: langPage.fields.id },
        { name: "title", title: langPage.fields.title },
        { name: "status", title: langPage.fields.status },
        { name: "created_at", title: langPage.fields.created_at, format: "date" },
        { name: "user", title: langPage.fields.uid },
    ],
    transform: (data: IClaimDto) => ({
        ...data,
        status: getEnumTitleValue(ClaimStatusEnum, "ClaimStatusEnum", data.status),
        user: data.user?.fullName || lang.unknown,
    }),
};

const editConfig: ICRUDAsyncEditConfig = {
    fields: [
        { name: "id", title: langPage.fields.id, type: "text", disabled: true },
        { name: "title", title: langPage.fields.title, type: "text", required: true },
        {
            name: "status",
            title: langPage.fields.status,
            type: "select",
            required: true,
            values: getEnumSelectValues(ClaimStatusEnum, "ClaimStatusEnum"),
        },
        {
            name: "uid",
            title: langPage.fields.uid,
            type: "user",
            required: true,
        },
        {
            name: "description",
            title: langPage.fields.description,
            type: "text",
            required: true,
            fieldProps: { multiline: true },
        },
        { name: "resolution", title: langPage.fields.resolution, type: "text", fieldProps: { multiline: true } },
    ],
};

function Claims({ roles }: IPageWithRoles) {
    const [notificationData, setNotificationData] = useState<null | ISendUserNotificationProps>(null);
    const onSaveStart: TCRUDActionCb = async (data: IClaimDto) => {
        return new Promise((resolve, reject) => {
            claims.crudSave(data).then(resolve).catch(reject);
            setNotificationData({
                text: sprintf(
                    langPage.message,
                    data.title,
                    getEnumTitleValue(ClaimStatusEnum, "ClaimStatusEnum", data.status)
                ),
                uid: data.uid,
            });
        });
    };

    const actions: ICRUDAction[] = [
        { name: "list", cb: claims.crudList },
        { name: "edit", cb: claims.crudGet },
        { name: "delete", cb: claims.crudDelete },
        { name: "save", cb: onSaveStart },
    ];

    const onConfirm = (result: boolean) => {
        setNotificationData(null);
    };
    return (
        <>
            {!!notificationData && (
                <SendUserNotification
                    {...notificationData}
                    onClose={onConfirm}
                />
            )}
            <CRUD
                roles={roles}
                title={langPage.title}
                icon="warning"
                listConfig={listConfig}
                editConfig={editConfig}
                actions={actions}
                initialValue={{
                    id: 0,
                    uid: 0,
                    status: ClaimStatusEnum.Created,
                    title: "",
                    description: "",
                    resolution: "",
                }}
            />
        </>
    );
}
export default Claims;
