import { useState } from "react";
import dayjs from "dayjs";

import lang, { getEnumSelectValues, getEnumTitleValue, sprintf } from "lang";
import { CRUDAsync } from "components";
import { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";
import SendUserNotification, { ISendUserNotificationProps } from "components/SendUserNotification";
import { TCRUDAsyncActionCb } from "components/CRUDAsync/Main";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { fines } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { IMedicalPoliciesDto } from "api/interfaces/user/IMedicalPoliciesDto";

import { useAppSelector } from "api/hooks/redux";
import { TaxeStatusEnum } from "api/enums/TaxeStatusEnum";
import { IFineDto } from "api/interfaces/user/IFineDto";
import { MessageStatusEnum } from "api/enums/MessageStatusEnum";

const langPage = lang.pages.fines;

export const finesListConfig: ICRUDAsyncListConfig = {
    isMultiSelection: false,
    withRefresh: true,
    orderBy: { direction: SortOrderEnum.Descending, sort: "id" },
    fields: [
        { name: "id", title: langPage.fields.id, width: "30px" },
        { name: "title", title: langPage.fields.title },
        {
            name: "status",
            title: langPage.fields.status,
            format: "list",
            formatProps: getEnumSelectValues(TaxeStatusEnum, "TaxeStatusEnum"),
        },
        { name: "value", title: langPage.fields.value },
        { name: "user", title: langPage.fields.uid },
        { name: "endDate", title: langPage.fields.endDate, format: "date" },
    ],
    transform: (data: IMedicalPoliciesDto) => ({
        ...data,
        user: data.user?.firstName || lang.unknown,
    }),
};

export const finesEditConfig: ICRUDAsyncEditConfig = {
    fields: [
        {
            name: "title",
            title: langPage.fields.title,
            type: "text",
            required: true,
        },
        {
            name: "value",
            title: langPage.fields.value,
            type: "counter",
            minValue: 1,
            required: true,
            validateFn: (value) => {
                return (!!value && value > 0) || lang.pages.money.send.errors.positiveCount;
            },
        },
        {
            name: "status",
            title: langPage.fields.status,
            type: "select",
            required: true,
            values: getEnumSelectValues(TaxeStatusEnum, "TaxeStatusEnum"),
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
            required: true,
        },
    ],
};

function Fines({ roles, icon }: IPageWithRoles) {
    const currentUserRolePermissions = useAppSelector((s) => s.user.user?.role?.params?.fines);
    const [notificationData, setNotificationData] = useState<null | ISendUserNotificationProps>(null);
    const onSaveStart: TCRUDAsyncActionCb = async (data: IFineDto) => {
        return new Promise((resolve, reject) => {
            fines.crudSave(data).then(resolve).catch(reject);
            setNotificationData({
                uid: data.uid,
                title: langPage.message.title,
                text: sprintf(
                    langPage.message.text,
                    data.title,
                    sprintf(lang.money, data.value),
                    getEnumTitleValue(TaxeStatusEnum, "TaxeStatusEnum", data.status)
                ),
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
                    status={MessageStatusEnum.Fines}
                    onClose={hideNotificationData}
                />
            )}
            <CRUDAsync
                backUrl="/fines"
                roles={roles}
                title={langPage.title}
                icon={icon}
                listConfig={finesListConfig}
                editConfig={finesEditConfig}
                actions={[
                    { name: "list", cb: fines.crudList },
                    { name: "delete", cb: fines.crudDelete },
                    { name: "edit", cb: fines.crudGet },
                    { name: "save", cb: onSaveStart },
                ]}
                permissions={currentUserRolePermissions}
                initialValue={{
                    id: 0,
                    value: 0,
                    uid: 0,
                    status: TaxeStatusEnum.Active,
                    endDate: dayjs().add(8, "hour").toDate(),
                }}
            />
        </>
    );
}

export default Fines;
