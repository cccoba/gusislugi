import { useMemo, useState } from "react";
import dayjs from "dayjs";

import lang, { getEnumSelectValues, getEnumTitleValue, sprintf } from "lang";
import { CRUDAsync } from "components";
import type { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";
import type { ISendUserNotificationProps } from "components/SendUserNotification";
import SendUserNotification from "components/SendUserNotification";
import type { ICRUDAsyncAction } from "components/CRUDAsync/Main";

import type { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { licenses } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

import { useAppSelector } from "api/hooks/redux";
import { LicenseTypeEnum } from "api/enums/LicenseTypeEnum";
import type { ILicenseDto } from "api/interfaces/user/ILicenseDto";
import { MessageStatusEnum } from "api/enums/MessageStatusEnum";
import dateTime from "api/common/dateTime";

const defInitialData: ILicenseDto = {
    id: 0,
    type: LicenseTypeEnum.SelfDefense,
    endDate: dayjs().add(2, "day").endOf("day").toDate(),
    uid: 0,
};
interface IProps {
    userId?: number;
}
export default function Licenses({ userId }: IProps) {
    const langPage = lang.pages.licenses;

    const currentUserRoleLicenses = useAppSelector((s) => s.user.user?.role?.params?.licenses);
    const [notificationData, setNotificationData] = useState<null | ISendUserNotificationProps>(null);
    const editConfig: ICRUDAsyncEditConfig = {
        fields: [
            {
                name: "type",
                title: lang.type,
                type: "select",
                required: true,
                values: getEnumSelectValues(LicenseTypeEnum, "LicenseTypeEnum"),
            },
            {
                name: "uid",
                title: lang.user,
                type: "user",
                required: true,
            },
            {
                name: "endDate",
                title: langPage.endDate,
                type: "dateTime",
                required: true,
            },
            {
                name: "created_at",
                title: langPage.created_at,
                type: "dateTime",
                disabled: true,
            },
            {
                name: "creatorId",
                title: langPage.creator,
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
                { name: "id", title: lang.id, width: "30px" },
                { name: "userName", title: lang.user },
                {
                    name: "type",
                    title: lang.type,
                    format: "list",
                    formatProps: getEnumSelectValues(LicenseTypeEnum, "LicenseTypeEnum"),
                },
                { name: "created_at", title: langPage.created_at, format: "date" },
                { name: "endDate", title: langPage.endDate, format: "date" },
            ],
            transform: (data: ILicenseDto) => ({
                ...data,
                userName: data.user?.firstName || lang.unknown,
            }),
        };

        const newProps: { actions: ICRUDAsyncAction[]; initialData: ILicenseDto; listConfig: ICRUDAsyncListConfig } = {
            actions: [
                { name: "getAll", cb: licenses.crudList },
                { name: "save", cb: onSaveStart as any },
                { name: "getRecord", cb: licenses.crudGet },
                { name: "remove", cb: licenses.crudDelete },
            ],
            initialData: { ...defInitialData },
            listConfig: { ...listConfig },
        };

        if (userId) {
            newProps.actions[0].cbArgs = [userId];
            newProps.actions[0].cb = licenses.crudUserList;
            newProps.initialData.uid = userId;
            newProps.listConfig.fields = newProps.listConfig.fields.filter((x) => x.name !== "userName");
        }
        return newProps;
    }, [userId]);
    function onSaveStart(data: ILicenseDto) {
        return new Promise((resolve, reject) => {
            licenses.crudSave(data).then(resolve).catch(reject);
            setNotificationData({
                uid: data.uid,
                title: langPage.message.title,
                text: sprintf(
                    langPage.message.text,
                    getEnumTitleValue(LicenseTypeEnum, "LicenseTypeEnum", data.type),
                    dateTime(data.endDate)
                ),
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
                    status={MessageStatusEnum.Licenses}
                    onClose={hideNotificationData}
                />
            )}
            <CRUDAsync
                backUrl="/"
                roles={[["licenses"]]}
                icon="licenses"
                title={langPage.title}
                listConfig={props.listConfig}
                editConfig={editConfig}
                actions={props.actions}
                permissions={currentUserRoleLicenses}
                initialValue={props.initialData}
                withOutPage={!!userId}
            />
        </>
    );
}
