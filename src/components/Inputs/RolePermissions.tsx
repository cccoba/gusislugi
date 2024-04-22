import { useMemo } from "react";
import { Box } from "@mui/material";

import lang, { getLangValue, getEnumSelectValues } from "lang";

import { IInputProps } from "api/interfaces/components/IInputProps";
import { IRoleDto } from "api/interfaces/user/IRoleDto";
import { RolePermissionFlag as RolePermissionActionFlag } from "api/enums/RolePermissionFlag";
import { toArray } from "api/common/helper";
import { getFlagToFlagValues, getFlagValuesToFlag } from "api/common/enumHelper";

import FormControl from "./FormControl";
import Select from "./Select";

interface IProps extends IInputProps<IRoleDto["params"]> {}

const permissionList = ["admins", "claims", "qr", "users", "medicalPolicies"];
const permissions = permissionList.map((x) => ({
    id: x,
    title: getLangValue(lang.pipes.rolePermissions, x),
}));

const defValue = {
    admins: [],
    claims: [],
    qr: [],
    users: [],
    medicalPolicies: [],
};

const values = getEnumSelectValues(RolePermissionActionFlag, "RolePermissionActionFlag");

function RolePermissions({
    value,
    onChangeValue,
    label = "",
    variant = "standard",
    fullWidth = true,
    error = false,
    required = false,
    helperText = "",
    disabled = false,
}: IProps) {
    const inputValue = useMemo(() => {
        const newValue: any = { ...defValue };
        if (toArray(value).length > 0) {
            for (const idName in value) {
                if (Object.prototype.hasOwnProperty.call(value, idName)) {
                    newValue[idName] = getFlagToFlagValues((value as any)[idName], RolePermissionActionFlag);
                }
            }
        }
        return newValue;
    }, [value]);
    const toChange = (idName: string, values: number[]) => {
        const newValue = getFlagValuesToFlag(values);
        onChangeValue({ ...value, [idName]: newValue });
    };
    return (
        <FormControl
            fullWidth={fullWidth}
            error={error}
            required={required}
            disabled={disabled}
            variant={variant}
            label={label}
            helperText={helperText}
        >
            <Box sx={{ mx: 1 }}>
                {permissions.map((x) => {
                    return (
                        <Select
                            type="selectFiltered"
                            multiple
                            key={x.id}
                            label={x.title}
                            values={values}
                            value={(inputValue as any)[x.id]}
                            onChangeValue={(v) => toChange(x.id, v)}
                        />
                    );
                })}
            </Box>
        </FormControl>
    );
}
export default RolePermissions;
