import lang from "lang";
import { CRUDAsync } from "components";
import type { ICRUDAsyncAction } from "components/CRUDAsync/Main";
import type { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";

import type { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import type { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { nationalities } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

export default function Nationalities({ roles }: IPageWithRoles) {
    const langPage = lang.pages.nationalities;

    const listConfig: ICRUDAsyncListConfig = {
        isMultiSelection: false,
        orderBy: { direction: SortOrderEnum.Descending, sort: "id" },
        fields: [
            { name: "id", title: langPage.fields.id, width: "90px" },
            { name: "title", title: langPage.fields.title },
        ],
    };

    const editConfig: ICRUDAsyncEditConfig = {
        fields: [
            { name: "id", title: langPage.fields.id, type: "text", disabled: true },
            { name: "title", title: langPage.fields.title, type: "text", required: true },
        ],
    };
    const actions: ICRUDAsyncAction[] = [
        { name: "getAll", cb: nationalities.crudList },
        { name: "getRecord", cb: nationalities.crudGet },
        { name: "remove", cb: nationalities.crudDelete },
        { name: "save", cb: nationalities.crudSave },
    ];

    return (
        <>
            <CRUDAsync
                backUrl={"/"}
                roles={roles}
                title={langPage.title}
                icon="list"
                listConfig={listConfig}
                editConfig={editConfig}
                actions={actions}
                initialValue={{
                    id: 0,
                    title: "",
                }}
            />
        </>
    );
}
