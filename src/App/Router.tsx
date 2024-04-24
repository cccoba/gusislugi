import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Box, SxProps, Toolbar } from "@mui/material";

import NavigationMenu from "components/NavigationMenu";
import Header from "components/Header";

import Login from "pages/Users/Login";
import Home from "pages/Home";
import Registration from "pages/Users/Registration";
import Profile from "pages/Users/Profile";
import Claims from "pages/Claims";
import Users from "pages/Users";
import Citizenships from "pages/Citizenships";
import Nationalities from "pages/Nationalities";
import QrScanner from "pages/QR/QrScanner";
import Passport from "pages/Passport";
import MyClaims from "pages/Claims/MyClaims";
import MyMessages from "pages/Messages/MyMessages";
import MoneyList from "pages/Money";
import Roles from "pages/Roles";

import getConst from "api/common/getConst";
import { useAppSelector } from "api/hooks/redux";
import MoneyUser from "pages/Money/User";
import MedicalPolicies from "pages/MedicalPolicies";
import Taxes from "pages/Taxes";
import Wanteds from "pages/Wanteds";
import MoneySgp from "pages/Money/Sgp";

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
                            path="/claims/*"
                            element={<Claims roles={[["claims"]]} />}
                        />
                        <Route
                            path="/myClaims"
                            element={<MyClaims />}
                        />
                        <Route
                            path="/myMessages"
                            element={<MyMessages />}
                        />
                        <Route
                            path="/users/*"
                            element={<Users roles={[["users"]]} />}
                        />
                        <Route
                            path="/citizenships/*"
                            element={<Citizenships roles={[["admins"]]} />}
                        />
                        <Route
                            path="/nationalities/*"
                            element={<Nationalities roles={[["admins"]]} />}
                        />
                        <Route
                            path="/qrScanner"
                            element={
                                <QrScanner
                                    roles={[["qr"]]}
                                    icon="qr_code_scanner"
                                />
                            }
                        />
                        <Route
                            path="/medicalPolicies/*"
                            element={
                                <MedicalPolicies
                                    roles={[["medicalPolicies"]]}
                                    icon="medical_services"
                                />
                            }
                        />
                        <Route
                            path="/taxes/*"
                            element={
                                <Taxes
                                    roles={[["taxes"]]}
                                    icon="taxes"
                                />
                            }
                        />
                        <Route
                            path="/wanteds/*"
                            element={
                                <Wanteds
                                    roles={[["wanteds"]]}
                                    icon="wanteds"
                                    backUrl={"/wanteds"}
                                />
                            }
                        />

                        <Route
                            path="/money/*"
                            element={
                                <MoneyList
                                    roles={[["admins"]]}
                                    icon="payments"
                                />
                            }
                        />
                        <Route
                            path="/sgp"
                            element={<MoneySgp icon="sgp" />}
                        />

                        <Route
                            path="/userMoney/:id"
                            element={
                                <MoneyUser
                                    roles={[["admins"]]}
                                    icon="payments"
                                />
                            }
                        />

                        <Route
                            path="/roles"
                            element={
                                <Roles
                                    roles={[["admins"]]}
                                    icon="engineering"
                                />
                            }
                        />

                        <Route
                            path="/passport/:id"
                            element={
                                <Passport
                                    roles={[["qr"]]}
                                    icon="badge"
                                    idName="guid"
                                />
                            }
                        />
                        <Route
                            path="/passport-tg/:id"
                            element={
                                <Passport
                                    roles={[["qr"]]}
                                    icon="badge"
                                    idName="telegramLogin"
                                />
                            }
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
