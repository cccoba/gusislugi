import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, SxProps, Divider } from "@mui/material";

import { menuToggle } from "store/reducers/ComponentsSlice";
import { TIconName } from "components/Icon";

import getConst from "api/common/getConst";
import { useAppDispatch, useAppSelector } from "api/hooks/redux";

import IconButton from "../Icon/IconButton";

import BackBtnICon from "./BackBtnICon";
import AppVersion from "./AppVersion";

interface IProps {
    title: string;
    icon?: TIconName | "";
    backUrl: string | null;
}
const drawerWidth = getConst("menu-width");

export default function Header({ title = "", icon, backUrl = null }: IProps) {
    const menuShowed = useAppSelector((state) => state.components.menu.show);
    const deviceScreenName = useAppSelector((state) => state.device.screen.name);

    const [appBarSx, setAppBarSx] = useState<SxProps>({ width: "100%", ml: 0 });

    const dispatch = useAppDispatch();

    useEffect(() => {
        switch (deviceScreenName) {
            case "big":
                setAppBarSx({ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` });
                return;
            case "normal":
                if (menuShowed) {
                    setAppBarSx({ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` });
                } else {
                    setAppBarSx({ width: "100%", ml: 0 });
                }
                return;
            default:
                setAppBarSx({ width: "100%", ml: 0 });
        }
    }, [deviceScreenName, menuShowed, drawerWidth]);

    const toggleMenu = () => {
        dispatch(menuToggle());
    };
    return (
        <AppBar
            position="fixed"
            sx={{
                ...appBarSx,
                height: "60px",
                display: "block",
                backgroundSize: "cover",
                p: 0,
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Box
                    sx={{
                        display: { xs: "flex", md: deviceScreenName === "mobile" ? "flex" : "none" },
                        maxWidth: "30px",
                        mr: "10px",
                    }}
                >
                    <IconButton
                        name="menu"
                        color="inherit"
                        edge="start"
                        onClick={toggleMenu}
                    />
                    <Divider
                        orientation="vertical"
                        flexItem
                    />
                </Box>
                {deviceScreenName !== "mobile" && (
                    <BackBtnICon
                        backUrl={backUrl}
                        deviceScreenName={deviceScreenName}
                        icon={icon}
                    />
                )}
                <Typography
                    variant="h1"
                    noWrap
                    component="div"
                    sx={{
                        flexGrow: 5,
                        textAlign: "center",
                        color: "#fff",
                        fontSize: { xs: "1em", md: "1.4em" },
                        whiteSpace: "normal",
                    }}
                >
                    {title}
                </Typography>
            </Toolbar>
            <AppVersion />
        </AppBar>
    );
}
