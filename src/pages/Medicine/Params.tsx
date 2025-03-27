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

import { MedicineParamsTypeEnum } from "api/enums/MedicineParamsTypeEnum";
import { IMedicineParam } from "api/interfaces/Medicine/IMedicineParam";

export default function MedicineParams({ ...pageProps }: IPage) {
    const langPage = lang.pages.medicine.params;

    const listConfig: ICRUDAsyncListConfig = {
        isMultiSelection: false,
        withRefresh: true,
        orderBy: { direction: SortOrderEnum.Ascending, sort: "title" },
        pagination: { rowsPerPage: [10, 25, 100], pageSize: 25 },
        transform: (item: IMedicineParam) => {
            const arr: string[] = [];
            if (item?.type === MedicineParamsTypeEnum.Digital && item?.minValue) {
                arr.push(item?.minValue);
            }
            if (item?.baseValue) {
                arr.push(item?.baseValue);
            }
            if (item?.type === MedicineParamsTypeEnum.Digital && item?.maxValue) {
                arr.push(item?.maxValue);
            }
            return { ...item, allValues: arr.join("/") };
        },
        fields: [
            { name: "id", title: lang.id, width: "30px" },
            {
                name: "icon",
                title: lang.icon,
                format: "icon",
                maxWidth: "30px",
            },
            {
                name: "title",
                title: lang.title,
            },
            {
                name: "allValues",
                title: lang.value,
            },
            {
                name: "type",
                title: lang.type,
                format: "list",
                formatProps: getEnumSelectValues(MedicineParamsTypeEnum, "MedicineParamsTypeEnum"),
            },
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
                name: "type",
                title: lang.type,
                type: "select",
                values: getEnumSelectValues(MedicineParamsTypeEnum, "MedicineParamsTypeEnum"),
            },
            {
                name: "unit",
                title: langPage.unit,
                type: "text",
            },
            {
                name: "icon",
                title: langPage.icon,
                type: "iconSelector",
            },
            {
                name: "baseValue",
                title: langPage.baseValue,
                type: "text",
            },
            {
                name: "minValue",
                title: langPage.minValue,
                type: "text",
            },
            {
                name: "maxValue",
                title: langPage.maxValue,
                type: "text",
            },
        ],
    };

    const defInitialData: IMedicineParam = {
        id: 0,
        title: "",
        type: MedicineParamsTypeEnum.Boolean,
        unit: "",
        baseValue: "",
        minValue: "",
        maxValue: "",
        icon: "",
    };
    const currentUserRolePermissions = useAppSelector((s) => s.user.user?.role?.params?.medicineAdmin);
    const props = useMemo(() => {
        const newProps: {
            actions: ICRUDAsyncAction[];
            initialData: IMedicineParam;
            listConfig: ICRUDAsyncListConfig;
        } = {
            actions: getCRUDActions(medicine.params),
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
            initialValue={props.initialData}
            permissions={currentUserRolePermissions}
        />
    );
}
