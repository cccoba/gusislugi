import { useMemo, useState } from "react";

import lang from "lang";
import type { IGoodTableToolbarAction } from "components";
import { GoodTable, Icon, Page } from "components";

import { messages } from "api/data";

import type { IMessageDto } from "api/interfaces/Messages/IMessageDto";
import type { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import useLoadApiData from "api/hooks/useLoadApiData";
import { cutText } from "api/common/helper";

import { useAppSelector } from "api/hooks/redux";

import { checkFlagIncludes } from "api/common/enumHelper";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";

import { getMessageIconName } from "./Messages";
import MessageView from "./View";
import MessageAdd from "./Add";

export default function Messages({ ...pageProps }: IPageWithRoles) {
    const langPage = lang.pages.messages;
    const { data, isLoading, error, refetch } = useLoadApiData<IMessageDto[]>(messages.getAll, []);
    const currentUserParams = useAppSelector((s) => s.user.user?.role.params);
    const [isAddShowed, setIsAddShowed] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<IMessageDto | null>(null);
    const actions = useMemo<IGoodTableToolbarAction<IMessageDto>[]>(() => {
        const newActions: IGoodTableToolbarAction<IMessageDto>[] = [];
        if (currentUserParams?.messages) {
            if (checkFlagIncludes(currentUserParams.messages, RolePermissionFlag.View)) {
                newActions.push({
                    name: "refetch",
                    icon: "refresh",
                    onClick: refetch,
                });
            }
            if (checkFlagIncludes(currentUserParams.messages, RolePermissionFlag.Add)) {
                newActions.push({
                    name: "add",
                    icon: "add",
                    onClick: toAdd,
                });
            }
        }
        return newActions;
    }, [currentUserParams]);
    const values = useMemo<any[]>(() => {
        if (!data?.length) return [];
        return data.map((x) => ({
            ...x,
            toUserName: x.to_user?.firstName,
            shortText: cutText(x.message, 50),
            statusComponent: (
                <Icon
                    name={getMessageIconName(x.status)}
                    fontSize="small"
                    color="primary"
                />
            ),
        }));
    }, [data]);
    function toAdd() {
        setIsAddShowed(true);
    }
    function toView(data: IMessageDto) {
        setSelectedMessage(data);
    }
    const onAddClosed = (needUpdate: boolean) => {
        setIsAddShowed(false);
        if (needUpdate) {
            refetch();
        }
    };
    return (
        <Page
            title={langPage.title}
            {...pageProps}
        >
            {!!isAddShowed && <MessageAdd onClose={onAddClosed} />}
            {!!selectedMessage && (
                <MessageView
                    message={selectedMessage}
                    onClose={() => setSelectedMessage(null)}
                />
            )}
            <GoodTable<IMessageDto>
                loading={isLoading}
                fields={[
                    { name: "statusComponent", title: lang.type, format: "component" },
                    { name: "toUserName", title: langPage.toUser, wrap: true },
                    { name: "created_at", title: lang.created_at, format: "date" },
                    { name: "shortText", title: langPage.message, wrap: true },
                ]}
                values={values}
                actions={actions}
                onRowClick={toView}
            />
        </Page>
    );
}
