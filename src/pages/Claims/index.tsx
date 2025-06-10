import { useMemo, useState } from "react";

import lang, { getEnumTitleValue, getEnumSelectValues, sprintf } from "lang";
import { CRUDAsync } from "components";
import type { ICRUDAsyncAction } from "components/CRUDAsync/Main";
import type { ISendUserNotificationProps } from "components/SendUserNotification";
import SendUserNotification from "components/SendUserNotification";
import type { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";

import type { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { claims } from "api/data";
import type { IClaimDto } from "api/interfaces/user/IClaimDto";
import { ClaimStatusEnum } from "api/enums/ClaimStatusEnum";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { MessageStatusEnum } from "api/enums/MessageStatusEnum";
import { cutText } from "api/common/helper";

interface IProps {
    userId?: number;
}
export default function Claims({ userId }: IProps) {
    const langPage = lang.pages.claims;

    const listConfig: ICRUDAsyncListConfig = {
        isMultiSelection: false,
        withRefresh: true,
        orderBy: { direction: SortOrderEnum.Descending, sort: "id" },
        mobileBottomAction: !userId,
        fields: [
            { name: "id", title: langPage.fields.id },
            { name: "title", title: langPage.fields.title },
            {
                name: "status",
                title: langPage.fields.status,
                format: "list",
                formatProps: getEnumSelectValues(ClaimStatusEnum, "ClaimStatusEnum"),
            },
            { name: "created_at", title: langPage.fields.created_at, format: "date" },
            { name: "user", title: langPage.fields.uid },
            { name: "nickname", title: "", hidden: true },
        ],
        transform: (data: IClaimDto) => ({
            ...data,
            status: getEnumTitleValue(ClaimStatusEnum, "ClaimStatusEnum", data.status),
            user: data.user?.firstName || lang.unknown,
            nickname: data.user?.nickname || "",
            title: cutText(data.title, 30),
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
    const defInitialData = {
        id: 0,
        uid: 0,
        status: ClaimStatusEnum.Created,
        title: "",
        description: "",
        resolution: "",
    };
    const [notificationData, setNotificationData] = useState<null | ISendUserNotificationProps>(null);
    const props = useMemo(() => {
        const newProps: { actions: ICRUDAsyncAction[]; initialData: IClaimDto; listConfig: ICRUDAsyncListConfig } = {
            actions: [
                { name: "getAll", cb: claims.crudList },
                { name: "save", cb: onSaveStart as any },
                { name: "getRecord", cb: claims.crudGet },
                { name: "remove", cb: claims.crudDelete },
            ],
            initialData: { ...defInitialData },
            listConfig: { ...listConfig },
        };

        if (userId) {
            newProps.actions[0].cbArgs = [userId];
            newProps.actions[0].cb = claims.crudUserList;
            newProps.initialData.uid = userId;
            newProps.listConfig.fields = newProps.listConfig.fields.filter((x) => x.name !== "user");
        }
        return newProps;
    }, [userId]);
    function onSaveStart(data: IClaimDto) {
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
    }
    const hideNotificationData = () => {
        setNotificationData(null);
    };

    return (
        <>
            {!!notificationData && (
                <SendUserNotification
                    {...notificationData}
                    status={MessageStatusEnum.Claims}
                    onClose={hideNotificationData}
                />
            )}
            <CRUDAsync
                backUrl="/"
                roles={[["claims"]]}
                title={langPage.title}
                icon="claims"
                listConfig={props.listConfig}
                editConfig={editConfig}
                actions={props.actions}
                initialValue={props.initialData}
                withOutPage={!!userId}
            />
        </>
    );
}
