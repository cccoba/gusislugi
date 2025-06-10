import { useEffect, useMemo, useState } from "react";

import lang, { getEnumSelectValues, getEnumTitleValue } from "lang";
import type { IGoodTableToolbarAction } from "components";
import { GoodTable, Icon, InputSelect, Page } from "components";

import { messages } from "api/data";

import type { IMessageDto } from "api/interfaces/Messages/IMessageDto";
import type { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import useLoadApiData from "api/hooks/useLoadApiData";
import { cutText } from "api/common/helper";

import { useAppSelector } from "api/hooks/redux";

import { checkFlagIncludes, getValuesByFlag } from "api/common/enumHelper";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";

import { MessageStatusEnum } from "api/enums/MessageStatusEnum";

import type { ISelectValue } from "components/Inputs/Select";

import { isMobile } from "react-device-detect";

import { getMessageIconName } from "./Messages";
import MessageView from "./View";
import MessageAdd from "./Add";

export default function Messages({ ...pageProps }: IPageWithRoles) {
    const langPage = lang.pages.messages;
    const { data, isLoading, error, refetch } = useLoadApiData<IMessageDto[]>(messages.getAll, []);
    const currentUserParams = useAppSelector((s) => s.user.user?.role.params);
    const [isAddShowed, setIsAddShowed] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<IMessageDto | null>(null);
    const [status, setStatus] = useState<MessageStatusEnum>(0);
    const roleProps = useMemo<{ actions: IGoodTableToolbarAction<IMessageDto>[]; statusList: ISelectValue[] }>(() => {
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
        let statusList = getEnumSelectValues(MessageStatusEnum, "MessageStatusEnum").map((x) => {
            if (x.id !== 0) {
                x.icon = getMessageIconName(x.id);
            }
            return x;
        });
        statusList[0].title = lang.all;
        if (currentUserParams?.messageStatuses && currentUserParams.messageStatuses > 0) {
            const availableStatuses = getValuesByFlag(currentUserParams.messageStatuses);
            availableStatuses.push(0);
            statusList = statusList.filter((x) => availableStatuses.includes(x.id));
        }
        return { actions: newActions, statusList };
    }, [currentUserParams]);

    const values = useMemo<any[]>(() => {
        if (!data?.length) return [];
        const result = data.map((x) => ({
            ...x,
            toUserName: x.to_user?.firstName,
            shortText: cutText(x.message, 50),
            statusComponent: (
                <Icon
                    name={getMessageIconName(x.status)}
                    fontSize="small"
                    color="primary"
                    tooltip={getEnumTitleValue(MessageStatusEnum, "MessageStatusEnum", x.status)}
                />
            ),
        }));
        if (status) {
            return result.filter((x) => x.status === status);
        }
        return result;
    }, [data, status]);
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
            {!!isAddShowed && (
                <MessageAdd
                    onClose={onAddClosed}
                    statusList={roleProps.statusList.filter((x) => x.id !== 0)}
                />
            )}
            {!!selectedMessage && (
                <MessageView
                    message={selectedMessage}
                    onClose={() => setSelectedMessage(null)}
                />
            )}
            {!!currentUserParams?.messageStatuses && (
                <InputSelect
                    values={roleProps.statusList}
                    value={status}
                    onChangeValue={setStatus}
                    label={lang.type}
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
                actions={roleProps.actions}
                onRowClick={toView}
            />
        </Page>
    );
}
