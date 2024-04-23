import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { messages, webApiResultData } from "api/data";
import { useNotifier } from "api/hooks/useNotifier";

import lang from "lang";

import Modal from "./Modal";
import Form from "./Form";

export interface ISendUserNotificationProps {
    text: string;
    title?: string;
    uid: number;
}
interface IProps extends ISendUserNotificationProps {
    onClose: (result: boolean) => void;
}

const langPage = lang.components.sendUserNotification;

function SendUserNotification({ text, title, uid, onClose }: IProps) {
    const [message, setMessage] = useState(text);
    const { showError } = useNotifier();
    useEffect(() => {
        setMessage(text);
    }, [text]);
    const onSend = () => {
        messages
            .send(uid, message)
            .then((res) => {
                const { error, result } = webApiResultData<boolean>(res);
                if (error) {
                    throw error;
                }
                onClose(!!result);
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.send);
            });
    };
    const onCancel = () => {
        onClose(false);
    };

    return (
        <Modal
            open
            title={title || langPage.title}
            responsiveWidth
            withCloseButton
            onClose={onCancel}
        >
            <Form
                values={{ text }}
                fields={[
                    {
                        name: "text",
                        title: langPage.title,
                        type: "text",
                        required: true,
                        fieldProps: { multiline: true },
                    },
                ]}
                onCancel={onCancel}
                onSubmit={onSend}
                submitBtnText={lang.send}
            />
        </Modal>
    );
}
export default SendUserNotification;
