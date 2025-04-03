import { Route, Routes } from "react-router-dom";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";

import AdminUserList from "./AdminUserList";
import User from "./User";

export default function UsersRouter({ roles }: IPageWithRoles) {
    return (
        <Routes>
            <Route
                path="/"
                element={<AdminUserList roles={roles} />}
            />
            <Route
                path="/:id"
                element={<User roles={roles} />}
            />
        </Routes>
    );
}
