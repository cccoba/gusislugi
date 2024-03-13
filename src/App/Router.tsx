import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Box, SxProps, Toolbar } from "@mui/material";

import Header from "components/Header";
import getConst from "api/common/getConst";
import { useAppSelector } from "api/hooks/redux";
import Login from "pages/Users/Login";
import NavigationMenu from "components/NavigationMenu";
import Home from "pages/Home";
import Registration from "pages/Users/Registration";
import Profile from "pages/Users/Profile";

export default function RouterPage() {
    const userIsAuth = useAppSelector((s) => s.user.isAuth);
    const userIsRegister = useAppSelector((s) => !!s.user.user);
    const header = useAppSelector((s) => s.components.header);
    const deviceScreenName = useAppSelector((s) => s.device.screen.name);
    const deviceIsMobile = useAppSelector((s) => s.device.isMobile);

    const [contentSx, setContentSx] = useState<SxProps>({});

    const location = useLocation();
    useEffect(() => {
        const drawerWidth = getConst("menu-width");
        if (deviceScreenName === "big") {
            setContentSx({ ml: `${drawerWidth}px` });
        } else {
            setContentSx({});
        }
    }, [deviceScreenName]);

    if (!userIsAuth) {
        return (
            <Routes>
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/login"
                            replace
                            state={{ from: location }}
                        />
                    }
                />
            </Routes>
        );
    }
    if (!userIsRegister) {
        return (
            <Routes>
                <Route
                    path="/registration"
                    element={<Registration />}
                />
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/registration"
                            replace
                            state={{ from: location }}
                        />
                    }
                />
            </Routes>
        );
    }

    return (
        <Box sx={{ display: "flex", overflow: "hidden" }}>
            <Header {...header} />
            <NavigationMenu />
            <Box
                component="main"
                sx={{ ...contentSx, flexGrow: 1, height: "100lvh", overflow: "hidden" }}
            >
                <Toolbar />
                <Box
                    sx={{ height: "calc(100dvh - 64px)", overflow: "auto", p: 3 }}
                    className={!deviceIsMobile ? "scrollable" : ""}
                    component="article"
                >
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
                        />
                        <Route
                            path="/profile"
                            element={<Profile />}
                        />
                        <Route
                            path="*"
                            element={
                                <Navigate
                                    to="/"
                                    replace
                                    state={{ from: location }}
                                />
                            }
                        />
                    </Routes>
                </Box>
            </Box>
        </Box>
    );
}
