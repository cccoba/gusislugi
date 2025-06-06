import { useMemo } from "react";
import { Box } from "@mui/material";

import lang, { getLangValue, getEnumSelectValues } from "lang";

import type { IInputProps } from "api/interfaces/components/IInputProps";
import type { IRoleDto } from "api/interfaces/user/IRoleDto";
import { RolePermissionFlag as RolePermissionActionFlag } from "api/enums/RolePermissionFlag";
import { toArray } from "api/common/helper";
import { getFlagByValue, getFlagToFlagValues, getFlagValuesToFlag } from "api/common/enumHelper";
import { CompanyPermissionActionFlag } from "api/enums/CompanyPermissionActionFlag";

import useGetData from "store/rtkProvider";

import FormControl from "./FormControl";
import type { ISelectValue } from "./Select";
import Select from "./Select";
import InputSelectMultiple from "./InputSelect/InputSelectMultiple";

interface IProps extends IInputProps<IRoleDto["params"]> {}

export function getRoleFlagToFlagValues(value: number, flags: ISelectValue[]): number[] {
    const result: number[] = [];
    for (const role of flags) {
        if (value & role.id) {
            result.push(role.id);
        }
    }
    return result;
}
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
        "medicalInfoAdd",
        "medicalSickness",
        "taxes",
        //"fines",
        "wanteds",
        "wanteds2",
        "company",
        "users",
        "shop",
        "licenses",
        "weapons",
    ];
    const permissions = permissionList.map((x) => ({
        id: x,
        title: getLangValue(lang.pipes.rolePermissions, x),
    }));
    const { data: roles } = useGetData<IRoleDto[]>("roles", []);
    const { data: medicalSicknesses } = useGetData<IRoleDto[]>("medicalSicknesses", []);

    const values = getEnumSelectValues(RolePermissionActionFlag, "RolePermissionActionFlag").filter(
        (x) => x.id !== RolePermissionActionFlag.None
    );

    const companyValues = getEnumSelectValues(CompanyPermissionActionFlag, "CompanyPermissionActionFlag").filter(
        (x) => x.id !== CompanyPermissionActionFlag.None
    );

    const roleFlags = useMemo<ISelectValue[]>(() => {
        return (roles || []).map((x) => ({
            id: getFlagByValue(x.id),
            title: x.title,
        }));
    }, [roles]);
    const medicalSicknessesFlags = useMemo<ISelectValue[]>(() => {
        return (medicalSicknesses || []).map((x) => ({
            id: getFlagByValue(x.id),
            title: x.title,
        }));
    }, [medicalSicknesses]);
    const inputValue = useMemo(() => {
        const newValue: any = {
            admins: [],
            claims: [],
            qr: [],
            users: [],
            medicalPolicies: [],
            medicalInfo: [],
            medicalInfoAdd: [],
            medicalSickness: [],
            taxes: [],
            //fines: [],
            wanteds: [],
            wanteds2: [],
            company: [],
            shop: [],
            medicineAdmin: [],
            licenses: [],
            weapons: [],
        };
        if (toArray(value).length > 0) {
            for (const idName in value) {
                if (Object.prototype.hasOwnProperty.call(value, idName)) {
                    if (idName === "users") {
                        newValue[idName] = getRoleFlagToFlagValues((value as any)[idName], roleFlags);
                    } else if (idName === "company") {
                        newValue[idName] = getFlagToFlagValues((value as any)[idName], CompanyPermissionActionFlag);
                    } else {
                        newValue[idName] = getFlagToFlagValues((value as any)[idName], RolePermissionActionFlag);
                    }
                }
            }
        }
        return newValue;
    }, [value, roleFlags]);
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
                    const valueList =
                        x.id === "users"
                            ? roleFlags
                            : x.id === "company"
                            ? companyValues
                            : x.id === "medicalInfoAdd"
                            ? medicalSicknessesFlags
                            : values;

                    return (
                        <InputSelectMultiple
                            withSelectAll
                            key={x.id}
                            label={x.title}
                            values={valueList}
                            value={(inputValue as any)[x.id]}
                            onChangeValue={(v) => toChange(x.id, v as number[])}
                        />
                    );
                })}
            </Box>
        </FormControl>
    );
}
