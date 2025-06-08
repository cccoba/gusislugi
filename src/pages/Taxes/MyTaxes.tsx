import { useEffect, useMemo, useState } from "react";

import lang, { getEnumSelectValues, getEnumTitleValue, sprintf } from "lang";
import type { IKeyValueListItem } from "components";
import { Form, GoodTable, KeyValueList, Modal, Page } from "components";
import type { IGoodTableField } from "components/GoodTable";
import type { TFormField } from "components/Form/FormAdapters";

import { taxes } from "api/data";
import useLoadApiData from "api/hooks/useLoadApiData";
import type { ITaxeDto } from "api/interfaces/user/ITaxeDto";
import { useNotifier } from "api/hooks/useNotifier";
import { TaxeStatusEnum } from "api/enums/TaxeStatusEnum";
import type { IPage } from "api/interfaces/components/Page/IPage";
import dateTime from "api/common/dateTime";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

interface IProps extends IPage {
    userId?: number;
}
export default function MyTaxes({ userId, ...pageProps }: IProps) {
    const langPage = lang.pages.taxes;

    const fields: IGoodTableField[] = [
        {
            name: "title",
            title: langPage.fields.title,
        },
        {
            name: "status",
            title: langPage.fields.status,
            format: "list",
            formatProps: getEnumSelectValues(TaxeStatusEnum, "TaxeStatusEnum"),
        },
        {
            name: "value",
            title: langPage.fields.value,
            format: "number",
        },
        {
            name: "taxesTypeName",
            title: langPage.fields.taxesTypeId,
        },
        {
            name: "endDate",
            title: langPage.fields.endDate,
            format: "date",
        },
    ];
    const formFields: TFormField[] = [
        {
            name: "title",
            title: langPage.fields.title,
            type: "text",
            fieldProps: {
                inputProps: {
                    readOnly: true,
                },
            },
        },
        {
            name: "taxesTypeId",
            title: langPage.fields.taxesTypeId,
            type: "taxesTypes",
            filterTypes: -1,
            fieldProps: {
                readOnly: true,
            },
        },
        {
            name: "status",
            title: langPage.fields.status,
            type: "select",
            values: getEnumSelectValues(TaxeStatusEnum, "TaxeStatusEnum"),
            fieldProps: { readOnly: true },
        },
        {
            name: "value",
            title: langPage.fields.value,
            type: "number",
            fieldProps: {
                inputProps: {
                    readOnly: true,
                },
            },
        },
        {
            name: "created_at",
            title: langPage.fields.created_at,
            type: "dateTime",
            fieldProps: { readOnly: true },
        },

        {
            name: "endDate",
            title: langPage.fields.endDate,
            type: "dateTime",
            fieldProps: { readOnly: true },
        },
    ];
    const { showError } = useNotifier();
    const [selectedData, setSelectedData] = useState<null | IKeyValueListItem[]>(null);
    const { data, isLoading, error, refetch } = useLoadApiData<ITaxeDto[]>(taxes.getMyData, []);
    useEffect(() => {
        if (error) {
            showError(error);
        }
    }, [error]);
    const values = useMemo(() => {
        if (!data) return [];
        return data?.map((item) => ({
            ...item,
            taxesTypeName: item.taxesType?.title,
        }));
    }, [data]);
    const toDetails = (data: ITaxeDto) => {
        if (data) {
            setSelectedData([
                { title: langPage.fields.taxesTypeId, value: data.taxesType?.title || 0 },
                {
                    title: langPage.fields.status,
                    value: getEnumTitleValue(TaxeStatusEnum, "TaxeStatusEnum", data.status),
                },
                { title: langPage.fields.value, value: sprintf(lang.money, data.value) },
                { title: langPage.fields.title, value: data.title },
                { title: langPage.fields.created_at, value: dateTime(data.created_at) },
                { title: langPage.fields.endDate, value: dateTime(data.endDate) },
                { title: langPage.fields.taxesTypeDetails, value: data.taxesType?.description || "" },
            ]);
        }
    };
    const hideDetails = () => {
        setSelectedData(null);
    };
    return (
        <Page
            title={langPage.myTitle}
            isLoading={isLoading}
            {...pageProps}
        >
            {!!selectedData && (
                <Modal
                    open
                    responsiveWidth
                    withCloseButton
                    withOkButton
                    onClose={hideDetails}
                    title={langPage.details}
                >
                    <KeyValueList values={selectedData} />
                </Modal>
            )}
            <GoodTable
                fields={fields}
                values={values || []}
                onRowClick={toDetails}
                actions={[{ icon: "refresh", name: "refresh", onClick: refetch }]}
                order={{ direction: SortOrderEnum.Descending, sort: "endDate" }}
            />
        </Page>
    );
}
