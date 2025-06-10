import { useEffect, useState } from "react";

import lang, { getEnumSelectValues } from "lang";
import { Form, GoodTable, type IGoodTableField, Modal, Page } from "components";
import { medicalPolicies } from "api/data";
import useLoadApiData from "api/hooks/useLoadApiData";
import type { IMedicalPoliciesDto } from "api/interfaces/user/IMedicalPoliciesDto";
import { MedicalPoliciesTypeEnum } from "api/enums/MedicalPoliciesTypeEnum";
import { useNotifier } from "api/hooks/useNotifier";

import type { TFormField } from "components/Form/FormAdapters";
import { isMobile } from "react-device-detect";

const langPage = lang.pages.medicalPolicies;

const fields: IGoodTableField[] = [
    {
        name: "number",
        title: langPage.fields.number,
    },
    {
        name: "type",
        title: langPage.fields.type,
        format: "list",
        formatProps: getEnumSelectValues(MedicalPoliciesTypeEnum, "MedicalPoliciesTypeEnum"),
    },
    {
        name: "status",
        title: langPage.fields.status,
        format: "list",
        formatProps: [
            { id: true, title: langPage.statusActive },
            { id: false, title: langPage.statusNotActive },
        ],
    },
    {
        name: "endDate",
        title: langPage.fields.endDate,
        format: "date",
    },
];
const formFields: TFormField[] = [
    {
        name: "number",
        title: langPage.fields.number,
        type: "text",
        fieldProps: {
            inputProps: {
                readOnly: true,
            },
        },
    },
    {
        name: "type",
        title: langPage.fields.type,
        type: "select",
        values: getEnumSelectValues(MedicalPoliciesTypeEnum, "MedicalPoliciesTypeEnum"),
        fieldProps: { readOnly: true },
    },
    {
        name: "status",
        title: "",
        text: langPage.fields.status,
        type: "switcher",
        fieldProps: { readOnly: true },
    },
    {
        name: "trauma_rescue",
        title: "",
        text: langPage.fields.trauma_rescue,
        type: "switcher",
        fieldProps: { readOnly: true },
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
function MyMedicalPolicies() {
    const { showError } = useNotifier();
    const [selectedData, setSelectedData] = useState<null | IMedicalPoliciesDto>(null);
    const { data, isLoading, error, refetch } = useLoadApiData<IMedicalPoliciesDto[]>(medicalPolicies.getMyData, []);
    useEffect(() => {
        if (error) {
            showError(error);
        }
    }, [error]);
    const toDetails = (data: IMedicalPoliciesDto) => {
        if (data) {
            setSelectedData(data);
        }
    };
    const hideDetails = () => {
        setSelectedData(null);
    };
    return (
        <Page
            title={langPage.myTitle}
            isLoading={isLoading}
            backUrl={"/"}
            icon="medicalPolicies"
            scrollTopBottom={isMobile ? 72 : undefined}
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
export default MyMedicalPolicies;
