import { Route, Routes, useNavigate } from "react-router-dom";

import { loaderChange } from "store/reducers/ComponentsSlice";
import { TIconName } from "components/Icon";

import { useAppDispatch } from "api/hooks/redux";
import { TRoleCheckerRole } from "api/interfaces/user/IRoleDto";
import { RolePermissionFlag, RolePermissionFlagAll } from "api/enums/RolePermissionFlag";

import CRUDAsyncMain, { ICRUDAsyncAction } from "./Main";
import CRUDAsyncEdit, { ICRUDAsyncEditConfig } from "./Edit";
import { ICRUDAsyncListConfig } from "./List";

export interface ICRUDAsyncProps {
    listConfig: ICRUDAsyncListConfig;
    editConfig: ICRUDAsyncEditConfig;
    actions: ICRUDAsyncAction[];
    icon?: TIconName | "";
    title: string;
    initialValue?: any;
    roles?: TRoleCheckerRole[];
    backUrl?: string;
    permissions?: RolePermissionFlag;
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
                        backUrl={props.backUrl}
                        permissions={
                            typeof props.permissions === "undefined" ? RolePermissionFlagAll : props.permissions
                        }
                    />
                }
            />
        </Routes>
    );
}
export default CRUDAsync;
