import { useMemo } from "react";

import lang, { sprintf } from "lang";
import { CRUDAsync } from "components";
import { ICRUDAsyncProps } from "components/CRUDAsync";

import { shop } from "api/data";
import { useAppSelector } from "api/hooks/redux";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { ITransactionDto } from "api/interfaces/Shop/ITransactionDto";

export default function Shop() {
    const langPage = lang.pages.shop;

    const currentUserRoleParams = useAppSelector((s) => s.user.user?.role?.params?.shop);
    const crudProps = useMemo<ICRUDAsyncProps>(() => {
        return {
            actions: [
                { name: "list", cb: shop.crudList },
                { name: "save", cb: shop.crudSave },
                { name: "edit", cb: shop.crudGet },
                { name: "delete", cb: shop.crudDelete },
            ],
            initialValue: {
                id: 0,
                guid: "",
                sum: 0,
                eventDate: new Date(),
                details: [],
            },
            listConfig: {
                fields: [
                    { name: "userName", title: langPage.fields.user },
                    { name: "sum", title: langPage.fields.sum, format: "number" },
                    { name: "count", title: langPage.fields.count },
                    { name: "eventDate", title: langPage.fields.eventDate, format: "date" },
                ],
                orderBy: {
                    sort: "eventDate",
                    direction: SortOrderEnum.Descending,
                },
                withRefresh: true,
                transform: (item: ITransactionDto) => {
                    const total = item.details.reduce((acc, detail) => acc + detail.quantity, 0);
                    return {
                        ...item,
                        userName: item.user.firstName,
                        count: sprintf(langPage.fields.countText, item.details?.length || 0, total),
                    };
                },
            },
            editConfig: {
                fields: [
                    { name: "guid", title: langPage.fields.user, type: "text" },
                    { name: "sum", title: langPage.fields.sum, type: "number" },
                    { name: "eventDate", title: langPage.fields.eventDate, type: "dateTime" },
                    { name: "details", title: langPage.fields.details, type: "json" },
                ],
            },
            permissions: currentUserRoleParams,
            title: langPage.title,
        };
    }, [currentUserRoleParams]);
    return (
        <>
            <CRUDAsync
                roles={[["shop"]]}
                icon="shop"
                backUrl={"/shop"}
                {...crudProps}
            />
        </>
    );
}
