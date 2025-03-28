import { useMemo, useState } from "react";

import lang, { getEnumSelectValues, sprintf } from "lang";
import { CRUDAsync } from "components";
import { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";
import SendUserNotification, { ISendUserNotificationProps } from "components/SendUserNotification";
import { ICRUDAsyncAction } from "components/CRUDAsync/Main";

import { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { wanteds } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { useAppSelector } from "api/hooks/redux";
import { IWantedDto } from "api/interfaces/user/IWantedDto";
import { WantedTypeEnum } from "api/enums/WantedTypeEnum";
import { MessageStatusEnum } from "api/enums/MessageStatusEnum";

const langPage = lang.pages.wanteds;

export const wantedsListConfig: ICRUDAsyncListConfig = {
    isMultiSelection: false,
    withRefresh: true,
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
        { name: "nickname", title: "", hidden: true },
    ],
    transform: (data: IWantedDto) => ({
        ...data,
        user: data.user?.firstName || lang.unknown,
        nickname: data.user?.nickname || "",
        image: data.user?.image || "",
        status: data.status ? langPage.statusActive : langPage.statusNotActive,
    }),
};

export const wantedsEditConfig: ICRUDAsyncEditConfig = {
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
        {
            name: "addUserId",
            title: langPage.fields.addUserId,
            type: "user",
            disabled: true,
        },
    ],
};
const defInitialData: IWantedDto = {
    id: 0,
    uid: 0,
    status: true,
    type: WantedTypeEnum.Minima,
    description: "",
};
interface IProps {
    userId?: number;
}
function Wanteds({ userId }: IProps) {
    const currentUserRoleParams = useAppSelector((s) => s.user.user?.role?.params?.wanteds);
    const [notificationData, setNotificationData] = useState<null | ISendUserNotificationProps>(null);
    const props = useMemo(() => {
        const newProps: { actions: ICRUDAsyncAction[]; initialData: IWantedDto; listConfig: ICRUDAsyncListConfig } = {
            actions: [
                { name: "getAll", cb: wanteds.crudList },
                { name: "save", cb: onSaveStart as any },
                { name: "getRecord", cb: wanteds.crudGet },
                { name: "remove", cb: wanteds.crudDelete },
            ],
            initialData: { ...defInitialData },
            listConfig: { ...wantedsListConfig },
        };

        if (userId) {
            newProps.actions[0].cbArgs = [userId];
            newProps.actions[0].cb = wanteds.crudUserList;
            newProps.initialData.uid = userId;
            newProps.listConfig.fields = newProps.listConfig.fields.filter(
                (x) => x.name !== "user" && x.name !== "image"
            );
        }
        return newProps;
    }, [userId]);
    function onSaveStart(data: IWantedDto) {
        return new Promise((resolve, reject) => {
            wanteds.crudSave(data).then(resolve).catch(reject);
            setNotificationData({
                uid: data.uid,
                title: langPage.message.title,
                text: sprintf(langPage.message.text, data.status ? langPage.statusActive : langPage.statusNotActive),
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
                    status={MessageStatusEnum.Wanteds}
                    onClose={hideNotificationData}
                />
            )}
            <CRUDAsync
                roles={[["wanteds"]]}
                icon="wanteds"
                backUrl={"/wanteds"}
                title={langPage.title}
                listConfig={props.listConfig}
                editConfig={wantedsEditConfig}
                actions={props.actions}
                permissions={currentUserRoleParams}
                initialValue={props.initialData}
                withOutPage={!!userId}
            />
        </>
    );
}

export default Wanteds;
