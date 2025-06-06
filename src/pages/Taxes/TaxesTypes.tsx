import { useMemo } from "react";

import lang from "lang";
import { CRUDAsync } from "components";
import type { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";
import type { ICRUDAsyncAction } from "components/CRUDAsync/Main";

import type { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { taxesTypes } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

import { useAppSelector } from "api/hooks/redux";
import type { ITaxesTypesDto } from "api/interfaces/user/ITaxesTypesDto";
import type { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";

export default function TaxesTypes({ ...pageProps }: IPageWithRoles) {
    const langPage = lang.pages.taxesTypes;

    const listConfig: ICRUDAsyncListConfig = {
        isMultiSelection: false,
        withRefresh: true,
        orderBy: { direction: SortOrderEnum.Ascending, sort: "title" },
        fields: [
            { name: "id", title: lang.id, width: "30px" },
            { name: "title", title: lang.title },
            { name: "description", title: lang.description, wrap: true },
        ],
    };

    const editConfig: ICRUDAsyncEditConfig = {
        fields: [
            {
                name: "title",
                title: lang.title,
                type: "text",
                required: true,
            },
            {
                name: "description",
                title: lang.description,
                type: "text",
                multiline: true,
                required: true,
            },
        ],
    };

    const defInitialData: ITaxesTypesDto = {
        id: 0,
        title: "",
        description: "",
    };

    const currentUserRoleTaxesTypes = useAppSelector((s) => s.user.user?.role?.params?.taxesTypes);

    const props = useMemo(() => {
        const newProps: {
            actions: ICRUDAsyncAction[];
            initialData: ITaxesTypesDto;
            listConfig: ICRUDAsyncListConfig;
        } = {
            actions: [
                { name: "getAll", cb: taxesTypes.crudList },
                { name: "save", cb: taxesTypes.crudSave },
                { name: "getRecord", cb: taxesTypes.crudGet },
                { name: "remove", cb: taxesTypes.crudDelete },
            ],
            initialData: { ...defInitialData },
            listConfig: { ...listConfig },
        };

        return newProps;
    }, []);

    return (
        <CRUDAsync
            {...pageProps}
            title={langPage.title}
            listConfig={props.listConfig}
            editConfig={editConfig}
            actions={props.actions}
            permissions={currentUserRoleTaxesTypes}
            initialValue={props.initialData}
        />
    );
}
