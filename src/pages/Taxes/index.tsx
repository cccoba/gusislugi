import { useMemo, useState } from "react";
import dayjs from "dayjs";

import lang, { getEnumSelectValues, getEnumTitleValue, sprintf } from "lang";
import { CRUDAsync } from "components";
import { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";
import SendUserNotification, { ISendUserNotificationProps } from "components/SendUserNotification";
import { ICRUDAsyncAction, TCRUDAsyncActionCb } from "components/CRUDAsync/Main";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { taxes } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { IMedicalPoliciesDto } from "api/interfaces/user/IMedicalPoliciesDto";

import { useAppSelector } from "api/hooks/redux";
import { TaxeStatusEnum } from "api/enums/TaxeStatusEnum";
import { ITaxeDto } from "api/interfaces/user/ITaxeDto";
import { MessageStatusEnum } from "api/enums/MessageStatusEnum";
import { cutText } from "api/common/helper";

const langPage = lang.pages.taxes;

const listConfig: ICRUDAsyncListConfig = {
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
        { name: "nickname", title: "", hidden: true },
    ],
    transform: (data: ITaxeDto) => ({
        ...data,
        user: data.user?.firstName || lang.unknown,
        nickname: data.user?.nickname || "",
        value: sprintf(lang.money, data.value),
        title: cutText(data.title, 30),
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
const defInitialData: ITaxeDto = {
    id: 0,
    value: 0,
    title: "",
    uid: 0,
    status: TaxeStatusEnum.Active,
    endDate: dayjs().add(8, "hour").toDate(),
};
interface IProps {
    userId?: number;
}
function Taxes({ userId }: IProps) {
    const currentUserRoleTaxes = useAppSelector((s) => s.user.user?.role?.params?.taxes);
    const [notificationData, setNotificationData] = useState<null | ISendUserNotificationProps>(null);
    const props = useMemo(() => {
        const newProps: { actions: ICRUDAsyncAction[]; initialData: ITaxeDto; listConfig: ICRUDAsyncListConfig } = {
            actions: [
                { name: "list", cb: taxes.crudList },
                { name: "save", cb: onSaveStart as any },
                { name: "edit", cb: taxes.crudGet },
                { name: "delete", cb: taxes.crudDelete },
            ],
            initialData: { ...defInitialData },
            listConfig: { ...listConfig },
        };

        if (userId) {
            newProps.actions[0].cbArgs = [userId];
            newProps.actions[0].cb = taxes.crudUserList;
            newProps.initialData.uid = userId;
            newProps.listConfig.fields = newProps.listConfig.fields.filter((x) => x.name !== "user");
        }
        return newProps;
    }, [userId]);
    function onSaveStart(data: ITaxeDto) {
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
    }
    const hideNotificationData = () => {
        setNotificationData(null);
    };
    return (
        <>
            {!!notificationData && (
                <SendUserNotification
                    {...notificationData}
                    status={MessageStatusEnum.Taxes}
                    onClose={hideNotificationData}
                />
            )}
            <CRUDAsync
                backUrl="/taxes"
                roles={[["taxes"]]}
                icon="taxes"
                title={langPage.title}
                listConfig={props.listConfig}
                editConfig={editConfig}
                actions={props.actions}
                permissions={currentUserRoleTaxes}
                initialValue={props.initialData}
                withOutPage={!!userId}
            />
        </>
    );
}

export default Taxes;
