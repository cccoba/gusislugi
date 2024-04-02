import { useState } from "react";
import { Box, ButtonGroup, Toolbar, Typography } from "@mui/material";

import IconButton from "components/Icon/IconButton";
import lang from "lang";
import InputSearch from "components/Inputs/InputSearch";

import { IGoodTableToolbarAction } from ".";

interface IProps<T> {
    title?: string;
    actions?: IGoodTableToolbarAction<T>[];
    selectedRows: T[];
    withoutSimpleTextFilter?: boolean;
    onChangeSimpleSearchText: (search: string) => void;
}

const langPage = lang.components.goodTable.toolbar;

function GoodTableToolbar<T>({
    title,
    actions = [],
    selectedRows = [],
    onChangeSimpleSearchText,
    withoutSimpleTextFilter = false,
}: IProps<T>) {
    const [searchText, setSearchText] = useState("");
    const toSearchText = (newSearch: string) => {
        setSearchText(newSearch);
        onChangeSimpleSearchText(newSearch);
    };
    const onClick = (actionName: string) => {
        if (actions?.length) {
            const action = actions.find((x) => x.name === actionName);
            if (action?.onClick) {
                action.onClick(selectedRows);
            }
        }
    };
    if (!title && !actions?.length && withoutSimpleTextFilter) {
        return null;
    }
    return (
        <Toolbar
            disableGutters
            variant="dense"
            sx={{ justifyContent: "space-between" }}
        >
            <Box sx={{ flexGrow: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ mx: 1 }}>
                    {!!title && (
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            {title}
                        </Typography>
                    )}
                </Box>
                {!withoutSimpleTextFilter && (
                    <Box sx={{ mx: 1, flexGrow: 5, minWidth: "50%" }}>
                        <InputSearch
                            showSearchIcon
                            fullWidth
                            value={searchText}
                            onChangeValue={toSearchText}
                            autoComplete="off"
                            placeholder={langPage.search}
                            variant="standard"
                        />
                    </Box>
                )}
            </Box>
            <Box>
                {!!actions?.length && (
                    <Box sx={{ justifyContent: "flex-end" }}>
                        <ButtonGroup>
                            {actions.map((action) => {
                                return (
                                    <IconButton
                                        key={action.name}
                                        name={action.icon}
                                        onClick={() => onClick(action.name)}
                                        color={!!action?.color ? action.color : "primary"}
                                        disabled={!!action?.disable ? action.disable(selectedRows) : false}
                                        tooltip={action?.tooltip}
                                    />
                                );
                            })}
                        </ButtonGroup>
                    </Box>
                )}
            </Box>
        </Toolbar>
    );
}
export default GoodTableToolbar;
