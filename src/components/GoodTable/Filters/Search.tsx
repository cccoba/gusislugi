import lang from "lang";
import { IGoodTableField } from "..";
import IconButton from "components/Icon/IconButton";
import { Menu, MenuItem, Paper } from "@mui/material";
import { useMemo, useState } from "react";
import InputSearch from "components/Inputs/InputSearch";
import GoodTableSearchFilter from "./Filter";
import { TFilterValue } from "api/interfaces/components/GoodTable";

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
    }, [field.name, filter]);
    const toMenuClose = () => {
        setAnchorEl(null);
    };
    const toMenuShow = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const toFilterChange = (value: TFilterValue | null) => {
        onFilterChanged(value, field.name);
    };
    if (field.format === "image" || field.format === "component") {
        return null;
    }
    return (
        <>
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
            <IconButton
                name="search"
                size="small"
                color={isActive ? "primary" : "default"}
                onClick={toMenuShow}
            />
        </>
    );
}

export default GoodTableSearch;
