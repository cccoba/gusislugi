import { useMemo, useState } from "react";
import lang, { sprintf } from "lang";
import { GoodTable, Page } from "components";
import useGetData from "store/rtkProvider";
import SendUserNotification, { type ISendUserNotificationProps } from "components/SendUserNotification";

import { type IPage } from "api/interfaces/components/Page/IPage";
import { company, webApiResultData } from "api/data";
import useLoadApiData from "api/hooks/useLoadApiData";
import { type ICompanyMoneyDto } from "api/interfaces/user/ICompanyMoneyDto";
import { CompanyMoneyTypeEnum } from "api/enums/CompanyMoneyTypeEnum";
import { type IGoodTableToolbarAction } from "components/GoodTable";
import { CompanyPermissionActionFlag } from "api/enums/CompanyPermissionActionFlag";
import { useNotifier } from "api/hooks/useNotifier";
import { MessageStatusEnum } from "api/enums/MessageStatusEnum";
import { type ICompanyDto } from "api/interfaces/user/ICompanyDto";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { useAppSelector, useLoader } from "api/hooks/redux";

import CompanyMoneyAdd from "./AddMoney";

export default function CompanyHistory({ ...pageProps }: IPage) {
    const langPage = lang.pages.companies;
    const { data, isLoading, refetch } = useLoadApiData<ICompanyMoneyDto[]>(company.money.getList, []);

    const currentUserRoleParams = useAppSelector((s) => s.user.user?.role?.params?.company);
    const [isAddMoneyShowed, setIsAddMoneyShowed] = useState(false);
    const [notificationData, setNotificationData] = useState<null | ISendUserNotificationProps>(null);
    const { data: companies } = useGetData<ICompanyDto[]>("companies", []);
    const { setIsLoading } = useLoader();
    const { showError, showSuccess } = useNotifier();
    const values = useMemo(() => {
        if (data?.length) {
            return data.map((x) => ({
                ...x,
                valueTitle: `${x.type === CompanyMoneyTypeEnum.Add ? "+" : "-"}${sprintf(lang.money, x.value)}`,
                creatorName: x.creator?.firstName ?? "",
                companyName: x.company?.title ?? "",
            }));
        }
        return [];
    }, [data]);
    const features = useMemo(() => {
        const newActions: IGoodTableToolbarAction<ICompanyMoneyDto>[] = [
            { icon: "refresh", name: "refresh", onClick: refetch },
        ];
        const features = { withAdd: false, withSubtract: false };
        if (currentUserRoleParams) {
            features.withAdd = !!(currentUserRoleParams & CompanyPermissionActionFlag.MoneyAdd);
            features.withSubtract = !!(currentUserRoleParams & CompanyPermissionActionFlag.MoneySubtract);
            if (features.withAdd || features.withSubtract) {
                newActions.push({ icon: "add", name: "add", onClick: toAddShow });
            }
        }
        return { actions: newActions, features };
    }, [currentUserRoleParams]);
    const onAddMoneySave = (data: ICompanyMoneyDto) => {
        const selectedCompany = companies?.find((x) => x.id === data.companyId);
        if (!selectedCompany) {
            showError(langPage.errors.companyNotFound);
            return;
        }
        setIsLoading(true);
        company.money
            .add(data)
            .then((res) => {
                const { error, result } = webApiResultData<number>(res);
                if (error) {
                    throw error;
                }
                refetch();

                showSuccess(sprintf(langPage.success.addMoney, selectedCompany.title, result || 0));
                setIsAddMoneyShowed(false);
                setNotificationData({
                    uid: selectedCompany.addUserId,
                    title: langPage.message.title,
                    text: sprintf(langPage.message.addUserText, selectedCompany.title, result || 0),
                });
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.addMoney);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    function toAddShow() {
        setIsAddMoneyShowed(true);
    }
    const hideNotificationData = () => {
        setNotificationData(null);
    };
    const hideAddMoney = () => {
        setIsAddMoneyShowed(false);
    };
    return (
        <Page
            title={langPage.history}
            {...pageProps}
        >
            {!!notificationData && (
                <SendUserNotification
                    {...notificationData}
                    status={MessageStatusEnum.Companies}
                    onClose={hideNotificationData}
                />
            )}
            {isAddMoneyShowed && (
                <CompanyMoneyAdd
                    companyId={0}
                    withCompanySelector
                    onSave={onAddMoneySave}
                    onCancel={hideAddMoney}
                    {...features.features}
                />
            )}
            <GoodTable<ICompanyMoneyDto>
                fields={[
                    {
                        name: "created_at",
                        title: langPage.transactionDate,
                        format: "date",
                    },
                    {
                        name: "valueTitle",
                        title: langPage.money,
                        format: "number",
                    },
                    {
                        name: "companyName",
                        title: langPage.company,
                    },
                    {
                        name: "creatorName",
                        title: langPage.creatorId,
                    },
                ]}
                values={values}
                actions={features.actions}
                loading={isLoading}
                order={{
                    sort: "created_at",
                    direction: SortOrderEnum.Descending,
                }}
            />
        </Page>
    );
}
