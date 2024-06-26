import { useEffect, useState } from "react";

import lang, { getEnumSelectValues } from "lang";
import { Form, GoodTable, Modal, Page } from "components";
import { IGoodTableField } from "components/GoodTable";
import { TFormField } from "components/Form/FormAdapters";

import { fines } from "api/data";
import useLoadApiData from "api/hooks/useLoadApiData";
import { IFineDto } from "api/interfaces/user/IFineDto";
import { useNotifier } from "api/hooks/useNotifier";
import { TaxeStatusEnum } from "api/enums/TaxeStatusEnum";

const langPage = lang.pages.fines;

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
function MyFines() {
    const { showError } = useNotifier();
    const [selectedData, setSelectedData] = useState<null | IFineDto>(null);
    const { data, isLoading, error, refetch } = useLoadApiData<IFineDto[]>(fines.getMyData, []);
    useEffect(() => {
        if (!!error) {
            showError(error);
        }
    }, [error]);
    const toDetails = (data: IFineDto) => {
        if (data) {
            setSelectedData(data);
        }
    };
    const hideDetails = () => {
        setSelectedData(null);
    };
    return (
        <Page
            title={langPage.title}
            isLoading={isLoading}
            backUrl={"/"}
            icon="fines"
        >
            {!!selectedData && (
                <Modal
                    open
                    responsiveWidth
                    withCloseButton
                    onClose={hideDetails}
                    title={langPage.title}
                >
                    <Form
                        fields={formFields}
                        values={selectedData}
                        submitBtnType="no"
                    />
                </Modal>
            )}
            <GoodTable
                fields={fields}
                values={data || []}
                onRowClick={toDetails}
                actions={[{ icon: "refresh", name: "refresh", onClick: refetch }]}
            />
        </Page>
    );
}
export default MyFines;
