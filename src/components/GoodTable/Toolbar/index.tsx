import type { ReactNode } from "react";
import { useState } from "react";
import { Box, Toolbar, Typography } from "@mui/material";

import lang from "lang";
import InputSearch from "components/Inputs/InputSearch";

import type { IGoodTableToolbarAction } from "..";

import GoodTableToolbarActions from "./Actions";

interface IProps<T> {
    title?: string | ReactNode;
    actions?: (IGoodTableToolbarAction<T> | ReactNode)[];
    selectedRows: T[];
    withoutSimpleTextFilter?: boolean;
    isMobileView: boolean;
    autoFocus?: boolean;
    csvExport?: string;
    onChangeSimpleSearchText: (search: string) => void;
    onCsvExportClick: () => void;
}

export default function GoodTableToolbar<T>({
    title,
    actions = [],
    selectedRows = [],
    withoutSimpleTextFilter = false,
    isMobileView,
    autoFocus,
    csvExport,
    onChangeSimpleSearchText,
    onCsvExportClick,
}: IProps<T>) {
    const langPage = lang.components.goodTable.toolbar;
    const [searchText, setSearchText] = useState("");
    const toSearchText = (newSearch: string) => {
        setSearchText(newSearch);
        onChangeSimpleSearchText(newSearch);
    };
    if (!title && !actions?.length && withoutSimpleTextFilter && !csvExport) {
        return null;
    }
    return (
        <Toolbar
            disableGutters
            variant="dense"
            sx={{ justifyContent: "space-between" }}
        >
            <Box
                sx={{
                    flexGrow: 100,
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    alignItems: "stretch",
                }}
            >
                <Box sx={{ textAlign: "center" }}>
                    {!title && typeof title === "string" ? (
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            {title}
                        </Typography>
                    ) : (
                        title
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
                            autoFocus={!!autoFocus}
                            debounceTime={300}
                            sx={{
                                my: 0,
                            }}
                        />
                    </Box>
                )}
            </Box>
            <GoodTableToolbarActions
                actions={actions}
                selectedRows={selectedRows}
                isMobileView={isMobileView}
                csvExport={csvExport}
                onCsvExportClick={onCsvExportClick}
            />
        </Toolbar>
    );
}
