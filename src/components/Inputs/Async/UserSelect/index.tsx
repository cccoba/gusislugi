import { useEffect, useMemo, useState } from "react";
import { Input, FormHelperText, FormLabel } from "@mui/material";

import { IconButton } from "components";
import lang from "lang";
import FormControl from "components/Inputs/FormControl";
import useGetData from "store/rtkProvider";

import type { IInputProps } from "api/interfaces/components/IInputProps";
import type { IUserDto } from "api/interfaces/user/IUserDto";
import { useAppSelector } from "api/hooks/redux";
import type { IRoleDto } from "api/interfaces/user/IRoleDto";

import type { INationalityDto } from "api/interfaces/user/INationalityDto";

import UserSelectList from "./List";
import UserSelectChips from "./Chips";

interface IProps extends IInputProps<number | number[]> {
    multiple?: boolean;
    multipleVariant?: "table" | "chips";
    withOutImage?: boolean;
}

export interface IUserRowDto {
    id: number;
    image: string;
    firstName: string;
    roleId: number;
    role: string;
    nickname: string;
    tgLogin: string;
    nationalityId: number;
    nationality: string;
}

export function parseUserData(user: IUserDto, roles: IRoleDto[], nationalities: INationalityDto[]): IUserRowDto {
    return {
        id: user.id,
        image: user.image,
        firstName: user.firstName,
        roleId: user?.roleId || 0,
        role: roles.find((x) => x.id === user.roleId)?.title || lang.no,
        nationalityId: user?.nationalityId || 0,
        nationality: nationalities.find((x) => x.id === user?.nationalityId)?.title || lang.no,
        nickname: user?.nickname || "",
        tgLogin: user?.tgLogin ? "@" + user.tgLogin : "",
    };
}

export default function UserSelect({
    label = "",
    value,
    multiple = false,
    withOutImage = false,
    variant = "standard",
    fullWidth = true,
    error = false,
    required = false,
    helperText = "",
    disabled = false,
    onChangeValue,
}: IProps) {
    const [users, setUsers] = useState<IUserDto[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<IUserRowDto[]>([]);
    const [selectedUserText, setSelectedUserText] = useState<string>("");
    const roleList = useAppSelector((s) => s.user.roles);
    const nationalityList = useAppSelector((s) => s.user.nationalities);
    const [modalShow, setModalShow] = useState<boolean>(false);
    const { data, isLoading } = useGetData<IUserDto[]>("users", []);
    useEffect(() => {
        if (data?.length) {
            const newUsers = data?.length ? [...data].sort((a, b) => a?.firstName.localeCompare(b?.firstName)) : [];
            setUsers(newUsers);
            if (value) {
                if (!multiple) {
                    let newSelectedUserText = "";
                    if (value) {
                        const foundedUser = newUsers.find((u) => u.id === value);
                        if (foundedUser?.id) {
                            newSelectedUserText = foundedUser.firstName;
                        }
                    }

                    setSelectedUserText(newSelectedUserText);
                } else {
                    if (typeof value === "object") {
                        const newSelectedUsers = newUsers.filter((x) => value.includes(x.id));
                        setSelectedUsers(newSelectedUsers.map((x) => parseUserData(x, roleList, nationalityList)));
                    }
                }
            }
        }
    }, [data, roleList, nationalityList, value]);
    const endAdornment = useMemo(() => {
        if (disabled) {
            return undefined;
        }
        return !value ? (
            <IconButton
                name="add"
                color="primary"
                onClick={toAdd}
                size="small"
            />
        ) : (
            <IconButton
                name="close"
                onClick={() => updateValue(null)}
                size="small"
            />
        );
    }, [value, disabled]);
    const delUsers = (ids: number[]) => {
        updateValue(selectedUsers.filter((u) => !ids.includes(u.id)).map((x) => x.id));
    };
    function toAdd() {
        setModalShow(true);
    }
    const addUsers = (data: any) => {
        if (multiple) {
            if (data?.length) {
                let needUpdate = false;
                const oldUsers = users.filter((u) => (value as number[]).includes(u.id));
                const newUsers = users.filter((u) => data.includes(u.id));
                for (const newUser of newUsers) {
                    if (!oldUsers.find((x) => x.id === newUser.id)) {
                        oldUsers.push(newUser);
                        needUpdate = true;
                    }
                }
                if (needUpdate) {
                    updateValue(oldUsers.map((x) => x.id));
                }
            }
        } else {
            updateValue(data);
        }
        setModalShow(false);
    };
    const updateValue = (newValue: any) => {
        if (!multiple) {
            let newSelectedUserText = "";
            if (newValue) {
                const foundedUser = users.find((u) => u.id === newValue);
                if (foundedUser?.id) {
                    newSelectedUserText = foundedUser.firstName;
                }
            }

            setSelectedUserText(newSelectedUserText);
            onChangeValue(newValue ? users.find((u) => u.id === newValue)?.id || 0 : 0);
        } else {
            if (typeof value === "object") {
                const newSelectedUsers = users.filter((x) => newValue.includes(x.id));
                setSelectedUsers(newSelectedUsers.map((x) => parseUserData(x, roleList, nationalityList)));
                onChangeValue(newSelectedUsers ? newSelectedUsers.map((u) => u.id) : []);
            }
        }
    };
    if (!multiple) {
        return (
            <>
                <FormControl
                    variant={variant}
                    fullWidth={fullWidth}
                    error={error}
                    required={required}
                    label={label}
                    helperText={helperText}
                    disabled={disabled || isLoading}
                >
                    <Input
                        readOnly
                        value={selectedUserText}
                        endAdornment={endAdornment}
                    />
                </FormControl>
                <UserSelectList
                    open={modalShow}
                    onClose={addUsers}
                    userList={users}
                    rolesList={roleList}
                    nationalitiesList={nationalityList}
                    multiple={multiple}
                />
            </>
        );
    }
    return (
        <>
            <FormControl
                variant="standard"
                fullWidth={fullWidth}
                error={error}
                required={required}
            >
                {!!label && <FormLabel>{label}</FormLabel>}
                {/*multipleVariant === "table" ? (
                    <UserSelectTable
                        loading={!isInit}
                        users={selectedUsers}
                        onDel={delUsers}
                        onAdd={toAdd}
                    />
                ) : (*/}
                <UserSelectChips
                    loading={isLoading}
                    users={selectedUsers}
                    onDel={delUsers}
                    onAdd={toAdd}
                    withImage={!withOutImage}
                />
                {/*})*/}
                {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
            <UserSelectList
                open={modalShow}
                onClose={addUsers}
                userList={users}
                rolesList={roleList}
                nationalitiesList={nationalityList}
                multiple={multiple}
            />
        </>
    );
}
