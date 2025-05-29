import { Route, Routes } from "react-router-dom";

import Companies from "./Index";
import CompanyHistory from "./History";

interface IProps {
    baseUrl: string;
}
export default function CompanyRouter({ baseUrl }: IProps) {
    return (
        <Routes>
            <Route
                path="/"
                element={<Companies roles={[["company"]]} />}
            />
            <Route
                path={`/history`}
                element={
                    <CompanyHistory
                        roles={[["company"]]}
                        icon="history"
                        backUrl={baseUrl}
                    />
                }
            />
        </Routes>
    );
}
