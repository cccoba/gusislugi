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
import { MedicineDiseaseTypeEnum } from "api/enums/MedicineDiseaseTypeEnum";
import { IMedicineDiseases } from "api/interfaces/Medicine/IMedicineDiseases";
import useLoadApiData from "api/hooks/useLoadApiData";
import { IMedicineParam } from "api/interfaces/Medicine/IMedicineParam";

export default function MedicineDiseases({ ...pageProps }: IPage) {
    const langPage = lang.pages.medicine.diseases;
    const { data: paramsList, isLoading, error, refetch } = useLoadApiData<any[]>(medicine.params.getAll, []);

    const listConfig: ICRUDAsyncListConfig = {
        isMultiSelection: false,
        withRefresh: true,
        orderBy: { direction: SortOrderEnum.Descending, sort: "id" },
        fields: [
            { name: "id", title: lang.id, width: "30px" },
            {
                name: "title",
                title: lang.title,
            },
            {
                name: "type",
                title: langPage.type,
                format: "list",
                formatProps: getEnumSelectValues(MedicineDiseaseTypeEnum, "MedicineDiseaseTypeEnum"),
            },
        ],
    };

    const defInitialData: IMedicineDiseases = {
        id: 0,
        title: "",
        type: MedicineDiseaseTypeEnum.Disease,
        description: "",
        param1: [],
        param2: [],
        param3: [],
    };
    const currentUserRolePermissions = useAppSelector((s) => s.user.user?.role?.params?.medicineAdmin);
    const props = useMemo(() => {
        return {
            actions: getCRUDActions(medicine.diseases),
            initialValue: { ...defInitialData },
            listConfig: { ...listConfig },
            editConfig: {
                fields: [
                    {
                        name: "title",
                        title: lang.title,
                        type: "text",
                        required: true,
                        group: "main",
                    },
                    {
                        name: "type",
                        title: langPage.type,
                        type: "select",
                        values: getEnumSelectValues(MedicineDiseaseTypeEnum, "MedicineDiseaseTypeEnum"),
                        group: "main",
                    },
                    {
                        name: "description",
                        title: lang.description,
                        type: "text",
                        multiline: true,
                        group: "main",
                    },
                    {
                        name: "param1",
                        title: "",
                        type: "medicineDiseaseParam",
                        required: true,
                        group: "param1",
                        params: paramsList || [],
                    },
                    {
                        name: "param2",
                        title: "",
                        type: "medicineDiseaseParam",
                        required: true,
                        group: "param2",
                        params: paramsList || [],
                    },
                    {
                        name: "param3",
                        title: "",
                        type: "medicineDiseaseParam",
                        required: true,
                        group: "param3",
                        params: paramsList || [],
                    },
                ],
                groups: [
                    { title: langPage.main, name: "main" },
                    { title: langPage.param1, name: "param1" },
                    { title: langPage.param2, name: "param2" },
                    { title: langPage.param3, name: "param3" },
                ],
            },
        };
    }, [paramsList]);

    return (
        <CRUDAsync
            {...pageProps}
            title={langPage.title}
            permissions={currentUserRolePermissions}
            {...props}
        />
    );
}
