import { useMemo } from "react";
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

import lang from "lang";
import Icon from "components/Icon";

import { useAppDispatch, useAppSelector } from "api/hooks/redux";
import { getServerFileUrl } from "api/common/helper";
import IconButton from "components/Icon/IconButton";
import { menuToggle } from "store/reducers/ComponentsSlice";

const langPage = lang.components.navigationMenu;

export interface INavigationMenu {
    name: string;
    title: string;
    icon: string;
    link: string;
    access?: string[];
}
const defMenuList: INavigationMenu[] = [
    { name: "home", title: langPage.home, icon: "home", link: "/" },
    { name: "profile", title: langPage.profile, icon: "person_pin", link: "/profile" },
    { name: "claims", title: langPage.claims, icon: "warning", link: "/claims", access: ["isAdmin"] },
];

function NavigationMenuDrawer() {
    const isAuth = useAppSelector((s) => s.user.isAuth);
    const user = useAppSelector((s) => s.user.user);
    const roles = useAppSelector((s) => s.user.roles);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const menuList = useMemo<INavigationMenu[]>(() => {
        return defMenuList.filter((x) => {
            if (x.access?.length) {
                for (const access of x.access) {
                    if (isAuth && access === "isAdmin") {
                        return true;
                    }
                }
            }
            return true;
        });
    }, [isAuth]);
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
                {menuList.map((menu: INavigationMenu) => {
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
