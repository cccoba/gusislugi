import { useEffect, useState } from "react";
import { Box, ButtonGroup, IconButtonProps, SxProps, Toolbar } from "@mui/material";

import { IconButton, InputSearch } from "components";

import { useAppSelector } from "api/hooks/redux";

export interface ITableToolbarAction {
    name: string;
    icon: string;
    onClick: any;
    color?: IconButtonProps["color"];
    disabled?: boolean;
}

interface IProps {
    actions?: ITableToolbarAction[];
    selectedRows: any[];
    idName: string;
    noFilter?: boolean;
    searchText?: string;
    onSearchText?: (searchText: string) => void;
}

function TableToolbar({
    actions,
    selectedRows,
    idName = "id",
    noFilter = false,
    searchText = "",
    onSearchText,
}: IProps) {
    const [searchFocus, setSearchFocus] = useState<boolean>(false);
    const deviceScreenName = useAppSelector((state) => state.device.screen.name);
    const [searchBoxSxProps, setSearchBoxSxProps] = useState<SxProps>({});
    useEffect(() => {
        if (searchFocus || deviceScreenName === "mobile") {
            setSearchBoxSxProps({ flexGrow: 20 });
            return;
        }
        setSearchBoxSxProps({});
    }, [searchFocus, deviceScreenName]);
    const onClick = (cb: ITableToolbarAction["onClick"]) => {
        if (!!cb) {
            cb(selectedRows.map((x) => x[idName]));
        }
    };
    if (!actions?.length && noFilter) {
        return null;
    }
    return (
        <Box className="noPrint">
            <Toolbar
                disableGutters
                sx={{ justifyContent: "flex-end", flexWrap: "wrap" }}
            >
                {!!actions?.length && (
                    <Box sx={{ justifyContent: "flex-end" }}>
                        <ButtonGroup>
                            {actions.map((action) => {
                                return (
                                    <IconButton
                                        key={action.name}
                                        name={action.icon}
                                        onClick={() => onClick(action.onClick)}
                                        color={!!action?.color ? action.color : "primary"}
                                        disabled={!!action?.disabled}
                                    />
                                );
                            })}
                        </ButtonGroup>
                    </Box>
                )}

                {!noFilter && (
                    <Box sx={{ mx: 1, ...searchBoxSxProps }}>
                        <InputSearch
                            showSearchIcon
                            fullWidth
                            value={searchText}
                            onChangeValue={onSearchText}
                            onFocus={() => setSearchFocus(true)}
                            onBlur={() => setSearchFocus(false)}
                            autoComplete="off"
                        />
                    </Box>
                )}
            </Toolbar>
        </Box>
    );
}
export default TableToolbar;
