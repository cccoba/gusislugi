import { useEffect, useState } from "react";

import lang from "lang";
import type { IKeyValueListItem } from "components";
import { KeyValueList, Modal, Page } from "components";

import { company } from "api/data";
import useLoadApiData from "api/hooks/useLoadApiData";
import { useNotifier } from "api/hooks/useNotifier";
import type { ICompanyDto } from "api/interfaces/user/ICompanyDto";
import dateTime from "api/common/dateTime";
import type { ICompanyMoneyDto } from "api/interfaces/user/ICompanyMoneyDto";

import type { IPage } from "api/interfaces/components/Page/IPage";

import CompanyList from "./List";
import CompanyMoneyHistory from "./CompanyHistory";

export default function MyCompanies({ ...pageProps }: IPage) {
    const langPage = lang.pages.companies;
    const { showError } = useNotifier();
    const [selectedData, setSelectedData] = useState<null | {
        company: IKeyValueListItem[];
        history: ICompanyMoneyDto[];
    }>(null);
    const { data, isLoading, error, refetch } = useLoadApiData<ICompanyDto[]>(company.getMyData, []);
    useEffect(() => {
        if (error) {
            showError(error);
        }
    }, [error]);

    const toDetails = (company: any) => {
        if (company) {
            const newData: IKeyValueListItem[] = [
                {
                    title: lang.title,
                    value: company.title,
                },
                {
                    title: langPage.address,
                    value: company.address,
                },
                {
                    title: langPage.money,
                    value: company.money,
                },
                {
                    title: langPage.userId,
                    value: company.userName,
                },
            ];
            if (company.deputyUserId) {
                newData.push({
                    title: langPage.deputyUserId,
                    value: company.deputyUserName,
                });
            }
            if (company.description) {
                newData.push({
                    title: lang.description,
                    value: company.description,
                });
            }
            newData.push({
                title: lang.created_at,
                value: dateTime(company.created_at),
            });
            if (company.updated_at !== company.created_at) {
                newData.push({
                    title: lang.updated_at,
                    value: dateTime(company.updated_at),
                });
            }
            setSelectedData({
                company: newData,
                history: company.companyMoneys || [],
            });
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
                    onClose={hideDetails}
                    title={langPage.title}
                    withOkButton
                >
                    <KeyValueList values={selectedData.company} />
                    {!!selectedData?.history?.length && <CompanyMoneyHistory data={selectedData.history} />}
                </Modal>
            )}
            <CompanyList
                data={data || []}
                onRowClick={toDetails}
                actions={[{ icon: "refresh", name: "refresh", onClick: refetch }]}
            />
        </Page>
    );
}
