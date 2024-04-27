import { useState } from "react";

import Page from "components/Page";

import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { generateGuid } from "api/common/helper";
import { RolePermissionFlagAll } from "api/enums/RolePermissionFlag";

import CRUDAsyncEdit from "./Edit";
import CRUDAsyncList from "./List";

import { ICRUDAsyncProps } from ".";

export type TCRUDAsyncActionCbName = "list" | "add" | "edit" | "delete" | "save";
export type TCRUDAsyncActionCb = (params?: any) => Promise<IWebDataResult<any>>;
export interface ICRUDAsyncAction {
    name: TCRUDAsyncActionCbName;
    cb: TCRUDAsyncActionCb;
    cbArgs?: any[];
}

export default function CRUDAsyncMain({
    listConfig,
    editConfig,
    actions,
    icon = "",
    initialValue,
    title,
    roles,
    permissions,
    withOutPage = false,
}: ICRUDAsyncProps) {
    const [activeId, setActiveId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [needUpdate, setNeedUpdate] = useState("");
    const hideEdit = () => {
        setActiveId(null);
    };
    const toUpdate = () => {
        setNeedUpdate(generateGuid());
    };
    if (withOutPage) {
        return (
            <>
                {activeId !== null && (
                    <CRUDAsyncEdit
                        showVariant="modal"
                        config={editConfig}
                        actions={actions}
                        id={activeId}
                        onClose={hideEdit}
                        onIsLoading={setIsLoading}
                        onSaved={toUpdate}
                        initialValue={initialValue}
                        permissions={typeof permissions === "undefined" ? RolePermissionFlagAll : permissions}
                    />
                )}
                <CRUDAsyncList
                    config={listConfig}
                    actions={actions}
                    onSelectId={setActiveId}
                    onIsLoading={setIsLoading}
                    needUpdate={needUpdate}
                    initialValue={initialValue}
                    permissions={typeof permissions === "undefined" ? RolePermissionFlagAll : permissions}
                />
            </>
        );
    }
    return (
        <Page
            title={title}
            icon={icon}
            isLoading={isLoading}
            roles={roles}
        >
            {activeId !== null && (
                <CRUDAsyncEdit
                    showVariant="modal"
                    config={editConfig}
                    actions={actions}
                    id={activeId}
                    onClose={hideEdit}
                    onIsLoading={setIsLoading}
                    onSaved={toUpdate}
                    initialValue={initialValue}
                    permissions={typeof permissions === "undefined" ? RolePermissionFlagAll : permissions}
                />
            )}
            <CRUDAsyncList
                config={listConfig}
                actions={actions}
                onSelectId={setActiveId}
                onIsLoading={setIsLoading}
                needUpdate={needUpdate}
                initialValue={initialValue}
                permissions={typeof permissions === "undefined" ? RolePermissionFlagAll : permissions}
            />
        </Page>
    );
}
