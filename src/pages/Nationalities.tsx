import lang from "lang";
import { CRUDAsync } from "components";
import { ICRUDAsyncAction } from "components/CRUDAsync/Main";
import { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { nationalities } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

const langPage = lang.pages.nationalities;

const listConfig: ICRUDAsyncListConfig = {
    isMultiSelection: true,
    orderBy: { direction: SortOrderEnum.Descending, sort: "id" },
    fields: [
        { name: "id", title: langPage.fields.id },
        { name: "title", title: langPage.fields.title },
    ],
};

const editConfig: ICRUDAsyncEditConfig = {
    fields: [
        { name: "id", title: langPage.fields.id, type: "text", disabled: true },
        { name: "title", title: langPage.fields.title, type: "text", required: true },
    ],
};

function Nationalities({ roles }: IPageWithRoles) {
    const actions: ICRUDAsyncAction[] = [
        { name: "list", cb: nationalities.crudList },
        { name: "edit", cb: nationalities.crudGet },
        { name: "delete", cb: nationalities.crudDelete },
        { name: "save", cb: nationalities.crudSave },
    ];

    return (
        <>
            <CRUDAsync
                backUrl={"/nationalities"}
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

export default Nationalities;
