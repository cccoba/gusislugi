import { useMemo, useState } from "react";
import { Box, List, ListSubheader } from "@mui/material";

import { IListItem } from "components/List";
import { IGoodTableToolbarAction } from "components/GoodTable";
import GoodTableToolbar from "components/GoodTable/TableToolbar";

import useDebounce from "api/hooks/useDebounce";
import { textFilter } from "api/common/filters";

import TreeItem from "./Item";
export interface ITreeItem extends IListItem {
    childrens?: ITreeItem[];
}
interface IProps {
    type?: "table" | "input";
    values: ITreeItem[];
    label?: string;
    value?: number | string;
    onSelect: (value: number | string) => void;
    isNotRoot?: boolean;
    actions?: IGoodTableToolbarAction<ITreeItem>[];
}

function filterValue(value: ITreeItem, searchText: string) {
    if (searchText.length) {
        if (textFilter(searchText, value.title) || textFilter(searchText, value?.subTitle || "")) {
            return true;
        }
        if (value.childrens?.length) {
            for (const children of value.childrens) {
                if (filterValue(children, searchText)) {
                    return true;
                }
            }
        }
        return false;
    }
    return true;
}

function TreeViewer({ type = "table", isNotRoot = false, values = [], label, value, actions = [], onSelect }: IProps) {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const filteredValues = useMemo(() => {
        if (values?.length) {
            return values.filter((x) => filterValue(x, debouncedSearch));
        }
        return [];
    }, [values, debouncedSearch]);
    return (
        <>
            {!!actions && type === "table" && !isNotRoot && (
                <GoodTableToolbar
                    actions={actions}
                    selectedRows={!!value ? [{ id: value, title: "" }] : []}
                    onChangeSimpleSearchText={setSearch}
                />
            )}
            <List
                component={Box}
                sx={{ p: 0 }}
                subheader={label && !isNotRoot ? <ListSubheader>{label}</ListSubheader> : null}
            >
                {filteredValues.map((v) => (
                    <TreeItem
                        key={typeof v.key !== "undefined" ? v.key : v.id}
                        {...v}
                        onSelect={onSelect}
                        value={value}
                        type={type}
                    />
                ))}
            </List>
        </>
    );
}
export default TreeViewer;
