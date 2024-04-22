import { useMemo } from "react";
import dayjs from "dayjs";

import lang, { getEnumSelectValues } from "lang";
import { CRUDAsync } from "components";
import { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { medicalPolicies } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { IMedicalPoliciesDto } from "api/interfaces/user/IMedicalPoliciesDto";
import { MedicalPoliciesTypeEnum } from "api/enums/MedicalPoliciesTypeEnum";
import { generateRandomString } from "api/common/helper";
import { useAppSelector } from "api/hooks/redux";
import { checkFlagIncludes } from "api/common/enumHelper";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";

const langPage = lang.pages.medicalPolicies;

const listConfig: ICRUDAsyncListConfig = {
    isMultiSelection: true,
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
    ],
    transform: (data: IMedicalPoliciesDto) => ({
        ...data,
        status: data.status ? langPage.statusActive : langPage.statusNotActive,
        user: data.user?.fullName || lang.unknown,
    }),
};

const editConfig: ICRUDAsyncEditConfig = {
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

function MedicalPolicies({ roles, icon }: IPageWithRoles) {
    const currentUserRoleMedicalPolicies = useAppSelector((s) => s.user.user?.role?.params?.medicalPolicies);
    const props = useMemo(() => {
        const newRoleActions: any = { initialValue: undefined, actions: [] };
        if (!!currentUserRoleMedicalPolicies) {
            if (checkFlagIncludes(currentUserRoleMedicalPolicies, RolePermissionFlag.Add)) {
                newRoleActions.initialValue = {
                    id: 0,
                    number: generateRandomString(10, "1234567890"),
                    uid: 0,
                    type: MedicalPoliciesTypeEnum.Oms,
                    trauma_rescue: false,
                    status: true,
                    endDate: dayjs().add(24, "hour").toDate(),
                };
                if (newRoleActions.actions.findIndex((x: any) => x.name === "save") === -1) {
                    newRoleActions.actions.push({ name: "save", cb: medicalPolicies.crudSave });
                }
            }
            if (checkFlagIncludes(currentUserRoleMedicalPolicies, RolePermissionFlag.Edit)) {
                newRoleActions.actions.push({ name: "edit", cb: medicalPolicies.crudGet });
                if (newRoleActions.actions.findIndex((x: any) => x.name === "save") === -1) {
                    newRoleActions.actions.push({ name: "save", cb: medicalPolicies.crudSave });
                }
            }
            if (checkFlagIncludes(currentUserRoleMedicalPolicies, RolePermissionFlag.Delete)) {
                newRoleActions.actions.push({ name: "delete", cb: medicalPolicies.crudDelete });
            }
            if (checkFlagIncludes(currentUserRoleMedicalPolicies, RolePermissionFlag.View)) {
                newRoleActions.actions.push({ name: "list", cb: medicalPolicies.crudList });
            }
        }
        return newRoleActions;
    }, [currentUserRoleMedicalPolicies]);

    return (
        <>
            <CRUDAsync
                backUrl="/medicalPolicies"
                roles={roles}
                title={langPage.title}
                icon={icon}
                listConfig={listConfig}
                editConfig={editConfig}
                actions={props.actions}
                initialValue={props.initialValue}
            />
        </>
    );
}

export default MedicalPolicies;
