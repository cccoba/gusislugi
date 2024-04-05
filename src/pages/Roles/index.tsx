import { useMemo, useState } from "react";

import lang from "lang";
import { GoodTable, Page } from "components";
import { IGoodTableField } from "components/GoodTable";
import { setRoles } from "store/reducers/UserSlice";

import { roles as rolesService, webApiResultData } from "api/data";
import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { IRoleDto } from "api/interfaces/user/IRoleDto";
import useLoadApiData from "api/hooks/useLoadApiData";
import { useNotifier } from "api/hooks/useNotifier";
import { useAppDispatch } from "api/hooks/redux";

import RoleForm from "./Form";

const langPage = lang.pages.roles;

const fields: IGoodTableField[] = [
    { name: "id", title: langPage.fields.id, format: "number", width: "85px" },
    { name: "title", title: langPage.fields.title },
];
function Roles({ roles, icon }: IPageWithRoles) {
    const { data, isLoading: initLoading, refetch } = useLoadApiData<IRoleDto[]>(rolesService.crudList, []);
    const { showError, showSuccess } = useNotifier();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState<IRoleDto | null>(null);
    const dispatch = useAppDispatch();
    const values = useMemo(() => {
        const newData = data?.length ? data : [];
        dispatch(setRoles(newData));
        return newData;
    }, [data]);
    const toEdit = (data: any) => {
        setSelectedRole(data);
    };
    const toAdd = () => {
        setSelectedRole({
            id: 0,
            title: "",
            params: {},
        });
    };
    const hideForm = () => {
        setSelectedRole(null);
    };
    const toSave = (data: IRoleDto) => {
        const newParams: any = {};
        for (const idName in data.params) {
            if (Object.prototype.hasOwnProperty.call(data.params, idName)) {
                const element = (data.params as any)[idName];
                if (element > 0) {
                    newParams[idName] = element;
                }
            }
        }
        data.params = newParams;

        setIsLoading(true);
        rolesService
            .crudSave(data)
            .then((res) => {
                const { error, result } = webApiResultData<IRoleDto>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    showSuccess(langPage.success.save);
                    hideForm();
                    refetch();
                }
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.save);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <Page
            title={langPage.title}
            isLoading={isLoading || initLoading}
            roles={roles}
            icon={icon}
        >
            {!!selectedRole && (
                <RoleForm
                    onCancel={hideForm}
                    onSave={toSave}
                    role={selectedRole}
                />
            )}
            <GoodTable
                fields={fields}
                values={values}
                onRowClick={toEdit}
                actions={[{ icon: "add", name: "add", onClick: toAdd }]}
            />
        </Page>
    );
}
export default Roles;
