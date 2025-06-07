import { Route, Routes, useNavigate } from "react-router-dom";

import { loaderChange } from "store/reducers/ComponentsSlice";
import type { TIconName } from "components/Icon";

import { useAppDispatch } from "api/hooks/redux";
import type { TRoleCheckerRole } from "api/interfaces/user/IRoleDto";
import type { RolePermissionFlag } from "api/enums/RolePermissionFlag";
import { RolePermissionFlagAll } from "api/enums/RolePermissionFlag";

import type { ICRUDAsyncAction } from "./Main";
import CRUDAsyncMain from "./Main";
import type { ICRUDAsyncEditConfig } from "./Edit";
import CRUDAsyncEdit from "./Edit";
import type { ICRUDAsyncListConfig } from "./List";

export interface ICRUDAsyncProps {
    listConfig: ICRUDAsyncListConfig;
    editConfig: ICRUDAsyncEditConfig;
    actions: ICRUDAsyncAction[];
    icon?: TIconName | "";
    title: string;
    initialValue?: any;
    roles?: TRoleCheckerRole[];
    backUrl?: string | null;
    permissions?: RolePermissionFlag | -1;
    withOutPage?: boolean;
}

function CRUDAsync(props: ICRUDAsyncProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onIsLoading = (isLoading: boolean) => {
        dispatch(loaderChange(isLoading));
    };
    const goBack = () => {
        if (props?.backUrl) {
            navigate(props.backUrl);
        }
    };
    return (
        <Routes>
            <Route
                path="/"
                element={<CRUDAsyncMain {...props} />}
            />
            <Route
                path="/:id"
                element={
                    <CRUDAsyncEdit
                        showVariant="page"
                        config={props.editConfig}
                        actions={props.actions}
                        onClose={goBack}
                        onIsLoading={onIsLoading}
                        onSaved={goBack}
                        initialValue={props.initialValue}
                        backUrl={props.backUrl ?? undefined}
                        permissions={
                            typeof props.permissions === "undefined" || props.permissions === -1
                                ? RolePermissionFlagAll
                                : props.permissions
                        }
                    />
                }
            />
        </Routes>
    );
}
export default CRUDAsync;
