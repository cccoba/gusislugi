import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import lang from "lang";

import CRUDEdit, { ICRUDEditConfig } from "./Edit";
import CRUDList, { ICRUDListConfig } from "./List";
import Page from "components/Page";
import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { generateGuid } from "api/common/helper";

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
}

export default function CRUD({ listConfig, editConfig, actions, icon = "", title }: IProps) {
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
        >
            {activeId !== null && (
                <CRUDEdit
                    config={editConfig}
                    actions={actions}
                    id={activeId}
                    onClose={hideEdit}
                    onIsLoading={setIsLoading}
                    onSaved={toUpdate}
                />
            )}
            <CRUDList
                config={listConfig}
                actions={actions}
                onSelectId={setActiveId}
                onIsLoading={setIsLoading}
                needUpdate={needUpdate}
            />
        </Page>
    );
}
