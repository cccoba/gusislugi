import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loaderHide, loaderShow } from "store/reducers/ComponentsSlice";

import { useAppDispatch, useAppSelector } from "api/hooks/redux";
import { checkFlagIncludes } from "api/common/enumHelper";
import type { IRoleDto, TRoleCheckerRole } from "api/interfaces/user/IRoleDto";
import { RolePermissionFlagAll } from "api/enums/RolePermissionFlag";
import { CompanyPermissionFlagAll } from "api/enums/CompanyPermissionActionFlag";

interface IProps {
    roles: TRoleCheckerRole[];
    children: JSX.Element;
    redirectLink?: string | null;
}

/**
 * Проверяет, имеет ли пользователь доступ к определенным ролям
 * @param roles - массив ролей, которые нужно проверить
 * @param userRoleParams - параметры роли пользователя
 * @returns true, если пользователь имеет доступ к ролям, иначе false
 */
export const checkUserRoleAccess = (roles: IProps["roles"], userRoleParams?: IRoleDto["params"]): boolean => {
    if (!userRoleParams) {
        return false;
    }
    for (const [roleName, flagValue] of roles) {
        let defaultFlagValue = RolePermissionFlagAll;
        if (roleName in userRoleParams) {
            if (roleName === "company") {
                defaultFlagValue = CompanyPermissionFlagAll;
            }

            const flagValue2 = flagValue || defaultFlagValue;
            if (checkFlagIncludes(flagValue2, (userRoleParams as any)[roleName])) {
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
