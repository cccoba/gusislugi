import { Route, Routes } from "react-router-dom";

import MyLicenses from "pages/Police/Licenses/My";

import MyTaxes from "pages/Taxes/MyTaxes";

import MyMedicalPolicies from "pages/MedicalPolicies/MyMedicalPolicies";

import MyClaims from "pages/Claims/MyClaims";

import MyMessages from "pages/Messages/MyMessages";

import MyWanteds2 from "pages/Police/Wanteds2/My";

import MyCompanies from "../Companies/My";

import Secrets from "./Secrets";

interface IProps {
    baseUrl: string;
}

export default function MyRouter({ baseUrl }: IProps) {
    const backUrl = "/";
    return (
        <Routes>
            <Route
                path="/companies"
                element={
                    <MyCompanies
                        icon="company"
                        backUrl={backUrl}
                    />
                }
            />
            <Route
                path="/licenses"
                element={
                    <MyLicenses
                        icon="licenses"
                        backUrl={backUrl}
                    />
                }
            />
            <Route
                path="/secrets"
                element={
                    <Secrets
                        backUrl="/"
                        icon="secrets"
                    />
                }
            />
            <Route
                path="/taxes"
                element={
                    <MyTaxes
                        icon="taxes"
                        backUrl="/"
                    />
                }
            />
            <Route
                path="/medicalPolicies"
                element={<MyMedicalPolicies />}
            />
            <Route
                path="/claims"
                element={<MyClaims />}
            />
            <Route
                path="/messages"
                element={<MyMessages />}
            />
            <Route
                path="/wanteds2"
                element={
                    <MyWanteds2
                        icon="wanteds2"
                        backUrl={backUrl}
                    />
                }
            />
        </Routes>
    );
}
