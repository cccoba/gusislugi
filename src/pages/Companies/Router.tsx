import { Route, Routes } from "react-router-dom";

import type { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";

import Companies from "./Index";
import CompanyHistory from "./History";

interface IProps extends IPageWithRoles {
    baseUrl: string;
}
export default function CompanyRouter({ roles, baseUrl }: IProps) {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Companies
                        roles={roles}
                        backUrl="/home"
                    />
                }
            />
            <Route
                path={`/history`}
                element={
                    <CompanyHistory
                        roles={roles}
                        icon="money"
                        backUrl={baseUrl}
                    />
                }
            />
        </Routes>
    );
}
