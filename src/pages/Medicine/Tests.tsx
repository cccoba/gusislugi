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

import { IMedicineTest } from "api/interfaces/Medicine/IMedicineTest";
import { MedicineTestEnum } from "api/enums/MedicineTestEnum";
import useGetData from "store/rtkProvider";
import { IMedicineParam } from "api/interfaces/Medicine/IMedicineParam";

export default function MedicineTests({ ...pageProps }: IPage) {
    const langPage = lang.pages.medicine.tests;

    const { data: medicineParams } = useGetData<IMedicineParam[]>("medicineParams", []);

    const editConfig: ICRUDAsyncEditConfig = {
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
                values: getEnumSelectValues(MedicineTestEnum, "MedicineTestEnum"),
            },
            { name: "description", title: lang.description, type: "text", multiline: true, required: true },
            { name: "place", title: langPage.place, type: "text" },
            { name: "timer", title: langPage.timer, type: "counter", required: true },
            { name: "params", title: langPage.params, type: "medicineParamsSelector", required: true },
        ],
    };

    const currentUserRolePermissions = useAppSelector((s) => s.user.user?.role?.params?.medicineAdmin);
    const props = useMemo(() => {
        const listConfig: ICRUDAsyncListConfig = {
            isMultiSelection: false,
            withRefresh: true,
            orderBy: { direction: SortOrderEnum.Ascending, sort: "title" },
            transform: (item: IMedicineTest) => {
                const allParams = (medicineParams || []).filter((x) => item.params.includes(x.id));
                return { ...item, allParams: allParams.map((x) => x.title).join(", ") };
            },
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
                    formatProps: getEnumSelectValues(MedicineTestEnum, "MedicineTestEnum"),
                },
                {
                    name: "allParams",
                    title: langPage.params,
                },
            ],
        };
        const newProps: {
            actions: ICRUDAsyncAction[];
            initialData: IMedicineTest;
            listConfig: ICRUDAsyncListConfig;
        } = {
            actions: getCRUDActions(medicine.tests),
            initialData: {
                id: 0,
                title: "",
                type: MedicineTestEnum.Test,
                description: "",
                place: "",
                timer: 0,
                params: [],
            },
            listConfig: listConfig,
        };
        return newProps;
    }, [medicineParams?.length]);

    if (medicineParams?.length === 0) {
        return null;
    }
    return (
        <CRUDAsync
            {...pageProps}
            title={langPage.title}
            listConfig={props.listConfig}
            editConfig={editConfig}
            actions={props.actions}
            initialValue={props.initialData}
            permissions={currentUserRolePermissions}
        />
    );
}
