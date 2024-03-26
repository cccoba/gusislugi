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
    const currentUserRoleParams = useAppSelector((state) => state.user.user?.role?.params);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [inRole, setInRole] = useState(false);
    useEffect(() => {
        if (!isLoading && !!roles?.length && currentUserRoleParams) {
            setInRole(getUserRoleAccess(roles, currentUserRoleParams) !== "no");
        } else {
            if (!roles?.length) {
                setInRole(true);
            }
        }
    }, [navigate, isLoading, currentUserRoleParams, roles]);

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
