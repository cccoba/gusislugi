import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";

import { Modal, GoodTable, type IGoodTableField, Icon, type TIconName } from "components";
import lang, { getEnumTitleValue, sprintf } from "lang";

import dateTime from "api/common/dateTime";
import { messages } from "api/data";
import { MessageStatusEnum } from "api/enums/MessageStatusEnum";
import useLoadApiData from "api/hooks/useLoadApiData";
import type { IMessageDto } from "api/interfaces/Messages/IMessageDto";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { getEnumValue } from "api/common/enumHelper";
import { cutText } from "api/common/helper";

export function getMessageIconName(status: MessageStatusEnum): TIconName {
    const result = getEnumValue(MessageStatusEnum, status) || "";
    if (result?.length) {
        switch (result) {
            case "Taxes2":
                return "wanteds2";
            case "Taxes3":
                return "wanteds";
        }
        return (result.charAt(0).toLowerCase() + result.slice(1)) as TIconName;
    }
    return "messages";
}

export default function ProfileMessages() {
    const langPage = lang.pages.messages;

    const fields: IGoodTableField[] = [
        { name: "statusComponent", title: "", format: "component" },
        { name: "shortMessage", title: langPage.message, wrap: true },
        { name: "created_at", title: langPage.date, format: "date" },
    ];
    const { data = [], isLoading, refetch } = useLoadApiData(messages.getMyMessages, []);
    const [details, setDetails] = useState<IMessageDto | null>(null);
    const [values, setValues] = useState<any[]>([]);
    useEffect(() => {
        if (data?.length) {
            setValues(
                data.map((x) => ({
                    ...x,
                    shortMessage: cutText(x.message, 100),
                    statusComponent: (
                        <Icon
                            name={getMessageIconName(x.status)}
                            fontSize="small"
                            color="primary"
                            tooltip={getEnumTitleValue(MessageStatusEnum, "MessageStatusEnum", x.status)}
                        />
                    ),
                }))
            );
        }
    }, [data]);
    const toShow = (data: any) => {
        setDetails(data);
    };
    const hideDetails = () => {
        setDetails(null);
    };

    return (
        <>
            {!!details && (
                <Modal
                    open
                    title={sprintf(langPage.detailsTitle, dateTime(details.created_at))}
                    withCloseButton
                    onClose={hideDetails}
                    actions={[<Button onClick={hideDetails}>{lang.ok}</Button>]}
                >
                    <Typography>{details.message}</Typography>
                </Modal>
            )}
            <GoodTable
                loading={isLoading}
                fields={fields}
                values={values}
                order={{ direction: SortOrderEnum.Descending, sort: "created_at" }}
                onRowClick={toShow}
                actions={[{ name: "refresh", icon: "refresh", onClick: refetch }]}
            />
        </>
    );
}
