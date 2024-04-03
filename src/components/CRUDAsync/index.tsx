import { useState } from "react";

import Page from "components/Page";

import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { generateGuid } from "api/common/helper";
import { UserRolesEnum } from "api/enums/UserRolesEnum";

import CRUDAsyncEdit, { ICRUDAsyncEditConfig } from "./Edit";
import CRUDAsyncList, { ICRUDAsyncListConfig } from "./List";

export type TCRUDAsyncActionCbName = "list" | "add" | "edit" | "delete" | "save";
export type TCRUDAsuncActionCb = (params?: any) => Promise<IWebDataResult<any>>;
export interface ICRUDAsyncAction {
    name: TCRUDAsyncActionCbName;
    cb: TCRUDAsuncActionCb;
}

interface IProps {
    listConfig: ICRUDAsyncListConfig;
    editConfig: ICRUDAsyncEditConfig;
    actions: ICRUDAsyncAction[];
    icon?: string;
    title: string;
    initialValue?: any;
    roles?: UserRolesEnum[];
}

export default function CRUDAsync({ listConfig, editConfig, actions, icon = "", initialValue, title, roles }: IProps) {
    const [activeId, setActiveId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [needUpdate, setNeedUpdate] = useState("");
    const hideEdit = () => {
        setActiveId(null);
    };
    const toUpdate = () => {
        setNeedUpdate(generateGuid());
    };
    return (
        <Page
            title={title}
            icon={icon}
            isLoading={isLoading}
            roles={roles}
        >
            {activeId !== null && (
                <CRUDAsyncEdit
                    config={editConfig}
                    actions={actions}
                    id={activeId}
                    onClose={hideEdit}
                    onIsLoading={setIsLoading}
                    onSaved={toUpdate}
                    initialValue={initialValue}
                />
            )}
            <CRUDAsyncList
                config={listConfig}
                actions={actions}
                onSelectId={setActiveId}
                onIsLoading={setIsLoading}
                needUpdate={needUpdate}
                initialValue={initialValue}
            />
        </Page>
    );
}
