import RolePermissions from "components/Inputs/RolePermissions";

import type { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldRolePermissions extends IFormField {
    type: "rolePermissions";
}

const RolePermissionsAdapter: IFormAdapter = {
    name: "rolePermissions",
    input: ({ value = {}, fieldProps, fieldParams, ...props }: IFormAdapterInputProps) => {
        return (
            <RolePermissions
                value={value}
                {...props}
                {...fieldProps}
            />
        );
    },
    validate: (v, required) => {
        if (!required && !v) {
            return true;
        }
        return !!v;
    },
};

export default RolePermissionsAdapter;
