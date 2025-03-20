import { useEffect, useMemo, useState } from "react";

import lang from "lang";
import PageOrModal from "components/Page/PageOrModal";
import { TFormField } from "components/Form/FormAdapters";
import { IFormGroup } from "components/Form";

import { RolePermissionFlag } from "api/enums/RolePermissionFlag";
import { checkFlagIncludes } from "api/common/enumHelper";
import { useNotifier } from "api/hooks/useNotifier";
import { webApiResultData } from "api/data";
import useParamsId from "api/hooks/useParamsId";

import { ICRUDAsyncAction } from "./Main";
import CRUDAsyncForm from "./Form";

export interface ICRUDAsyncEditConfig {
    editTitle?: string;
    addTitle?: string;
    fields: TFormField[];
    groups?: IFormGroup[];
}

interface IProps {
    actions: ICRUDAsyncAction[];
    config: ICRUDAsyncEditConfig;
    id?: number;
    initialValue?: any;
    showVariant: "page" | "modal";
    backUrl?: string;
    permissions: RolePermissionFlag;
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
    permissions,
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
                responsiveWidth: true,
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
        if (idValue) {
            return config?.editTitle || langPage.editTitle;
        }
        return config?.addTitle || langPage.addTitle;
    }, [idValue, config.editTitle, config.addTitle]);
    useEffect(() => {
        if (idValue) {
            const action = actions.find((x) => x.name === "getRecord");
            if (action && checkFlagIncludes(permissions, RolePermissionFlag.Edit)) {
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
            if (typeof initialValue !== "undefined" && checkFlagIncludes(permissions, RolePermissionFlag.Add)) {
                setData({ ...initialValue });
            } else {
                showError(langPage.errors.initialValue);
            }
        }
    }, [idValue]);
    const toSubmit = (newData: any) => {
        const action = actions.find((x) => x.name === "save");
        if (action) {
            onIsLoading(true);
            action
                .cb(newData, data)
                .then((res) => {
                    const { error, result } = webApiResultData<any>(res);
                    if (error) {
                        throw error;
                    }
                    if (result) {
                        showSuccess(langPage.success.save);
                        onSaved();
                    }
                    onClose();
                })
                .catch((err) => {
                    showError(err?.name === "webApiResultError" ? err.message : langPage.errors.save);
                })
                .finally(() => {
                    onIsLoading(false);
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
                groups={config?.groups}
                onSubmit={toSubmit}
                onCancel={onClose}
            />
        </PageOrModal>
    );
}
