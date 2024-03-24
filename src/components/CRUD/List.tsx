//import Table, { ITableConfig, TTableRowClick } from '../Table'
import { useEffect, useMemo, useState } from "react";

import lang, { sprintf } from "lang";
import Table, { ITableField } from "components/Table";

import { useNotifier } from "api/hooks/useNotifier";
import { ISortData } from "api/interfaces/data/ISortData";
import { webApiResultData } from "api/data";
import { IWebDataResult } from "api/interfaces/data/IWebDataResult";

import Confirm, { IConfirmProps } from "../Confirm";

import { ICRUDAction, TCRUDActionCb, TCRUDActionCbName } from ".";

const langPage = lang.components.crud;

export interface ICRUDListConfig {
    isMultiselection?: boolean;
    fields: ITableField[];
    orderBy: ISortData;
    transform?: (data: any) => any;
}
interface IProps {
    config: ICRUDListConfig;
    onSelectId: (activeId: number) => void;
    actions: ICRUDAction[];
    rowId?: string;
    onIsLoading: (isLoading: boolean) => void;
    needUpdate: string;
}
export default function CRUDList({ config, needUpdate = "", actions, onSelectId, rowId = "id", onIsLoading }: IProps) {
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [deleteConfirm, setDeleteConfirm] = useState<IConfirmProps | null>(null);
    const [listData, setListData] = useState<any[]>([]);
    const { showError, showSuccess } = useNotifier();
    useEffect(() => {
        loadList();
    }, [needUpdate]);
    const actionsList = useMemo(() => {
        const getTableAction = (actionName: TCRUDActionCbName) => {
            let res: any = {
                name: actionName,
                icon: actionName,
                onClick: (a: any) => {},
                disabled: false,
            };
            switch (actionName) {
                case "add":
                    res.color = "primary";
                    res.onClick = () => {
                        onSelectId(0);
                    };
                    break;
                case "edit":
                    res.color = "primary";
                    res.disabled = selectedRows.length !== 1;
                    res.onClick = (data: any) => {
                        if (data.length) {
                            onSelectId(data[0]);
                        }
                    };
                    break;
                case "delete":
                    res.color = "error";
                    res.disabled = !selectedRows.length;
                    res.onClick = () => {
                        setDeleteConfirm({
                            open: true,
                            title: langPage.deleteConfirm.title,
                            text: sprintf(langPage.deleteConfirm.text, selectedRows.length),
                            okText: langPage.deleteConfirm.okText,
                            otherProps: selectedRows.map((x) => x?.[rowId]),
                        });
                    };
                    break;
            }
            return res;
        };
        const tableActions = [];
        for (const action of actions) {
            if (action.name !== "list" && action.name !== "save") {
                tableActions.push(getTableAction(action.name));
            }
        }
        return tableActions;
    }, [actions, selectedRows]);
    const loadList = () => {
        const action = actions.find((x) => x.name === "list");
        if (action) {
            onIsLoading(true);
            action
                .cb()
                .then((res) => {
                    const { error, result } = webApiResultData<any>(res);
                    if (error) {
                        throw error;
                    }
                    if (result?.length) {
                        setListData(result?.length ? (!!config.transform ? result.map(config.transform) : result) : []);
                    }
                })
                .catch((err) => {
                    showError(err?.name === "webApiResultError" ? err.message : langPage.errors.list);
                })
                .finally(() => {
                    onIsLoading(false);
                });
        }
    };
    const onDeleteConfirmed = (result: boolean) => {
        if (result && deleteConfirm?.otherProps.length) {
            const action = actions.find((x) => x.name === "delete");
            if (action) {
                onIsLoading(true);
                action
                    .cb(deleteConfirm.otherProps)
                    .then((res) => {
                        const { error, result } = webApiResultData<any>(res);
                        if (error) {
                            throw error;
                        }
                        if (result) {
                            showSuccess(sprintf(langPage.success.delete, deleteConfirm.otherProps.length));
                            loadList();
                        }
                    })
                    .catch((err) => {
                        showError(err?.name === "webApiResultError" ? err.message : langPage.errors.delete);
                    })
                    .finally(() => {
                        onIsLoading(false);
                    });
            }
        }
        setDeleteConfirm(null);
    };
    const onSelected = (rows: any[]) => {
        setSelectedRows(rows);
    };
    /*const onDoubleClick = (row: any) => {
        navigator(basePath + "/" + row[rowId]);
    };*/
    return (
        <>
            <Table
                fields={config.fields}
                values={listData}
                order={config.orderBy}
                onSelectedRows={onSelected}
                isMultiSelection={config.isMultiselection}
                actions={actionsList}
            />
            {!!deleteConfirm && (
                <Confirm
                    onClose={onDeleteConfirmed}
                    {...deleteConfirm}
                />
            )}
        </>
    );
}
