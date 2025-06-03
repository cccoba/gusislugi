import RolePermissions from "components/Inputs/RolePermissions";

import type { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldRolePermissions extends IFormField {
    type: "rolePermissions";
}

const RolePermissionsAdapter: IFormAdapter = {
    name: "rolePermissions",
    input: FormInput,
    validate: (v, required) => {
        if (!required && !v) {
            return true;
        }
        return !!v;
    },
};

function FormInput({ value = {}, fieldProps, fieldParams, ...props }: IFormAdapterInputProps) {
    return (
        <RolePermissions
            value={value}
            {...props}
            {...fieldProps}
        />
    );
}

export default RolePermissionsAdapter;
