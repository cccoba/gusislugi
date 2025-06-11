import { useMemo, useState } from "react";

import lang from "lang";
import { CRUDAsync } from "components";
import type { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";
import type { ISendUserNotificationProps } from "components/SendUserNotification";
import SendUserNotification from "components/SendUserNotification";
import type { ICRUDAsyncAction } from "components/CRUDAsync/Main";

import type { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { personalities } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

import { MessageStatusEnum } from "api/enums/MessageStatusEnum";
import type { IPersonalityDto } from "api/interfaces/user/IPersonalityDto";

interface IProps {
    userId?: number;
}
export default function Personalities({ userId }: IProps) {
    const langPage = lang.pages.personalities;
    const defInitialData: IPersonalityDto = {
        id: 0,
        title: "",
        description: "",
        isCompleted: false,
        userDescription: "",
        uid: 0,
    };

    const [notificationData, setNotificationData] = useState<null | ISendUserNotificationProps>(null);
    const editConfig: ICRUDAsyncEditConfig = {
        fields: [
            {
                name: "title",
                title: lang.title,
                type: "text",
                required: true,
            },
            {
                name: "uid",
                title: lang.user,
                type: "user",
                required: true,
            },
            {
                name: "isCompleted",
                title: "",
                text: langPage.isCompleted,
                type: "switcher",
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
                type: "text",
                multiline: true,
            },

            {
                name: "created_at",
                title: lang.created_at,
                type: "dateTime",
                disabled: true,
            },
            {
                name: "creatorId",
                title: lang.creator,
                type: "user",
                disabled: true,
            },
        ],
    };
    const props = useMemo(() => {
        const listConfig: ICRUDAsyncListConfig = {
            isMultiSelection: false,
            withRefresh: true,
            orderBy: { direction: SortOrderEnum.Descending, sort: "id" },
            fields: [
                { name: "id", title: lang.id, maxWidth: "50px" },
                { name: "title", title: lang.title, wrap: true },
                { name: "userName", title: lang.user, wrap: true },
                { name: "isCompleted", title: langPage.isCompleted, format: "boolean" },
                { name: "created_at", title: lang.created_at, format: "date" },
            ],
            transform: (data: IPersonalityDto) => ({
                ...data,
                userName: data.user?.firstName || lang.unknown,
            }),
        };

        const newProps: {
            actions: ICRUDAsyncAction[];
            initialData: IPersonalityDto;
            listConfig: ICRUDAsyncListConfig;
        } = {
            actions: [
                { name: "getAll", cb: personalities.crudList },
                { name: "save", cb: onSaveStart as any },
                { name: "getRecord", cb: personalities.crudGet },
                { name: "remove", cb: personalities.crudDelete },
            ],
            initialData: { ...defInitialData },
            listConfig: { ...listConfig },
        };

        if (userId) {
            newProps.actions[0].cbArgs = [userId];
            newProps.actions[0].cb = personalities.crudUserList;
            newProps.initialData.uid = userId;
            newProps.listConfig.fields = newProps.listConfig.fields.filter((x) => x.name !== "userName");
        }
        return newProps;
    }, [userId]);
    function onSaveStart(data: IPersonalityDto) {
        return new Promise((resolve, reject) => {
            personalities.crudSave(data).then(resolve).catch(reject);
            setNotificationData({
                uid: data.uid,
                title: langPage.message.title,
                text: langPage.message.text,
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
                    status={MessageStatusEnum.Personalities}
                    onClose={hideNotificationData}
                />
            )}
            <CRUDAsync
                backUrl="/"
                roles={[["admins"]]}
                icon="secrets"
                title={langPage.title}
                listConfig={props.listConfig}
                editConfig={editConfig}
                actions={props.actions}
                initialValue={props.initialData}
                withOutPage={!!userId}
            />
        </>
    );
}
