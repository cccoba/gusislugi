import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loaderHide, loaderShow } from "store/reducers/ComponentsSlice";

import { useAppDispatch, useAppSelector } from "api/hooks/redux";
import { UserRolesEnum } from "api/enums/UserRolesEnum";
import { enumToArrayObject } from "api/common/enumHelper";
import { IRoleDto, TRoleParamValue } from "api/interfaces/user/IRoleDto";

interface IProps {
    roles: UserRolesEnum[];
    children: JSX.Element;
    redirectLink?: string | null;
}

export const getUserRoleAccess = (roleIds: UserRolesEnum[], userRoleParams?: IRoleDto["params"]): TRoleParamValue => {
    if (!userRoleParams) {
        return "no";
    }
    var rolesNames = enumToArrayObject(UserRolesEnum)
        .filter((x) => roleIds.includes(x.id))
        .map((x) => x.value.toLocaleLowerCase());
    for (const rolesName of rolesNames) {
        if (rolesName in userRoleParams) {
            return (userRoleParams as any)[rolesName];
        }
    }
    return "no";
};

export default function RoleChecker({ roles = [], children }: IProps) {
    const isLoading = useAppSelector((state) => state.user.isLoading);
    const currentUserRoleId = useAppSelector((state) => state.user.user?.roleId);
    const allRoles = useAppSelector((state) => state.user.roles);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [inRole, setInRole] = useState(false);
    useEffect(() => {
        if (!isLoading && !!roles?.length && currentUserRoleId) {
            const userRoleParams = allRoles.find((x) => x.id === currentUserRoleId)?.params;
            setInRole(getUserRoleAccess(roles, userRoleParams) !== "no");
        } else {
            if (!roles?.length) {
                setInRole(true);
            }
        }
    }, [navigate, isLoading, currentUserRoleId, roles, allRoles]);

    useEffect(() => {
        if (isLoading) {
            dispatch(loaderShow());
        } else {
            dispatch(loaderHide());
        }
    }, [dispatch, isLoading]);
    console.log("|inRole", inRole);

    if (inRole) {
        return children;
    }
    return null;
}
