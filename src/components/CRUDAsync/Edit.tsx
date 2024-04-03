import { useEffect, useMemo, useState } from "react";

import lang from "lang";

import Modal from "components/Modal";
import { useNotifier } from "api/hooks/useNotifier";
import { webApiResultData } from "api/data";

import Form, { TFormField } from "../Form";

import { ICRUDAsyncAction } from ".";

export interface ICRUDAsyncEditConfig {
    editTitle?: string;
    addTitle?: string;
    fields: TFormField[];
}

interface IProps {
    actions: ICRUDAsyncAction[];
    config: ICRUDAsyncEditConfig;
    id: number;
    initialValue?: any;
    onClose: () => void;
    onIsLoading: (isLoading: boolean) => void;
    onSaved: () => void;
}
const langPage = lang.components.crud;

export default function CRUDAsyncEdit({
    id,
    config,
    actions = [],
    initialValue,
    onClose,
    onIsLoading,
    onSaved,
}: IProps) {
    const [data, setData] = useState<any>(null);
    const { showError, showSuccess } = useNotifier();
    const title = useMemo(() => {
        if (!!id) {
            return config?.editTitle || langPage.editTitle;
        }
        return config?.addTitle || langPage.addTitle;
    }, [id, config.editTitle, config.addTitle]);
    useEffect(() => {
        if (id) {
            const action = actions.find((x) => x.name === "edit");
            if (action) {
                onIsLoading(true);
                action
                    .cb(id)
                    .then((res) => {
                        const { error, result } = webApiResultData<any>(res);
                        if (error) {
                            throw error;
                        }
                        if (result) {
                            setData(result);
                        }
                    })
                    .catch((err) => {
                        showError(err?.name === "webApiResultError" ? err.message : langPage.errors.edit);
                        onClose();
                    })
                    .finally(() => {
                        onIsLoading(false);
                    });
            }
        } else if (id === 0 && typeof initialValue !== "undefined") {
            setData({ ...initialValue });
        }
    }, [id]);
    const toSubmit = (data: any) => {
        const action = actions.find((x) => x.name === "save");
        if (action) {
            onIsLoading(true);
            action
                .cb(data)
                .then((res) => {
                    const { error, result } = webApiResultData<any>(res);
                    if (error) {
                        throw error;
                    }
                    if (result) {
                        showSuccess(langPage.success.save);
                        onSaved();
                    }
                })
                .catch((err) => {
                    showError(err?.name === "webApiResultError" ? err.message : langPage.errors.save);
                })
                .finally(() => {
                    onIsLoading(false);
                    onClose();
                });
        }
    };

    return (
        <Modal
            open
            title={title}
            withCloseButton
            onClose={onClose}
        >
            {!!data && (
                <Form
                    onSubmit={toSubmit}
                    fields={config.fields}
                    values={data}
                    onCancel={onClose}
                />
            )}
        </Modal>
    );
}
