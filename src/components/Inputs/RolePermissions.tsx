import { useMemo, useRef } from "react";
import { Box } from "@mui/material";

import lang, { getLangValue, getEnumSelectValues } from "lang";

import { IInputProps } from "api/interfaces/components/IInputProps";
import { IRoleDto } from "api/interfaces/user/IRoleDto";
import { RolePermissionFlag as RolePermissionActionFlag } from "api/enums/RolePermissionFlag";
import { toArray } from "api/common/helper";
import { getFlagToFlagValues, getFlagValuesToFlag } from "api/common/enumHelper";
import { UserRolePermissionActionFlag } from "api/enums/UserRolePermissionActionFlag";

import FormControl from "./FormControl";
import Select from "./Select";

interface IProps extends IInputProps<IRoleDto["params"]> {}

export default function RolePermissions({
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
    const permissionList = [
        "admins",
        "claims",
        "qr",
        "medicalPolicies",
        "medicalInfo",
        "taxes",
        "fines",
        "wanteds",
        "wanteds2",
        "users",
        "shop",
        "medicineAdmin",
    ];
    const permissions = permissionList.map((x) => ({
        id: x,
        title: getLangValue(lang.pipes.rolePermissions, x),
    }));

    const values = getEnumSelectValues(RolePermissionActionFlag, "RolePermissionActionFlag").filter(
        (x) => x.id !== RolePermissionActionFlag.None
    );
    const userValues = getEnumSelectValues(UserRolePermissionActionFlag, "UserRolePermissionActionFlag").filter(
        (x) => x.id !== UserRolePermissionActionFlag.None
    );
    const inputValue = useMemo(() => {
        const newValue: any = {
            admins: [],
            claims: [],
            qr: [],
            users: [],
            medicalInfo: [],
            medicalPolicies: [],
            taxes: [],
            fines: [],
            wanteds: [],
            wanteds2: [],
            shop: [],
            medicineAdmin: [],
        };
        if (toArray(value).length > 0) {
            for (const idName in value) {
                if (Object.prototype.hasOwnProperty.call(value, idName)) {
                    if (idName === "users") {
                        newValue[idName] = getFlagToFlagValues((value as any)[idName], UserRolePermissionActionFlag);
                    } else {
                        newValue[idName] = getFlagToFlagValues((value as any)[idName], RolePermissionActionFlag);
                    }
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
                    const valueList = x.id === "users" ? userValues : values;

                    return (
                        <Select
                            type="selectFiltered"
                            multiple
                            key={x.id}
                            label={x.title}
                            values={valueList}
                            value={(inputValue as any)[x.id]}
                            onChangeValue={(v) => toChange(x.id, v)}
                        />
                    );
                })}
            </Box>
        </FormControl>
    );
}
