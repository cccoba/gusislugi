import { useEffect, useMemo, useState } from "react";

import lang, { sprintf } from "lang";
import GoodTable, { IGoodTableToolbarAction, IGoodTableField } from "components/GoodTable";
import TreeViewer, { ITreeItem } from "components/TreeViewer";

import { useNotifier } from "api/hooks/useNotifier";
import { ISortData } from "api/interfaces/components/GoodTable";
import { webApiResultData } from "api/data";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";
import { checkFlagIncludes } from "api/common/enumHelper";

import Confirm, { IConfirmProps } from "../Confirm";

import { ICRUDAsyncAction, TCRUDAsyncActionCbName } from "./Main";
import { TIconName } from "components/Icon";

const langPage = lang.components.crud;

export interface ICRUDAsyncListConfig {
    isMultiSelection?: boolean;
    fields: IGoodTableField[];
    orderBy: ISortData;
    withRefresh?: boolean;
    toTreeView?: (data: any[]) => ITreeItem[];
    transform?: (data: any) => any;
}
interface IProps {
    config: ICRUDAsyncListConfig;
    actions: ICRUDAsyncAction[];
    rowId?: string;

    needUpdate: string;
    initialValue?: any;

    permissions: RolePermissionFlag | 0;
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
        const getTableAction = (actionName: TCRUDAsyncActionCbName | "add" | "refresh") => {
            const iconName: TIconName =
                actionName === "getAll"
                    ? "list"
                    : actionName === "getRecord"
                    ? "edit"
                    : actionName === "remove"
                    ? "delete"
                    : actionName;
            const res: IGoodTableToolbarAction<any> = {
                name: actionName,
                icon: iconName,
                disable: () => false,
                onClick: () => {},
            };
            switch (actionName) {
                case "add":
                    res.color = "primary";
                    res.onClick = () => {
                        onSelectId(0);
                    };
                    break;
                case "refresh":
                    res.color = "primary";
                    res.onClick = loadList;
                    break;
                case "getRecord":
                    res.color = "primary";
                    res.disable = (selectedRows) => selectedRows?.length !== 1;
                    res.onClick = (data: any) => {
                        if (data.length) {
                            onSelectId(data[0][rowId]);
                        }
                    };
                    break;
                case "remove":
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
        if (
            config.withRefresh &&
            actions.findIndex((x) => x.name === "getAll") > -1 &&
            checkFlagIncludes(permissions, RolePermissionFlag.View)
        ) {
            tableActions.push(getTableAction("refresh"));
        }

        if (typeof initialValue !== "undefined" && checkFlagIncludes(permissions, RolePermissionFlag.Add)) {
            tableActions.push(getTableAction("add"));
        }
        for (const action of actions) {
            if (action.name !== "getAll" && action.name !== "save") {
                switch (action.name) {
                    case "remove":
                        if (checkFlagIncludes(permissions, RolePermissionFlag.Delete)) {
                            tableActions.push(getTableAction(action.name));
                        }
                        break;
                    case "getRecord":
                        if (checkFlagIncludes(permissions, RolePermissionFlag.Edit)) {
                            tableActions.push(getTableAction(action.name));
                        }
                        break;
                }
            }
        }

        return tableActions;
    }, [actions, selectedRows, initialValue, rowId, permissions]);
    function loadList() {
        const action = actions.find((x) => x.name === "getAll");
        if (action && checkFlagIncludes(permissions, RolePermissionFlag.View)) {
            onIsLoading(true);
            const cb = !!action.cbArgs ? action.cb(...action.cbArgs) : action.cb();

            cb.then((res) => {
                const { error, result } = webApiResultData<any>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    setListData(result?.length ? (config?.transform ? result.map(config.transform) : result) : []);
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
    }
    const onRowDoubleClick = (row: any) => {
        const action = actions.find((x) => x.name === "getRecord");
        if (action && checkFlagIncludes(permissions, RolePermissionFlag.Edit)) {
            onSelectId(row.id);
        }
    };
    const onDeleteConfirmed = (result: boolean) => {
        if (result && deleteConfirm?.otherProps.length) {
            const action = actions.find((x) => x.name === "remove");
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
            {config?.toTreeView ? (
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
