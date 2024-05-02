import { useEffect, useState } from "react";

import lang from "lang";

import { MessageStatusEnum } from "api/enums/MessageStatusEnum";
import { messages, webApiResultData } from "api/data";
import { useNotifier } from "api/hooks/useNotifier";

import Modal from "./Modal";
import Form from "./Form";

export interface ISendUserNotificationProps {
    text: string;
    title?: string;
    uid: number;
}
interface IProps extends ISendUserNotificationProps {
    status: MessageStatusEnum;
    onClose: (result: boolean) => void;
}

const langPage = lang.components.sendUserNotification;

function SendUserNotification({ text, title, uid, status, onClose }: IProps) {
    const { showError } = useNotifier();
    const onSend = (data: any) => {
        messages
            .send(uid, data.text, status)
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
