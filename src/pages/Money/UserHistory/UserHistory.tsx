import { useEffect, useState } from "react";

import lang, { sprintf } from "lang";
import { GoodTable, PageOrModal } from "components";
import { IGoodTableField } from "components/GoodTable";

import { IPageOrModal } from "api/interfaces/components/Page/IPageOrModal";
import { IMoneyDto } from "api/interfaces/user/IMoneyDto";
import { money, webApiResultData } from "api/data";
import { useNotifier } from "api/hooks/useNotifier";
import { IUserShortDto } from "api/interfaces/user/IUserShortDto";
import { useAppSelector } from "api/hooks/redux";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import UserHistoryTable from "./UserHistoryTable";

const langPage = lang.pages.money.history;
interface IProps extends IPageOrModal {
    userId?: number;
}

function MoneyUserHistory({ userId, modalProps }: IProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<any[]>([]);
    const currentUserId = useAppSelector((s) => s.user.user?.id);
    const { showError } = useNotifier();

    useEffect(() => {
        setIsLoading(true);
        money
            .userHistory(userId)
            .then((res) => {
                const { error, result } = webApiResultData<IMoneyDto[]>(res);
                if (error) {
                    throw error;
                }
                setHistory(result?.length ? result : []);
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.history);
                setHistory([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    return (
        <PageOrModal
            title={langPage.title}
            modalProps={modalProps}
            isLoading={isLoading}
        >
            <UserHistoryTable
                history={history}
                userId={userId || currentUserId || 0}
                isLoading={isLoading}
            />
        </PageOrModal>
    );
}
export default MoneyUserHistory;
