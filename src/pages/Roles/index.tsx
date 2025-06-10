import { useMemo, useState } from "react";

import lang from "lang";
import { type IGoodTableField, GoodTable, Page } from "components";
import { setRoles } from "store/reducers/UserSlice";

import { roles as rolesService, webApiResultData } from "api/data";
import type { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import type { IRoleDto } from "api/interfaces/user/IRoleDto";
import useLoadApiData from "api/hooks/useLoadApiData";
import { useNotifier } from "api/hooks/useNotifier";
import { useAppDispatch } from "api/hooks/redux";

import { isMobile } from "react-device-detect";

import RoleForm from "./Form";

export default function Roles({ ...pageProps }: IPageWithRoles) {
    const langPage = lang.pages.roles;

    const fields: IGoodTableField[] = [
        { name: "id", title: langPage.fields.id, format: "number", width: "85px" },
        { name: "title", title: langPage.fields.title },
    ];
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
    const toAdd = () => {
        setSelectedRole({
            id: 0,
            title: "",
            description: "",
            params: {},
        });
    };
    const hideForm = () => {
        setSelectedRole(null);
    };
    const toSave = (newValue: IRoleDto) => {
        const newParams: any = {};
        for (const idName in newValue.params) {
            if (Object.prototype.hasOwnProperty.call(newValue.params, idName)) {
                const element = (newValue.params as any)[idName];
                if (element > 0 || element === -1) {
                    newParams[idName] = element;
                }
            }
        }
        newValue.params = newParams;

        setIsLoading(true);
        rolesService
            .crudSave(newValue)
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
            {...pageProps}
            scrollTopBottom={isMobile ? 72 : undefined}
        >
            {!!selectedRole && (
                <RoleForm
                    onCancel={hideForm}
                    onSave={toSave}
                    role={selectedRole}
                />
            )}
            <GoodTable<IRoleDto>
                fields={fields}
                values={values}
                onRowClick={setSelectedRole}
                actions={[
                    { icon: "refresh", name: "refresh", onClick: refetch },
                    { icon: "add", name: "add", onClick: toAdd },
                ]}
                pagination={{ pageSize: 25, rowsPerPage: [10, 25, 100] }}
            />
        </Page>
    );
}
