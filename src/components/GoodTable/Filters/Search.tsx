import { useMemo, useState } from "react";
import { Box, Menu } from "@mui/material";

import IconButton from "components/Icon/IconButton";

import type { TFilterValue } from "api/interfaces/components/GoodTable";

import type { IGoodTableField } from "..";

import GoodTableSearchFilter from "./Filter";

interface IProps {
    field: IGoodTableField;
    filter?: TFilterValue;
    onFilterChanged: (newFilter: TFilterValue | null, name: string) => void;
    onFilterClear: (name: string) => void;
}

function GoodTableSearch({ field, filter, onFilterChanged, onFilterClear }: IProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const isActive = useMemo(() => {
        return typeof filter !== "undefined";
    }, [filter]);
    const toMenuClose = () => {
        setAnchorEl(null);
    };
    const toMenuShow = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const toFilterChange = (value: TFilterValue | null) => {
        switch (field.format) {
            case "boolean":
                onFilterChanged(value, field.name);
                break;
            default:
                if (value) {
                    onFilterChanged(value, field.name);
                }
        }
    };
    const toFilterClear = () => {
        onFilterClear(field.name);
    };
    if (field.format === "image" || field.format === "component") {
        return null;
    }
    return (
        <Box
            sx={{ display: "flex" }}
            className="goodTableFilterBox"
        >
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={toMenuClose}
            >
                <GoodTableSearchFilter
                    field={field}
                    filter={filter}
                    onChangeValue={toFilterChange}
                    onCloseSearchFilter={toMenuClose}
                />
            </Menu>
            {isActive && (
                <IconButton
                    name="filter"
                    size="small"
                    color="primary"
                    onClick={toFilterClear}
                    sx={{ p: 0 }}
                />
            )}
            <IconButton
                name="more"
                size="small"
                onClick={toMenuShow}
                sx={{ p: 0 }}
                className="goodTableFilterMenu"
            />
        </Box>
    );
}

export default GoodTableSearch;
