import { useEffect, useMemo, useState } from "react";
import { Button, Typography } from "@mui/material";

import { IconButton, Modal, Table } from "components";
import { ITableField } from "components/Table";
import lang, { getEnumTitleValue, sprintf } from "lang";

import dateTime from "api/common/dateTime";
import { messages, users, webApiResultData } from "api/data";
import { MessageStatusEnum } from "api/enums/MessageStatusEnum";
import useLoadApiData from "api/hooks/useLoadApiData";
import { IMessageDto } from "api/interfaces/Messages/IMessageDto";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

interface IProps {}

const langPage = lang.pages.profile.messages;

const fields: ITableField[] = [
    { name: "statusComponent", title: "", format: "component" },
    { name: "message", title: langPage.fields.message },
    { name: "created_at", title: langPage.fields.date, format: "date" },
];

function ProfileMessages({}: IProps) {
    const { data = [], isLoading } = useLoadApiData(users.getMessages, []);
    const [details, setDetails] = useState<IMessageDto | null>(null);
    const [values, setValues] = useState<any[]>([]);
    useEffect(() => {
        if (data?.length) {
            setValues(
                data.map((x) => ({
                    ...x,
                    statusComponent:
                        x.status === MessageStatusEnum.New ? (
                            <IconButton
                                name="fiber_new"
                                size="small"
                                color="primary"
                                tooltip={getEnumTitleValue(MessageStatusEnum, "MessageStatusEnum", x.status)}
                            />
                        ) : null,
                }))
            );
        }
    }, [data]);
    const toShow = (data: any) => {
        messages.setReaded(data.id).then((res) => {
            const { error, result } = webApiResultData<boolean>(res);
            if (error) {
                throw error;
            }
            if (result) {
                setValues((prev) => {
                    const newResult = [...prev];
                    const updatedValue = newResult.find((x) => x.id === data.id);
                    if (updatedValue) {
                        updatedValue.status = MessageStatusEnum.Readed;
                        updatedValue.statusComponent = null;
                    }
                    return newResult;
                });
            }
        });
        setDetails(data);
    };
    const hideDetails = () => {
        setDetails(null);
    };
    console.log("v", values);

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
            <Table
                loading={isLoading}
                fields={fields}
                values={values}
                order={{ direction: SortOrderEnum.Descending, sort: "created_at" }}
                onSelect={toShow}
            />
        </>
    );
}
export default ProfileMessages;
