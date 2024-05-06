import { useEffect, useState } from "react";

import lang from "lang";
import { PageOrModal } from "components";

import { IPageOrModal } from "api/interfaces/components/Page/IPageOrModal";
import { IMoneyDto } from "api/interfaces/user/IMoneyDto";
import { money, webApiResultData } from "api/data";
import { useNotifier } from "api/hooks/useNotifier";
import { useAppSelector } from "api/hooks/redux";

import UserHistoryTable from "./UserHistoryTable";

const langPage = lang.pages.money.history;
interface IProps extends IPageOrModal {
    userId?: number;
    onRetry?: (data: IMoneyDto) => void;
}

function MoneyUserHistory({ userId, modalProps, onRetry }: IProps) {
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
                onRetry={onRetry}
            />
        </PageOrModal>
    );
}
export default MoneyUserHistory;
