import { Route, Routes } from "react-router-dom";

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
        </Routes>
    );
}
