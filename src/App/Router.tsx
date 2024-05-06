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
import Wanteds from "pages/Wanteds/Wanteds";
import MoneySgp from "pages/Money/Sgp";
import MyMedicalPolicies from "pages/MedicalPolicies/MyMedicalPolicies";
import MyTaxes from "pages/Taxes/MyTaxes";
import MyFines from "pages/Fines/MyFines";
import Fines from "pages/Fines";
import Wanteds2 from "pages/Wanteds/Wanteds2";
import Persons from "pages/Users/Persons";
import MedicalInfo from "pages/MedicalInfo";
import Links from "pages/Links";
import LinksLink from "pages/Links/Link";

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
                            element={<Claims />}
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
                            path="/myMedicalPolicies"
                            element={<MyMedicalPolicies />}
                        />
                        <Route
                            path="/myTaxes"
                            element={<MyTaxes />}
                        />
                        <Route
                            path="/myFines"
                            element={<MyFines />}
                        />

                        <Route
                            path="/users/*"
                            element={<Users roles={[["admins"]]} />}
                        />
                        <Route
                            path="/persons/*"
                            element={
                                <Persons
                                    roles={[["users"]]}
                                    icon="group"
                                />
                            }
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
                            element={<MedicalPolicies />}
                        />
                        <Route
                            path="/medicalInfo/*"
                            element={<MedicalInfo />}
                        />
                        <Route
                            path="/taxes/*"
                            element={<Taxes />}
                        />
                        <Route
                            path="/fines/*"
                            element={<Fines />}
                        />
                        <Route
                            path="/wanteds/*"
                            element={<Wanteds />}
                        />
                        <Route
                            path="/wanteds2/*"
                            element={<Wanteds2 />}
                        />

                        <Route
                            path="/money/*"
                            element={
                                <MoneyList
                                    roles={[["admins"]]}
                                    icon="money"
                                />
                            }
                        />
                        <Route
                            path="/sgp"
                            element={<MoneySgp icon="sgp" />}
                        />
                        <Route
                            path="/links"
                            element={
                                <Links
                                    icon="links"
                                    backUrl={"/links"}
                                />
                            }
                        />
                        <Route
                            path="/links/:id"
                            element={
                                <LinksLink
                                    icon="links"
                                    backUrl={"/links"}
                                />
                            }
                        />

                        <Route
                            path="/userMoney/:id"
                            element={
                                <MoneyUser
                                    roles={[["admins"]]}
                                    icon="money"
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
