import { Route, Routes } from "react-router-dom";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";

import UserList from "./UserList";
import User from "./User";

interface IProps {}

function Users({ roles }: IPageWithRoles) {
    return (
        <Routes>
            <Route
                path="/"
                element={<UserList roles={roles} />}
            />
            <Route
                path="/:id"
                element={<User roles={roles} />}
            />
        </Routes>
    );
}
export default Users;
