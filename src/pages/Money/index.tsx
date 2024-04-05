import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import lang from "lang";
import { CRUDAsync } from "components";
import { checkUserRoleAccess } from "components/RoleChecker";
import { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { ICRUDAsyncAction } from "components/CRUDAsync/Main";
import { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { money } from "api/data";
import { IMoneyDto } from "api/interfaces/user/IMoneyDto";
import { useAppSelector } from "api/hooks/redux";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

const langPage = lang.pages.money;

const listConfig: ICRUDAsyncListConfig = {
    fields: [
        { name: "from_user", title: langPage.fields.fromUid, format: "text" },
        { name: "to_user", title: langPage.fields.toUid, format: "text" },
        { name: "value", title: langPage.fields.value, format: "number" },
        { name: "created_at", title: langPage.fields.created_at, format: "date" },
    ],
    orderBy: { direction: SortOrderEnum.Descending, sort: "id" },
    transform: (data: IMoneyDto) => ({
        ...data,
        from_user: data.from_user?.fullName || lang.unknown,
        to_user: data.to_user?.fullName || lang.unknown,
    }),
};
const editConfig: ICRUDAsyncEditConfig = {
    fields: [
        { name: "fromUid", title: langPage.fields.fromUid, type: "number", required: true },
        { name: "toUid", title: langPage.fields.toUid, type: "number", required: true },
        { name: "value", title: langPage.fields.value, type: "number", required: true },
    ],
};
const defInitialValue: IMoneyDto = {
    id: 0,
    fromUid: 0,
    toUid: 0,
    value: 0,
};
function MoneyList({ roles, icon }: IPageWithRoles) {
    const currentUserPermissions = useAppSelector((s) => s.user.user?.role.params);
    const { search = "" } = useLocation();

    const [actions, initialValue] = useMemo(() => {
        const newActions: ICRUDAsyncAction[] = [
            { name: "list", cb: money.crudList },
            { name: "save", cb: money.crudSave },
        ];
        let newInitialValue: IMoneyDto | undefined = undefined;
        if ((checkUserRoleAccess([["admins", RolePermissionFlag.Add]]), currentUserPermissions)) {
            newInitialValue = { ...defInitialValue };
            if (search.length) {
                const params = new URLSearchParams(search);
                if (params.has("fromUid") && params.get("fromUid") !== null) {
                    newInitialValue.fromUid = parseInt(params.get("fromUid") as string);
                }
                if (params.has("toUid") && params.get("toUid") !== null) {
                    newInitialValue.toUid = parseInt(params.get("toUid") as string);
                }
                if (params.has("value") && params.get("value") !== null) {
                    newInitialValue.value = parseInt(params.get("value") as string);
                }
            }
        }
        return [newActions, newInitialValue, search];
    }, [currentUserPermissions, search]);
    return (
        <CRUDAsync
            roles={roles}
            icon={icon}
            listConfig={listConfig}
            actions={actions}
            title={langPage.title}
            editConfig={editConfig}
            initialValue={initialValue}
        />
    );
}
export default MoneyList;
