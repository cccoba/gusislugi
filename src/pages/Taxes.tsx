import { useMemo } from "react";
import dayjs from "dayjs";

import lang, { getEnumSelectValues } from "lang";
import { CRUDAsync } from "components";
import { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { taxes } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { IMedicalPoliciesDto } from "api/interfaces/user/IMedicalPoliciesDto";
import { MedicalPoliciesTypeEnum } from "api/enums/MedicalPoliciesTypeEnum";
import { useAppSelector } from "api/hooks/redux";
import { checkFlagIncludes } from "api/common/enumHelper";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";
import { TaxeStatusEnum } from "api/enums/TaxeStatusEnum";

const langPage = lang.pages.taxes;

const listConfig: ICRUDAsyncListConfig = {
    isMultiSelection: true,
    orderBy: { direction: SortOrderEnum.Descending, sort: "id" },
    fields: [
        { name: "id", title: langPage.fields.id, width: "30px" },
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
        status: data.status ? langPage.statusActive : langPage.statusNotActive,
        user: data.user?.fullName || lang.unknown,
    }),
};

const editConfig: ICRUDAsyncEditConfig = {
    fields: [
        {
            name: "value",
            title: langPage.fields.value,
            type: "number",
            required: true,
            min: 0,
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
    const props = useMemo(() => {
        const newRoleActions: any = { initialValue: undefined, actions: [] };
        if (!!currentUserRoleTaxes) {
            if (checkFlagIncludes(currentUserRoleTaxes, RolePermissionFlag.Add)) {
                newRoleActions.initialValue = {
                    id: 0,
                    value: 0,
                    uid: 0,
                    status: MedicalPoliciesTypeEnum.Oms,
                    endDate: dayjs().add(8, "hour").toDate(),
                };
                if (newRoleActions.actions.findIndex((x: any) => x.name === "save") === -1) {
                    newRoleActions.actions.push({ name: "save", cb: taxes.crudSave });
                }
            }
            if (checkFlagIncludes(currentUserRoleTaxes, RolePermissionFlag.Edit)) {
                newRoleActions.actions.push({ name: "edit", cb: taxes.crudGet });
                if (newRoleActions.actions.findIndex((x: any) => x.name === "save") === -1) {
                    newRoleActions.actions.push({ name: "save", cb: taxes.crudSave });
                }
            }
            if (checkFlagIncludes(currentUserRoleTaxes, RolePermissionFlag.Delete)) {
                newRoleActions.actions.push({ name: "delete", cb: taxes.crudDelete });
            }
            if (checkFlagIncludes(currentUserRoleTaxes, RolePermissionFlag.View)) {
                newRoleActions.actions.push({ name: "list", cb: taxes.crudList });
            }
        }
        return newRoleActions;
    }, [currentUserRoleTaxes]);

    return (
        <>
            <CRUDAsync
                backUrl="/taxes"
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

export default Taxes;
