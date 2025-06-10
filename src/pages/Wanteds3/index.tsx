import { useMemo, useState } from "react";

import lang, { sprintf } from "lang";
import { CRUDAsync } from "components";
import type { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";
import type { ISendUserNotificationProps } from "components/SendUserNotification";
import SendUserNotification from "components/SendUserNotification";
import type { ICRUDAsyncAction } from "components/CRUDAsync/Main";

import type { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { wanteds3 } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { useAppSelector } from "api/hooks/redux";
import type { IWanteds3Dto } from "api/interfaces/user/IWanteds3Dto";
import { MessageStatusEnum } from "api/enums/MessageStatusEnum";

interface IProps {
    userId?: number;
}
export default function Wanteds3({ userId }: IProps) {
    const langPage = lang.pages.wanteds3;

    const wanteds3EditConfig: ICRUDAsyncEditConfig = {
        fields: [
            {
                name: "uid",
                title: langPage.fields.uid,
                type: "user",
                required: true,
            },
            {
                name: "status",
                title: "",
                text: langPage.statusActive,
                type: "switcher",
            },
            {
                name: "description",
                title: langPage.fields.description,
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
                title: langPage.fields.creatorId,
                type: "user",
                disabled: true,
            },
        ],
    };

    const currentUserRoleParams = useAppSelector((s) => s.user.user?.role?.params?.wanteds3);
    const [notificationData, setNotificationData] = useState<null | ISendUserNotificationProps>(null);
    const props = useMemo(() => {
        const defInitialData: IWanteds3Dto = {
            id: 0,
            uid: 0,
            status: true,
            description: "",
        };
        const wanteds3ListConfig: ICRUDAsyncListConfig = {
            isMultiSelection: false,
            withRefresh: true,
            orderBy: { direction: SortOrderEnum.Descending, sort: "id" },
            mobileBottomAction: !userId,
            fields: [
                { name: "id", title: lang.id, width: "30px" },
                { name: "image", title: lang.image, width: "30px", format: "image" },
                { name: "user", title: langPage.fields.uid },
                { name: "status", title: lang.status },
                { name: "created_at", title: lang.created_at, format: "date" },
                { name: "nickname", title: "", hidden: true },
            ],
            transform: (data: IWanteds3Dto) => ({
                ...data,
                user: data.user?.firstName || lang.unknown,
                nickname: data.user?.nickname || "",
                image: data.user?.image || "",
                status: data.status ? langPage.statusActive : langPage.statusNotActive,
            }),
        };
        const newProps: { actions: ICRUDAsyncAction[]; initialData: IWanteds3Dto; listConfig: ICRUDAsyncListConfig } = {
            actions: [
                { name: "getAll", cb: wanteds3.crudList },
                { name: "save", cb: onSaveStart as any },
                { name: "getRecord", cb: wanteds3.crudGet },
                { name: "remove", cb: wanteds3.crudDelete },
            ],
            initialData: { ...defInitialData },
            listConfig: { ...wanteds3ListConfig },
        };

        if (userId) {
            newProps.actions[0].cbArgs = [userId];
            newProps.actions[0].cb = wanteds3.crudUserList;
            newProps.initialData.uid = userId;
            newProps.listConfig.fields = newProps.listConfig.fields.filter(
                (x) => x.name !== "user" && x.name !== "image"
            );
        }
        return newProps;
    }, [userId]);
    function onSaveStart(data: IWanteds3Dto) {
        return new Promise((resolve, reject) => {
            wanteds3.crudSave(data).then(resolve).catch(reject);
            setNotificationData({
                uid: data.uid,
                title: langPage.message.title,
                text: sprintf(langPage.message.text, data.status ? langPage.statusActive : langPage.statusNotActive),
                helperText: langPage.message.helperText,
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
                    status={MessageStatusEnum.Wanteds3}
                    onClose={hideNotificationData}
                />
            )}
            <CRUDAsync
                roles={[["wanteds3"]]}
                icon="wanteds3"
                backUrl="/"
                title={langPage.title}
                listConfig={props.listConfig}
                editConfig={wanteds3EditConfig}
                actions={props.actions}
                permissions={currentUserRoleParams}
                initialValue={props.initialData}
                withOutPage={!!userId}
            />
        </>
    );
}
