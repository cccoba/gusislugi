import { messages, webApiResultData } from "api/data";
import { useLoader } from "api/hooks/redux";
import { useNotifier } from "api/hooks/useNotifier";
import { Form } from "components";
import type { ISelectValue } from "components/Inputs/Select";
import lang, { sprintf } from "lang";

interface IProps {
    statusList: ISelectValue[];
    onClose: (needUpdate: boolean) => void;
}

export default function MessageAdd({ onClose, statusList }: IProps) {
    const langPage = lang.pages.messages;
    const { setIsLoading } = useLoader();
    const { showError, showSuccess } = useNotifier();
    const toSave = (data: any) => {
        setIsLoading(true);
        messages
            .add(data)
            .then((res) => {
                const { error, result } = webApiResultData<number>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    showSuccess(sprintf(langPage.add.success, result));
                    onClose(true);
                }
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.add.error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    const onCancel = () => {
        onClose(false);
    };
    return (
        <Form
            modalProps={{
                title: langPage.addTitle,
                onClose: onCancel,
                open: true,
                withCloseButton: true,
                responsiveWidth: true,
            }}
            fields={[
                {
                    name: "uids",
                    title: lang.users,
                    required: true,
                    type: "user",
                    multiple: true,
                },
                { name: "status", title: lang.type, required: true, type: "select", values: statusList },
                { name: "message", title: langPage.message, required: true, type: "text", multiline: true },
            ]}
            values={{
                uids: [],
                status: 0,
                message: "",
            }}
            onSubmit={toSave}
        />
    );
}
