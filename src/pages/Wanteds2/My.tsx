import { useEffect, useState } from "react";

import lang from "lang";
import { type IGoodTableField, GoodTable, KeyValueList, Modal, Page } from "components";

import { wanteds2 } from "api/data";
import useLoadApiData from "api/hooks/useLoadApiData";
import { useNotifier } from "api/hooks/useNotifier";
import type { IPage } from "api/interfaces/components/Page/IPage";
import type { IWanteds2Dto } from "api/interfaces/user/IWanteds2Dto";
import dateTime from "api/common/dateTime";
import { isMobile } from "react-device-detect";

interface IProps extends IPage {
    userId?: number;
}
export default function MyWanteds2({ userId, ...pageProps }: IProps) {
    const langPage = lang.pages.wanteds2;

    const fields: IGoodTableField[] = [
        {
            name: "userDescription",
            title: langPage.fields.userDescription,
            wrap: true,
        },
    ];

    const { showError } = useNotifier();
    const [selectedData, setSelectedData] = useState<null | IWanteds2Dto>(null);
    const { data, isLoading, error, refetch } = useLoadApiData<IWanteds2Dto[]>(wanteds2.getMyData, []);
    useEffect(() => {
        if (error) {
            showError(error);
        }
    }, [error]);
    const toDetails = (data: IWanteds2Dto) => {
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
                    withCloseButton
                    onClose={hideDetails}
                    title={lang.details}
                    withOkButton
                    okBtnText={langPage.ok}
                >
                    <KeyValueList
                        values={[
                            { title: lang.created_at, value: dateTime(selectedData.created_at) },
                            { title: lang.updated_at, value: dateTime(selectedData.updated_at) },
                            { title: langPage.fields.userDescription, value: selectedData.userDescription },
                        ]}
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
