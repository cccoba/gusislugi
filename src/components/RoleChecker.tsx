import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loaderHide, loaderShow } from "store/reducers/ComponentsSlice";

import { useAppDispatch, useAppSelector } from "api/hooks/redux";
import { checkFlagIncludes } from "api/common/enumHelper";
import { IRoleDto, TRoleCheckerRole } from "api/interfaces/user/IRoleDto";
import { RolePermissionFlagAny } from "api/enums/RolePermissionFlag";

interface IProps {
    roles: TRoleCheckerRole[];
    children: JSX.Element;
    redirectLink?: string | null;
}

export const checkUserRoleAccess = (roles: IProps["roles"], userRoleParams?: IRoleDto["params"]): boolean => {
    if (!userRoleParams) {
        return false;
    }
    for (const [roleName, flagValue = RolePermissionFlagAny] of roles) {
        if (roleName in userRoleParams) {
            if (checkFlagIncludes(flagValue, (userRoleParams as any)[roleName])) {
                return true;
            }
        }
    }
    return false;
};

export default function RoleChecker({ roles = [], children }: IProps) {
    const isLoading = useAppSelector((state) => state.user.isLoading);
    const currentUserRoleParams = useAppSelector((state) => state.user.user?.role?.params);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [inRole, setInRole] = useState(false);
    useEffect(() => {
        if (!isLoading && !!roles?.length && currentUserRoleParams) {
            setInRole(checkUserRoleAccess(roles, currentUserRoleParams));
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
