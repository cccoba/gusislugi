import { useMemo, useState } from "react";
import dayjs from "dayjs";

import lang, { getEnumSelectValues, getEnumTitleValue, sprintf } from "lang";
import { CRUDAsync } from "components";
import { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";
import SendUserNotification, { ISendUserNotificationProps } from "components/SendUserNotification";
import { ICRUDAsyncAction, TCRUDAsyncActionCb } from "components/CRUDAsync/Main";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { medicalPolicies } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { IMedicalPoliciesDto } from "api/interfaces/user/IMedicalPoliciesDto";
import { MedicalPoliciesTypeEnum } from "api/enums/MedicalPoliciesTypeEnum";
import { generateRandomString } from "api/common/helper";
import { useAppSelector } from "api/hooks/redux";
import { MessageStatusEnum } from "api/enums/MessageStatusEnum";

const langPage = lang.pages.medicalPolicies;

export const medicalPoliciesListConfig: ICRUDAsyncListConfig = {
    isMultiSelection: false,
    withRefresh: true,
    orderBy: { direction: SortOrderEnum.Descending, sort: "id" },
    fields: [
        { name: "id", title: langPage.fields.id, width: "30px" },
        {
            name: "type",
            title: langPage.fields.type,
            format: "list",
            formatProps: getEnumSelectValues(MedicalPoliciesTypeEnum, "MedicalPoliciesTypeEnum"),
        },
        { name: "status", title: langPage.fields.status },
        { name: "user", title: langPage.fields.uid },
        { name: "endDate", title: langPage.fields.endDate, format: "date" },
        { name: "nickname", title: "", hidden: true },
    ],
    transform: (data: IMedicalPoliciesDto) => ({
        ...data,
        status: data.status ? langPage.statusActive : langPage.statusNotActive,
        user: data.user?.firstName || lang.unknown,
        nickname: data.user?.nickname || "",
    }),
};

export const medicalPoliciesEditConfig: ICRUDAsyncEditConfig = {
    fields: [
        {
            name: "number",
            title: langPage.fields.number,
            type: "text",
            required: true,
            maxLength: 10,
        },
        {
            name: "type",
            title: langPage.fields.type,
            type: "select",
            required: true,
            values: getEnumSelectValues(MedicalPoliciesTypeEnum, "MedicalPoliciesTypeEnum"),
        },
        {
            name: "status",
            title: "",
            text: langPage.fields.status,
            type: "switcher",
        },
        {
            name: "trauma_rescue",
            title: "",
            text: langPage.fields.trauma_rescue,
            type: "switcher",
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
const defInitialData: IMedicalPoliciesDto = {
    id: 0,
    number: "",
    uid: 0,
    type: MedicalPoliciesTypeEnum.Oms,
    trauma_rescue: false,
    status: true,
    endDate: dayjs().add(24, "hour").toDate(),
};
interface IProps {
    userId?: number;
}
function MedicalPolicies({ userId }: IProps) {
    const currentUserRoleMedicalPolicies = useAppSelector((s) => s.user.user?.role?.params?.medicalPolicies);
    const [notificationData, setNotificationData] = useState<null | ISendUserNotificationProps>(null);
    const props = useMemo(() => {
        const newProps: { actions: ICRUDAsyncAction[]; initialData: IMedicalPoliciesDto } = {
            actions: [
                { name: "list", cb: medicalPolicies.crudList },
                { name: "save", cb: onSaveStart as any },
                { name: "edit", cb: medicalPolicies.crudGet },
                { name: "delete", cb: medicalPolicies.crudDelete },
            ],
            initialData: { ...defInitialData, number: generateRandomString(10, "1234567890") },
        };

        if (userId) {
            newProps.actions[0].cbArgs = [userId];
            newProps.actions[0].cb = medicalPolicies.crudUserList;
            newProps.initialData.uid = userId;
        }
        return newProps;
    }, [userId]);
    function onSaveStart(data: IMedicalPoliciesDto, initData: IMedicalPoliciesDto) {
        return new Promise((resolve, reject) => {
            medicalPolicies.crudSave(data).then(resolve).catch(reject);
            let text = "";
            if (!initData.id) {
                text = sprintf(
                    langPage.message.addText,
                    getEnumTitleValue(MedicalPoliciesTypeEnum, "MedicalPoliciesTypeEnum", data.type),
                    data.status ? langPage.statusActive : langPage.statusNotActive
                );
                if (data.trauma_rescue) {
                    text += "\n" + langPage.message.trauma_rescue;
                }
            } else {
                if (initData.type === data.type) {
                    text = sprintf(
                        langPage.message.text,
                        getEnumTitleValue(MedicalPoliciesTypeEnum, "MedicalPoliciesTypeEnum", data.type),
                        data.status ? langPage.statusActive : langPage.statusNotActive
                    );
                } else {
                    text = sprintf(
                        langPage.message.textChange,
                        getEnumTitleValue(MedicalPoliciesTypeEnum, "MedicalPoliciesTypeEnum", initData.type),
                        getEnumTitleValue(MedicalPoliciesTypeEnum, "MedicalPoliciesTypeEnum", data.type),
                        data.status ? langPage.statusActive : langPage.statusNotActive
                    );
                }
                if (initData.trauma_rescue !== data.trauma_rescue) {
                    if (data.trauma_rescue) {
                        text += "\n" + langPage.message.trauma_rescue;
                    } else {
                        text += "\n" + langPage.message.no_trauma_rescue;
                    }
                }
            }
            setNotificationData({
                uid: data.uid,
                title: langPage.message.title,
                text: text,
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
                    status={MessageStatusEnum.MedicalPolicies}
                    onClose={hideNotificationData}
                />
            )}
            <CRUDAsync
                backUrl="/medicalPolicies"
                roles={[["medicalPolicies"]]}
                icon="medicalPolicies"
                title={langPage.title}
                listConfig={medicalPoliciesListConfig}
                editConfig={medicalPoliciesEditConfig}
                actions={props.actions}
                initialValue={props.initialData}
                permissions={currentUserRoleMedicalPolicies}
                withOutPage={!!userId}
            />
        </>
    );
}

export default MedicalPolicies;
