import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loaderHide, loaderShow } from "store/reducers/ComponentsSlice";

import { useAppDispatch, useAppSelector } from "api/hooks/redux";
import { UserRolesEnum } from "api/enums/UserRolesEnum";

interface IProps {
    roles: UserRolesEnum[];
    children: JSX.Element;
    redirectLink?: string | null;
}

export const checkUserRole = (roleIds: UserRolesEnum[], roleId?: UserRolesEnum): boolean => {
    return !!roleId && roleIds.includes(roleId);
};

export default function RoleChecker({ roles = [], redirectLink = "/", children }: IProps) {
    const isLoading = useAppSelector((state) => state.user.isLoading);
    const currentUserRoleId = useAppSelector((state) => state.user.roleId);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [inRole, setInRole] = useState(false);
    useEffect(() => {
        if (!isLoading && !!roles?.length) {
            if (!checkUserRole(roles, currentUserRoleId)) {
                if (!!redirectLink) {
                    navigate(redirectLink);
                }
                setInRole(false);
            } else {
                setInRole(true);
            }
        } else {
            if (!roles?.length) {
                setInRole(true);
            }
        }
    }, [navigate, isLoading, currentUserRoleId, roles]);

    useEffect(() => {
        if (isLoading) {
            dispatch(loaderShow());
        } else {
            dispatch(loaderHide());
        }
    }, [dispatch, isLoading]);
    if (inRole) {
        return children;
    }
    return null;
}
