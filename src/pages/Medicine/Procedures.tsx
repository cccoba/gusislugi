import lang, { getEnumSelectValues } from "lang";
import { CRUDAsync } from "components";
import { ICRUDAsyncEditConfig } from "components/CRUDAsync/Edit";

import { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { medicine } from "api/data";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { useAppSelector } from "api/hooks/redux";
import { useMemo } from "react";
import { getCRUDActions, ICRUDAsyncAction } from "components/CRUDAsync/Main";

import { IPage } from "api/interfaces/components/Page/IPage";

import { IMedicineProcedure } from "api/interfaces/Medicine/IMedicineProcedure";

import { MedicineProcedureTypeEnum } from "api/enums/MedicineProcedureTypeEnum";
import useGetData from "store/rtkProvider";
import { IMedicineParam } from "api/interfaces/Medicine/IMedicineParam";

export default function MedicineProcedures({ ...pageProps }: IPage) {
    const langPage = lang.pages.medicine.procedures;

    const { data: paramsList } = useGetData<IMedicineParam[]>("medicineParams", []);

    const currentUserRolePermissions = useAppSelector((s) => s.user.user?.role?.params?.medicineAdmin);
    const props = useMemo(() => {
        const listConfig: ICRUDAsyncListConfig = {
            isMultiSelection: false,
            withRefresh: true,
            orderBy: { direction: SortOrderEnum.Ascending, sort: "title" },
            /*transform: (item: IMedicineProcedure) => {
                const allParams = (medicineParams || []).filter((x) => item.params.includes(x.id));
                return { ...item, allParams: allParams.map((x) => x.title).join(", ") };
            },*/
            fields: [
                { name: "id", title: lang.id, width: "30px" },
                {
                    name: "title",
                    title: lang.title,
                },
                {
                    name: "type",
                    title: lang.type,
                    format: "list",
                    formatProps: getEnumSelectValues(MedicineProcedureTypeEnum, "MedicineProcedureTypeEnum"),
                },
                /*{
                    name: "allParams",
                    title: langPage.params,
                },*/
            ],
        };
        const newProps: {
            actions: ICRUDAsyncAction[];
            initialData: IMedicineProcedure;
            listConfig: ICRUDAsyncListConfig;
            editConfig: ICRUDAsyncEditConfig;
        } = {
            actions: getCRUDActions(medicine.procedures),
            initialData: {
                id: 0,
                title: "",
                type: MedicineProcedureTypeEnum.Procedure,
                description: "",
                place: "",
                params: [],
            },
            listConfig: listConfig,
            editConfig: {
                fields: [
                    {
                        name: "title",
                        title: lang.title,
                        type: "text",
                        required: true,
                    },
                    {
                        name: "type",
                        title: lang.type,
                        type: "select",
                        values: getEnumSelectValues(MedicineProcedureTypeEnum, "MedicineProcedureTypeEnum"),
                    },
                    { name: "description", title: lang.description, type: "text", multiline: true, required: true },
                    { name: "place", title: langPage.place, type: "text" },
                    {
                        name: "params",
                        title: langPage.params,
                        type: "medicineParamsActions",
                        params: paramsList || [],
                        required: true,
                    },
                ],
            },
        };
        return newProps;
    }, [paramsList]);

    return (
        <CRUDAsync
            {...pageProps}
            title={langPage.title}
            listConfig={props.listConfig}
            editConfig={props.editConfig}
            actions={props.actions}
            initialValue={props.initialData}
            permissions={currentUserRolePermissions}
        />
    );
}
