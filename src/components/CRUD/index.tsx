import { useState } from "react";

import Page from "components/Page";

import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { generateGuid } from "api/common/helper";

import CRUDEdit, { ICRUDEditConfig } from "./Edit";
import CRUDList, { ICRUDListConfig } from "./List";
import { UserRolesEnum } from "api/enums/UserRolesEnum";

export type TCRUDActionCbName = "list" | "add" | "edit" | "delete" | "save";
export type TCRUDActionCb = (params?: any) => Promise<IWebDataResult<any>>;
export interface ICRUDAction {
    name: TCRUDActionCbName;
    cb: TCRUDActionCb;
}

interface IProps {
    listConfig: ICRUDListConfig;
    editConfig: ICRUDEditConfig;
    actions: ICRUDAction[];
    icon?: string;
    title: string;
    initialValue?: any;
    roles?: UserRolesEnum[];
}

export default function CRUD({ listConfig, editConfig, actions, icon = "", initialValue, title, roles }: IProps) {
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
                <CRUDEdit
                    config={editConfig}
                    actions={actions}
                    id={activeId}
                    onClose={hideEdit}
                    onIsLoading={setIsLoading}
                    onSaved={toUpdate}
                    initialValue={initialValue}
                />
            )}
            <CRUDList
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
