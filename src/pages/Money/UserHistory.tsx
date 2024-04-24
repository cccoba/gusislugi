import { useEffect, useState } from "react";

import lang, { sprintf } from "lang";
import { GoodTable, Page, PageOrModal } from "components";
import { IPageOrModal } from "api/interfaces/components/Page/IPageOrModal";
import { IMoneyDto } from "api/interfaces/user/IMoneyDto";
import { money, webApiResultData } from "api/data";
import { useNotifier } from "api/hooks/useNotifier";
import { IGoodTableField } from "components/GoodTable";
import { IUserShortDto } from "api/interfaces/user/IUserShortDto";

const langPage = lang.pages.money.history;
interface Iprops extends IPageOrModal {
    userId: number;
}

const fields: IGoodTableField[] = [
    { name: "created_at", title: langPage.fields.created_at, format: "date" },
    { name: "fromUid", title: langPage.fields.fromUid },
    { name: "toUid", title: langPage.fields.toUid },
    { name: "value", title: langPage.fields.value },
];
function MoneyUserHistory({ userId, modalProps }: Iprops) {
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<any[]>([]);
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
                if (result) {
                    setHistory(
                        result?.length
                            ? result.map((x) => ({
                                  id: x.id,
                                  created_at: x.created_at,
                                  fromUid: x.hidden ? lang.unknown : x.from_user?.fullName,
                                  toUid: x.hidden ? lang.unknown : x.to_user?.fullName,
                                  value: sprintf(lang.money, x.value),
                              }))
                            : []
                    );
                }
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
            <GoodTable
                fields={fields}
                values={history}
                noRecordsText={langPage.noRecordsText}
                loading={isLoading}
            />
        </PageOrModal>
    );
}
export default MoneyUserHistory;
