import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import type { SxProps } from "@mui/material";
import { Box, Toolbar } from "@mui/material";

import Header from "components/Header";
import NavigationMenu from "components/NavigationMenu";
import Claims from "pages/Claims";
import MyClaims from "pages/Claims/MyClaims";
import CompanyRouter from "pages/Companies/Router";
import Fines from "pages/Fines";
import MyFines from "pages/Fines/MyFines";
import Home from "pages/Home";
import Links from "pages/Links";
import LinksLink from "pages/Links/Link";
import MedicalInfo from "pages/MedicalInfo";
import MedicalPolicies from "pages/MedicalPolicies";
import MyMedicalPolicies from "pages/MedicalPolicies/MyMedicalPolicies";
import MedicineRouter from "pages/Medicine/Router";
import MyMessages from "pages/Messages/MyMessages";
import MoneyList from "pages/Money";
import MoneySgp from "pages/Money/Sgp";
import MoneyUser from "pages/Money/User";
import MyRouter from "pages/My/Router";
import Nationalities from "pages/Nationalities";
import Passport from "pages/Passport";
import QrScanner from "pages/QR/QrScanner";
import Roles from "pages/Roles";
import Shop from "pages/Shop";
import Taxes from "pages/Taxes";
import MyTaxes from "pages/Taxes/MyTaxes";
import Login from "pages/Users/Login";
import Persons from "pages/Users/Persons";
import Profile from "pages/Users/Profile";
import Registration from "pages/Users/Registration";
import UsersRouter from "pages/Users/Router";
import Wanteds from "pages/Wanteds/Wanteds";

import getConst from "api/common/getConst";
import { useAppSelector } from "api/hooks/redux";
import DocumentPrint from "pages/DocumentsPrint";
import Maps from "pages/Maps";

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
                            path="/documentPrint"
                            element={
                                <DocumentPrint
                                    roles={[["admins"]]}
                                    icon="print"
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
                            path="/company/*"
                            element={<CompanyRouter baseUrl="/company" />}
                        />
                        <Route
                            path="/shop/*"
                            element={<Shop />}
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
                                    icon="roles"
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
