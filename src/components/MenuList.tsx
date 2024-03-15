import { ReactNode, useState } from "react";
import { Box, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

import { ISelectValue } from "./Inputs/Select";
import Icon from "./Icon";

interface IProps {
    children: ReactNode;
    display?: "block" | "none" | "inline";
    values: ISelectValue[];
    value?: any;
    onChange?: (result: ISelectValue) => void;
}

function MenuList({ display = "inline", children, values = [], value, onChange }: IProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const showMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const closeMenu = (value: any) => {
        setAnchorEl(null);
        if (onChange) {
            onChange(value);
        }
    };
    return (
        <>
            <Box
                onClick={showMenu}
                display={display}
            >
                {children}
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => closeMenu(null)}
                variant="selectedMenu"
            >
                {values.map((x) => (
                    <MenuItem
                        key={x.id}
                        selected={x.id === value}
                        onClick={() => closeMenu(x)}
                    >
                        {!!x?.icon && (
                            <ListItemIcon>
                                <Icon name={x.icon} />
                            </ListItemIcon>
                        )}
                        <ListItemText>{x.title}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
export default MenuList;
