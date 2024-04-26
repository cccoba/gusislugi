import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { IMoneyDto } from "api/interfaces/user/IMoneyDto";
import { IUserShortDto } from "api/interfaces/user/IUserShortDto";
import GoodTable, { IGoodTableField } from "components/GoodTable";
import lang, { sprintf } from "lang";
import { useMemo } from "react";

interface IProps {
    history: IMoneyDto[];
    isLoading: boolean;
    userId: number;
}
const langPage = lang.pages.money.history;
export const fieldsMoneyUserHistory: IGoodTableField[] = [
    { name: "created_at", title: langPage.fields.created_at, format: "date" },
    { name: "fromUid", title: langPage.fields.fromUid },
    { name: "toUid", title: langPage.fields.toUid },
    { name: "value", title: langPage.fields.value },
];
function getUserName(hidden: boolean, user?: IUserShortDto, currentUserId?: number): string {
    if (!user?.firstName) {
        return lang.unknown;
    }
    if (!hidden) {
        return user.firstName;
    }
    if (user.id !== currentUserId) {
        return lang.unknown;
    }
    return user.firstName;
}
function UserHistoryTable({ history = [], isLoading, userId }: IProps) {
    const data = useMemo(() => {
        if (history?.length) {
            return history
                .map((x) => ({
                    id: x.id,
                    created_at: x.created_at,
                    fromUid: getUserName(x.hidden, x.from_user, userId),
                    toUid: getUserName(x.hidden, x.to_user, userId),
                    value: sprintf(lang.money, x.value),
                }))
                .sort((a, b) => b.id - a.id);
        }
        return [];
    }, [history, userId]);
    return (
        <GoodTable
            fields={fieldsMoneyUserHistory}
            values={data}
            noRecordsText={langPage.noRecordsText}
            loading={isLoading}
            order={{ direction: SortOrderEnum.Descending, sort: "created_at" }}
        />
    );
}
export default UserHistoryTable;
