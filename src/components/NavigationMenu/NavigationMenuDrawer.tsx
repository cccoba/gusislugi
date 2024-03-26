import { useMemo } from "react";
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

import Icon from "components/Icon";
import { menuToggle } from "store/reducers/ComponentsSlice";

import { useAppDispatch, useAppSelector } from "api/hooks/redux";
import { getServerFileUrl } from "api/common/helper";
import IconButton from "components/Icon/IconButton";

import menuList from "./menuList";

export interface INavigationMenu {
    name: string;
    title: string;
    icon: string;
    link: string;
    access?: string[];
}

function NavigationMenuDrawer() {
    const isAuth = useAppSelector((s) => s.user.isAuth);
    const user = useAppSelector((s) => s.user.user);
    const roles = useAppSelector((s) => s.user.roles);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const filteredMenuList = useMemo<INavigationMenu[]>(() => {
        return menuList.filter((x) => {
            if (x.access?.length) {
                for (const access of x.access) {
                    if (isAuth) {
                        if (user?.role.params) {
                            if (access in user.role.params) {
                                const accValue = (user.role.params as any)[access];
                                return accValue === "edit" || accValue === "view";
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        });
    }, [isAuth, user?.role.params]);
    const toProfile = () => {
        navigate("/profile");
        closeMenu();
    };
    const closeMenu = () => {
        dispatch(menuToggle());
    };
    return (
        <Box>
            <Paper
                sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    height: "60px",
                    display: "flex",
                    "& span,p": { color: "primary.contrastText" },
                }}
            >
                <ListItem
                    component="div"
                    secondaryAction={
                        <IconButton
                            name="settings"
                            onClick={toProfile}
                        />
                    }
                >
                    <ListItemAvatar>
                        {!!user?.image ? (
                            <Avatar src={getServerFileUrl(user?.image)} />
                        ) : (
                            <Avatar>{user?.fullName[0]}</Avatar>
                        )}
                    </ListItemAvatar>
                    <ListItemText
                        primary={user?.fullName}
                        secondary={roles.find((x) => x.id === user?.roleId)?.title}
                    />
                </ListItem>
            </Paper>
            <Box
                sx={{
                    "& a": {
                        color: "common.white",
                        opacity: 0.6,
                    },
                    "& a:hover,a.active": {
                        opacity: 1,
                    },
                }}
            >
                {filteredMenuList.map((menu: INavigationMenu) => {
                    return (
                        <Box
                            sx={{
                                py: 0.5,
                                px: 2,
                            }}
                            key={menu.name}
                        >
                            <NavLink
                                to={menu.link}
                                style={{ textDecoration: "none", color: "#000", display: "flex" }}
                                onClick={closeMenu}
                            >
                                <Icon
                                    name={menu.icon}
                                    sx={{ mr: 1 }}
                                />
                                {menu.title}
                            </NavLink>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}
export default NavigationMenuDrawer;
