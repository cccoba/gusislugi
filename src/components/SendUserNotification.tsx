import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

import lang from "lang";

import Modal from "./Modal";
import { messages, webApiResultData } from "api/data";
import { useNotifier } from "api/hooks/useNotifier";

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
        >
            <TextField
                fullWidth
                label={langPage.title}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                sx={{ mt: 2 }}
                multiline
            />
            <Box textAlign="right">
                <Button
                    onClick={onCancel}
                    color="inherit"
                >
                    {lang.cancel}
                </Button>
                <Button
                    onClick={onSend}
                    color="primary"
                    autoFocus
                    disabled={!message?.length}
                >
                    {lang.send}
                </Button>
            </Box>
        </Modal>
    );
}
export default SendUserNotification;
