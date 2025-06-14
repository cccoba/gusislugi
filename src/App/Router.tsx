import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import type { SxProps } from "@mui/material";
import { Box, Toolbar } from "@mui/material";

import Header from "components/Header";
import NavigationMenu from "components/NavigationMenu";
import Claims from "pages/Claims";
import CompanyRouter from "pages/Companies/Router";
import Home from "pages/Home";
import Links from "pages/Links";
import LinksLink from "pages/Links/Link";
import MedicalInfo from "pages/MedicalInfo";
import MedicalPolicies from "pages/MedicalPolicies";
import MedicineRouter from "pages/Medicine/Router";
import MoneyUser from "pages/Money/User";
import MyRouter from "pages/My/Router";
import Nationalities from "pages/Nationalities";
import Passport from "pages/Passport";
import QrScanner from "pages/QR/QrScanner";
import Roles from "pages/Roles";
import Shop from "pages/Shop";
import Login from "pages/Users/Login";
import Persons from "pages/Users/Persons";
import Profile from "pages/Users/Profile";
import Registration from "pages/Users/Registration";
import UsersRouter from "pages/Users/Router";
import Wanteds from "pages/Wanteds";

import getConst from "api/common/getConst";
import { useAppSelector } from "api/hooks/redux";
import DocumentPrint from "pages/DocumentsPrint";
import Maps from "pages/Maps";
import Licenses from "pages/Licenses";
import MedicalSickness from "pages/MedicalSickness";
import Wanteds2 from "pages/Wanteds2";
import TaxesTypes from "pages/Taxes/TaxesTypes";
import TaxesPage from "pages/Taxes";
import Wanteds3 from "pages/Wanteds3";
import Messages from "pages/Messages";
import LoginExtra from "pages/Users/LoginExtra";
import Personalities from "pages/Personalities";

export default function RouterPage() {
    const userIsAuth = useAppSelector((s) => s.user?.isAuth);
    const userIsRegister = useAppSelector((s) => !!s.user?.user);
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
                    path="/extra-login"
                    element={<LoginExtra />}
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
                    path="/extra-login"
                    element={<LoginExtra />}
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
                            path="/documentPrint"
                            element={
                                <DocumentPrint
                                    roles={[["admins"]]}
                                    icon="print"
                                    backUrl="/"
                                />
                            }
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
                            path="/my/*"
                            element={<MyRouter baseUrl="/my" />}
                        />
                        <Route
                            path="/maps"
                            element={<Maps />}
                        />

                        <Route
                            path="/users/*"
                            element={<UsersRouter roles={[["admins"]]} />}
                        />
                        <Route
                            path="/persons/*"
                            element={
                                <Persons
                                    roles={[["users"]]}
                                    icon="users"
                                />
                            }
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
                                    icon="qrScanner"
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
                            element={<TaxesPage />}
                        />
                        <Route
                            path="/taxesTypes/*"
                            element={
                                <TaxesTypes
                                    roles={[["admins"]]}
                                    icon="taxesTypes"
                                />
                            }
                        />
                        <Route
                            path="/licenses/*"
                            element={<Licenses />}
                        />
                        <Route
                            path="/medicalSickness/*"
                            element={<MedicalSickness />}
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
                            path="/wanteds3/*"
                            element={<Wanteds3 />}
                        />
                        <Route
                            path="/extra-login"
                            element={<LoginExtra />}
                        />
                        <Route
                            path="/company/*"
                            element={
                                <CompanyRouter
                                    baseUrl="/company"
                                    roles={[["company"]]}
                                />
                            }
                        />
                        <Route
                            path="/shop/*"
                            element={
                                <Shop
                                    icon="shop"
                                    backUrl="/"
                                    roles={[["shop"]]}
                                />
                            }
                        />
                        <Route
                            path="/messages"
                            element={
                                <Messages
                                    icon="messages"
                                    backUrl="/"
                                    roles={[["messages"]]}
                                />
                            }
                        />
                        {/*<Route
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
                        />*/}
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
                                    icon="roles"
                                    backUrl="/"
                                />
                            }
                        />
                        <Route
                            path="/personalities"
                            element={<Personalities />}
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
                            path="/medicine/*"
                            element={
                                <MedicineRouter
                                    roles={[["medicineAdmin"]]}
                                    icon="medicine"
                                    backUrl="/medicine"
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
