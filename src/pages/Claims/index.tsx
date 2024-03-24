import lang, { getEnumTitleValue } from "lang";
import { CRUD } from "components";
import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { ICRUDListConfig } from "components/CRUD/List";
import { SortOrderEnum } from "api/enums/SortOrderEnum";
import { ICRUDAction } from "components/CRUD";
import { claims } from "api/data";
import { IClaimDto } from "api/interfaces/user/IClaimDto";
import { ClaimStatusEnum } from "api/enums/ClaimStatusEnum";
import { ICRUDEditConfig } from "components/CRUD/Edit";
import { getEnumSelectValues } from "api/common/enumHelper";

const langPage = lang.pages.claims;

const listConfig: ICRUDListConfig = {
    isMultiselection: true,
    orderBy: { direction: SortOrderEnum.Descending, sort: "id" },
    fields: [
        { name: "id", title: langPage.fields.id },
        { name: "title", title: langPage.fields.title },
        { name: "status", title: langPage.fields.status },
        { name: "created_at", title: langPage.fields.created_at, format: "date" },
        { name: "user", title: langPage.fields.uid },
    ],
    transform: (data: IClaimDto) => ({
        ...data,
        status: getEnumTitleValue(ClaimStatusEnum, "ClaimStatusEnum", data.status),
        user: data.user?.fullName || lang.unknown,
    }),
};

const editConfig: ICRUDEditConfig = {
    fields: [
        { name: "id", title: langPage.fields.id, type: "text", disabled: true },
        { name: "title", title: langPage.fields.title, type: "text", required: true },
        {
            name: "status",
            title: langPage.fields.status,
            type: "select",
            required: true,
            values: getEnumSelectValues(ClaimStatusEnum, "ClaimStatusEnum"),
        },
        {
            name: "uid",
            title: langPage.fields.uid,
            type: "user",
            required: true,
        },
        {
            name: "description",
            title: langPage.fields.description,
            type: "text",
            required: true,
            fieldProps: { multiline: true },
        },
        { name: "resolution", title: langPage.fields.resolution, type: "text", fieldProps: { multiline: true } },
    ],
};

const actions: ICRUDAction[] = [
    { name: "list", cb: claims.crudList },
    { name: "delete", cb: claims.crudDelete },
    { name: "edit", cb: claims.crudGet },
    { name: "save", cb: claims.crudSave },
];

function Claims({ roles }: IPageWithRoles) {
    return (
        <CRUD
            title={langPage.title}
            icon="warning"
            listConfig={listConfig}
            editConfig={editConfig}
            actions={actions}
        />
    );
}
export default Claims;
