import lang from "lang";
import { CRUDAsync } from "components";
import { ICRUDAsyncAction } from "components/CRUDAsync/Main";
import { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { citizenships } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

const langPage = lang.pages.citizenships;

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

function Citizenships({ roles }: IPageWithRoles) {
    const actions: ICRUDAsyncAction[] = [
        { name: "getAll", cb: citizenships.crudList },
        { name: "getRecord", cb: citizenships.crudGet },
        { name: "remove", cb: citizenships.crudDelete },
        { name: "save", cb: citizenships.crudSave },
    ];

    return (
        <>
            <CRUDAsync
                backUrl="/citizenships"
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

export default Citizenships;
