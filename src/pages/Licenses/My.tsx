import { useEffect, useState } from "react";

import lang, { getEnumSelectValues } from "lang";
import { Form, GoodTable, Modal, Page, type IGoodTableField, type TFormField } from "components";

import { licenses } from "api/data";
import useLoadApiData from "api/hooks/useLoadApiData";
import type { ILicenseDto } from "api/interfaces/user/ILicenseDto";
import { useNotifier } from "api/hooks/useNotifier";
import { LicenseTypeEnum } from "api/enums/LicenseTypeEnum";
import type { IPage } from "api/interfaces/components/Page/IPage";
import { isMobile } from "react-device-detect";

export default function MyLicenses({ ...pageProps }: IPage) {
    const langPage = lang.pages.licenses;

    const fields: IGoodTableField[] = [
        {
            name: "type",
            title: lang.type,
            format: "list",
            formatProps: getEnumSelectValues(LicenseTypeEnum, "LicenseTypeEnum"),
        },
        { name: "created_at", title: langPage.created_at, format: "date" },
        { name: "endDate", title: langPage.endDate, format: "date" },
    ];
    const formFields: TFormField[] = [
        {
            name: "type",
            title: lang.type,
            type: "select",
            required: true,
            values: getEnumSelectValues(LicenseTypeEnum, "LicenseTypeEnum"),
            disabled: true,
        },
        {
            name: "endDate",
            title: langPage.endDate,
            type: "dateTime",
            required: true,
            disabled: true,
        },
        {
            name: "created_at",
            title: langPage.created_at,
            type: "dateTime",
            disabled: true,
        },
    ];

    const { showError } = useNotifier();
    const [selectedData, setSelectedData] = useState<null | ILicenseDto>(null);
    const { data, isLoading, error, refetch } = useLoadApiData<ILicenseDto[]>(licenses.getMyData, []);
    useEffect(() => {
        if (error) {
            showError(error);
        }
    }, [error]);
    const toDetails = (data: ILicenseDto) => {
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
            {...pageProps}
            scrollTopBottom={isMobile ? 72 : undefined}
        >
            {!!selectedData && (
                <Modal
                    open
                    responsiveWidth
                    withCloseButton
                    onClose={hideDetails}
                    title={langPage.title}
                    withOkButton
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
