import { useEffect, useMemo, useState } from "react";

import lang, { sprintf } from "lang";
import GoodTable, { IGoodTableToolbarAction, IGoodTableField } from "components/GoodTable";
import TreeViewer, { ITreeItem } from "components/TreeViewer";

import { useNotifier } from "api/hooks/useNotifier";
import { ISortData } from "api/interfaces/components/GoodTable";
import { webApiResultData } from "api/data";

import Confirm, { IConfirmProps } from "../Confirm";

import { ICRUDAsyncAction, TCRUDAsyncActionCbName } from "./Main";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";
import { checkFlagIncludes } from "api/common/enumHelper";

const langPage = lang.components.crud;

export interface ICRUDAsyncListConfig {
    isMultiSelection?: boolean;
    fields: IGoodTableField[];
    orderBy: ISortData;
    toTreeView?: (data: any[]) => ITreeItem[];
    transform?: (data: any) => any;
}
interface IProps {
    config: ICRUDAsyncListConfig;
    actions: ICRUDAsyncAction[];
    rowId?: string;

    needUpdate: string;
    initialValue?: any;

    permissions: RolePermissionFlag;
    onIsLoading: (isLoading: boolean) => void;
    onSelectId: (activeId: number) => void;
}
export default function CRUDAsyncList({
    config,
    needUpdate = "",
    actions,
    rowId = "id",
    initialValue,
    permissions,
    onSelectId,
    onIsLoading,
}: IProps) {
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [deleteConfirm, setDeleteConfirm] = useState<IConfirmProps | null>(null);
    const [listData, setListData] = useState<any[]>([]);
    const { showError, showSuccess } = useNotifier();
    useEffect(() => {
        loadList();
    }, [needUpdate]);
    const actionsList = useMemo(() => {
        const getTableAction = (actionName: TCRUDAsyncActionCbName | "add") => {
            const res: IGoodTableToolbarAction<any> = {
                name: actionName,
                icon: actionName,
                onClick: (a: any) => {},
                disable: () => false,
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
                    res.disable = (selectedRows) => selectedRows?.length !== 1;
                    res.onClick = (data: any) => {
                        if (data.length) {
                            onSelectId(data[0][rowId]);
                        }
                    };
                    break;
                case "delete":
                    res.color = "error";
                    res.disable = (selectedRows) => !selectedRows?.length;
                    res.onClick = (selectedRows) => {
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
        if (typeof initialValue !== "undefined" && checkFlagIncludes(permissions, RolePermissionFlag.Add)) {
            tableActions.push(getTableAction("add"));
        }
        for (const action of actions) {
            if (action.name !== "list" && action.name !== "save") {
                switch (action.name) {
                    case "delete":
                        if (checkFlagIncludes(permissions, RolePermissionFlag.Delete)) {
                            tableActions.push(getTableAction(action.name));
                        }
                        break;
                    case "edit":
                        if (checkFlagIncludes(permissions, RolePermissionFlag.Edit)) {
                            tableActions.push(getTableAction(action.name));
                        }
                        break;
                }
            }
        }

        return tableActions;
    }, [actions, selectedRows, initialValue, rowId, permissions]);
    const loadList = () => {
        const action = actions.find((x) => x.name === "list");
        if (action && checkFlagIncludes(permissions, RolePermissionFlag.View)) {
            onIsLoading(true);
            action
                .cb()
                .then((res) => {
                    const { error, result } = webApiResultData<any>(res);
                    if (error) {
                        throw error;
                    }
                    if (result) {
                        setListData(result?.length ? (!!config.transform ? result.map(config.transform) : result) : []);
                    }
                })
                .catch((err) => {
                    showError(err?.name === "webApiResultError" ? err.message : langPage.errors.list);
                })
                .finally(() => {
                    onIsLoading(false);
                    setSelectedRows([]);
                });
        }
    };
    const onRowDoubleClick = (row: any) => {
        const action = actions.find((x) => x.name === "edit");
        if (action && checkFlagIncludes(permissions, RolePermissionFlag.Edit)) {
            onSelectId(row.id);
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

    return (
        <>
            {!!config?.toTreeView ? (
                <TreeViewer
                    values={config.toTreeView(listData)}
                    actions={actionsList}
                    onSelect={(value) => onSelected([{ id: value }])}
                    value={selectedRows?.length ? selectedRows[0][rowId] : null}
                />
            ) : (
                <GoodTable
                    fields={config.fields}
                    values={listData}
                    order={config.orderBy}
                    onSelectedRows={onSelected}
                    isMultiSelection={config.isMultiSelection}
                    actions={actionsList}
                    onRowDoubleClick={onRowDoubleClick}
                />
            )}
            {!!deleteConfirm && (
                <Confirm
                    onClose={onDeleteConfirmed}
                    {...deleteConfirm}
                />
            )}
        </>
    );
}
