import { useEffect, useState } from "react";

import lang, { getEnumSelectValues, sprintf } from "lang";
import { GoodTable, IKeyValueListItem, KeyValueList, Modal, Page } from "components";

import { company } from "api/data";
import useLoadApiData from "api/hooks/useLoadApiData";
import { useNotifier } from "api/hooks/useNotifier";
import { ICompanyDto } from "api/interfaces/user/ICompanyDto";
import dateTime from "api/common/dateTime";
import { ICompanyMoneyDto } from "api/interfaces/user/ICompanyMoneyDto";
import { CompanyMoneyTypeEnum } from "api/enums/CompanyMoneyTypeEnum";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

import CompanyList from "./List";
import CompanyMoneyHistory from "./CompanyHistory";

export default function MyCompanies() {
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
                    title: langPage.addUserId,
                    value: company.addUserName,
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
            backUrl={"/"}
            icon="company"
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
