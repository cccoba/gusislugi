import { useEffect, useMemo, useState } from "react";

import lang from "lang";
import PageOrModal from "components/Page/PageOrModal";

import { useNotifier } from "api/hooks/useNotifier";
import { webApiResultData } from "api/data";
import useParamsId from "api/hooks/useParamsId";

import { TFormField } from "../Form";

import { ICRUDAsyncAction } from "./Main";
import CRUDAsyncForm from "./Form";

export interface ICRUDAsyncEditConfig {
    editTitle?: string;
    addTitle?: string;
    fields: TFormField[];
}

interface IProps {
    actions: ICRUDAsyncAction[];
    config: ICRUDAsyncEditConfig;
    id?: number;
    initialValue?: any;
    showVariant: "page" | "modal";
    backUrl?: string;
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
    showVariant,
    backUrl,
    onClose,
    onIsLoading,
    onSaved,
}: IProps) {
    const [data, setData] = useState<any>(null);
    const { showError, showSuccess } = useNotifier();
    const paramId = useParamsId();
    const modalProps = useMemo(() => {
        if (showVariant === "modal") {
            return {
                withCloseButton: true,
                onClose,
            };
        }
        return undefined;
    }, [showVariant]);
    const idValue = useMemo(() => {
        if (showVariant === "modal") {
            return id;
        }
        return paramId;
    }, [showVariant, id, paramId]);

    const title = useMemo(() => {
        if (!!idValue) {
            return config?.editTitle || langPage.editTitle;
        }
        return config?.addTitle || langPage.addTitle;
    }, [idValue, config.editTitle, config.addTitle]);
    useEffect(() => {
        if (idValue) {
            const action = actions.find((x) => x.name === "edit");
            if (action) {
                onIsLoading(true);
                action
                    .cb(idValue)
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
        } else if (idValue === 0) {
            if (typeof initialValue !== "undefined") {
                setData({ ...initialValue });
            } else {
                showError(langPage.errors.initialValue);
            }
        }
    }, [idValue]);
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
        <PageOrModal
            modalProps={modalProps}
            title={title}
            backUrl={backUrl}
        >
            <CRUDAsyncForm
                values={data}
                fields={config.fields}
                onSubmit={toSubmit}
                onCancel={onClose}
            />
        </PageOrModal>
    );
}
