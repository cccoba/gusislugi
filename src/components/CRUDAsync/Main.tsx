import { useState } from "react";

import Page from "components/Page";

import type { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { generateGuid } from "api/common/helper";
import { RolePermissionFlagAll } from "api/enums/RolePermissionFlag";

import { isMobile } from "react-device-detect";

import CRUDAsyncEdit from "./Edit";
import CRUDAsyncList from "./List";

import type { ICRUDAsyncProps } from ".";

export type TCRUDAsyncActionCbName = "getAll" | "add" | "getRecord" | "remove" | "save";
export type TCRUDAsyncActionCb = (params?: any, initDAta?: any) => Promise<IWebDataResult<any>>;
export interface ICRUDAsyncAction {
    name: TCRUDAsyncActionCbName;
    cb: TCRUDAsyncActionCb;
    cbArgs?: any[];
}

export function getCRUDActions(
    dataActions: any,
    returnList: TCRUDAsyncActionCbName[] = ["getAll", "save", "getRecord", "remove"]
): ICRUDAsyncAction[] {
    return returnList.map((x) => ({
        name: x as TCRUDAsyncActionCbName,
        cb: dataActions[x],
    }));
}
export default function CRUDAsyncMain({
    listConfig,
    editConfig,
    actions,
    icon,
    backUrl,
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
            backUrl={backUrl}
            scrollTop
            scrollTopBottom={isMobile ? 72 : undefined}
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
