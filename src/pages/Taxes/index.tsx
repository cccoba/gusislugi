import { useState } from "react";
import dayjs from "dayjs";

import lang, { getEnumSelectValues, getEnumTitleValue, sprintf } from "lang";
import { CRUDAsync } from "components";
import { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";
import SendUserNotification, { ISendUserNotificationProps } from "components/SendUserNotification";
import { TCRUDAsyncActionCb } from "components/CRUDAsync/Main";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { taxes } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { IMedicalPoliciesDto } from "api/interfaces/user/IMedicalPoliciesDto";
import { MedicalPoliciesTypeEnum } from "api/enums/MedicalPoliciesTypeEnum";
import { useAppSelector } from "api/hooks/redux";
import { TaxeStatusEnum } from "api/enums/TaxeStatusEnum";
import { ITaxeDto } from "api/interfaces/user/ITaxeDto";

const langPage = lang.pages.taxes;

const listConfig: ICRUDAsyncListConfig = {
    isMultiSelection: true,
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

const editConfig: ICRUDAsyncEditConfig = {
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
            required: true,
            minValue: 0,
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

function Taxes({ roles, icon }: IPageWithRoles) {
    const currentUserRoleTaxes = useAppSelector((s) => s.user.user?.role?.params?.taxes);
    const [notificationData, setNotificationData] = useState<null | ISendUserNotificationProps>(null);
    const onSaveStart: TCRUDAsyncActionCb = async (data: ITaxeDto) => {
        return new Promise((resolve, reject) => {
            taxes.crudSave(data).then(resolve).catch(reject);
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
                    onClose={hideNotificationData}
                />
            )}
            <CRUDAsync
                backUrl="/taxes"
                roles={roles}
                title={langPage.title}
                icon={icon}
                listConfig={listConfig}
                editConfig={editConfig}
                actions={[
                    { name: "list", cb: taxes.crudList },
                    { name: "delete", cb: taxes.crudDelete },
                    { name: "edit", cb: taxes.crudGet },
                    { name: "save", cb: onSaveStart },
                ]}
                permissions={currentUserRoleTaxes}
                initialValue={{
                    id: 0,
                    value: 0,
                    uid: 0,
                    status: MedicalPoliciesTypeEnum.Oms,
                    endDate: dayjs().add(8, "hour").toDate(),
                }}
            />
        </>
    );
}

export default Taxes;
