import { Route, Routes } from "react-router-dom";

import MyLicenses from "pages/Licenses/My";

import MyCompanies from "../Companies/My";

interface IProps {
    baseUrl: string;
}

export default function MyRouter({ baseUrl }: IProps) {
    return (
        <Routes>
            <Route
                path="/companies"
                element={<MyCompanies />}
            />
            <Route
                path="/licenses"
                element={<MyLicenses />}
            />
        </Routes>
    );
}
