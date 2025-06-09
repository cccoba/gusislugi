import { useMemo } from "react";

import dateTime from "api/common/dateTime";
import type { IMessageDto } from "api/interfaces/Messages/IMessageDto";
import { KeyValueList, Modal } from "components";
import lang from "lang";

interface IProps {
    message: IMessageDto;
    onClose: () => void;
}

export default function MessageView({ message, onClose }: IProps) {
    const langPage = lang.pages.messages;
    const values = useMemo(() => {
        return [
            {
                title: langPage.toUser,
                value: message.to_user?.firstName,
            },
            { title: lang.created_at, value: dateTime(message.created_at) },
            {
                title: langPage.message,
                value: message.message,
            },
            { title: lang.creator, value: message.creator?.firstName },
        ];
    }, [message]);
    return (
        <Modal
            open
            title={langPage.detailsTitle}
            withCloseButton
            withOkButton
            onClose={onClose}
            responsiveWidth
        >
            <KeyValueList values={values} />
        </Modal>
    );
}
