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

import type { ITaxesTypesDto } from "api/interfaces/user/ITaxesTypesDto";

import FormControl from "./FormControl";
import type { ISelectValue } from "./Select";
import InputSelectMultiple from "./InputSelect/InputSelectMultiple";
import Switcher from "./Switcher";

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
        "taxesTypesView",
        "taxesTypesEdit",
        "wanteds",
        "wanteds2",
        "wanteds3",
        "company",
        "users",
        "shop",
        "shopUse",
        "licenses",
        "weapons",
    ];
    const permissions = permissionList.map((x) => ({
        id: x,
        title: getLangValue(lang.pipes.rolePermissions, x),
    }));
    const { data: roles } = useGetData<IRoleDto[]>("roles", []);
    const { data: medicalSicknesses } = useGetData<IRoleDto[]>("medicalSicknesses", []);
    const { data: taxesTypes } = useGetData<ITaxesTypesDto[]>("taxesTypes", []);

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
    const taxesTypesFlags = useMemo<ISelectValue[]>(() => {
        return (taxesTypes || []).map((x) => ({
            id: getFlagByValue(x.id),
            title: x.title,
        }));
    }, [taxesTypes]);
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
            taxesTypesView: [],
            taxesTypesEdit: [],
            wanteds: [],
            wanteds2: [],
            wanteds3: [],
            company: [],
            shop: [],
            shopUse: [],
            medicineAdmin: [],
            licenses: [],
            weapons: [],
        };
        if (toArray(value).length > 0) {
            for (const idName in value) {
                if (Object.prototype.hasOwnProperty.call(value, idName)) {
                    if ((value as any)[idName] === -1) {
                        newValue[idName] = [-1];
                    } else {
                        switch (idName) {
                            case "users":
                            case "qr":
                                newValue[idName] = getRoleFlagToFlagValues((value as any)[idName], roleFlags);
                                break;
                            case "company":
                                newValue[idName] = getFlagToFlagValues(
                                    (value as any)[idName],
                                    CompanyPermissionActionFlag
                                );
                                break;
                            default:
                                newValue[idName] = getFlagToFlagValues(
                                    (value as any)[idName],
                                    RolePermissionActionFlag
                                );
                                break;
                        }
                    }
                }
            }
        }
        return newValue;
    }, [value, roleFlags]);
    const toChange = (idName: string, values: number[]) => {
        const newValue = values.length === 1 && values[0] === -1 ? -1 : getFlagValuesToFlag(values);
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
                        x.id === "users" || x.id === "qr"
                            ? roleFlags
                            : x.id === "company"
                            ? companyValues
                            : x.id === "medicalInfoAdd"
                            ? medicalSicknessesFlags
                            : x.id === "taxesTypesView" || x.id === "taxesTypesEdit"
                            ? taxesTypesFlags
                            : values;
                    if (x.id === "shopUse") {
                        return (
                            <InputSelectMultiple
                                values={[{ id: 1, title: lang.yes }]}
                                value={inputValue[x.id]}
                                onChangeValue={(v) => toChange(x.id, v as number[])}
                                key={x.id}
                                label={x.title}
                            />
                        );
                    }
                    return (
                        <SelectWithAll
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

function SelectWithAll({
    label,
    values,
    value,
    onChangeValue,
}: {
    label: string;
    values: ISelectValue[];
    value: number[];
    onChangeValue: (v: number[]) => void;
}) {
    const allIsSelected = useMemo(() => {
        return value.length === 1 && value[0] === -1;
    }, [value]);
    const toChangeAll = (v: boolean) => {
        if (v) {
            onChangeValue([-1]);
        } else {
            onChangeValue(values.map((x) => x.id));
        }
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            gap={1}
        >
            <InputSelectMultiple
                withSelectAll
                label={label}
                values={values}
                value={allIsSelected ? values.map((x) => x.id) : value}
                onChangeValue={onChangeValue}
                disabled={allIsSelected}
                readOnly={allIsSelected}
                limitSelectedItems={4}
                sx={{ flexGrow: 10 }}
            />
            <Box>
                <Switcher
                    textValue={lang.all}
                    value={allIsSelected}
                    onChangeValue={toChangeAll}
                />
            </Box>
        </Box>
    );
}
