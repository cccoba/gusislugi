import { useMemo, useState } from "react";
import { Box, Menu } from "@mui/material";

import IconButton from "components/Icon/IconButton";

import { TFilterValue } from "api/interfaces/components/GoodTable";

import { IGoodTableField } from "..";

import GoodTableSearchFilter from "./Filter";

interface IProps {
    field: IGoodTableField;
    filter?: TFilterValue;
    onFilterChanged: (newFilter: TFilterValue | null, name: string) => void;
}

function GoodTableSearch({ field, filter, onFilterChanged }: IProps) {
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
        onFilterChanged(value, field.name);
    };
    const toFilterClear = () => {
        toFilterChange(null);
    };
    if (field.format === "image" || field.format === "component") {
        return null;
    }
    return (
        <Box>
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
                />
            )}
            <IconButton
                name="more"
                size="small"
                onClick={toMenuShow}
            />
        </Box>
    );
}

export default GoodTableSearch;
