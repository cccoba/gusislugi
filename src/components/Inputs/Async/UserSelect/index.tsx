import { useEffect, useState } from "react";
import { Input, FormHelperText, FormLabel } from "@mui/material";

import { IconButton } from "components";
import lang from "lang";
import FormControl from "components/Inputs/FormControl";

import { users as usersService, webApiResultData } from "api/data";
import { IInputProps } from "api/interfaces/components/IInputProps";
import { IUserDto } from "api/interfaces/user/IUserDto";
import { useAppSelector } from "api/hooks/redux";
import { IRoleDto } from "api/interfaces/user/IRoleDto";

import UserSelectList from "./List";
import UserSelectTable from "./Table";
import UserSelectChips from "./Chips";

interface IProps extends IInputProps<number | number[]> {
    multiple?: boolean;
    multipleVariant?: "table" | "chips";
}

export interface IUserRowDto {
    id: number;
    image: string;
    fullName: string;
    roleId: number;
    role: string;
}

export function parseUserData(user: IUserDto, roles: IRoleDto[]): IUserRowDto {
    return {
        id: user.id,
        image: user.image,
        fullName: user.fullName,
        roleId: user?.roleId || 0,
        role: roles.find((x) => x.id === user.roleId)?.title || lang.no,
    };
}

export default function UserSelect({
    label = "",
    value,
    multiple = false,
    multipleVariant = "table",
    variant = "standard",
    fullWidth = true,
    error = false,
    required = false,
    helperText = "",
    onChangeValue,
}: IProps) {
    const [users, setUsers] = useState<IUserDto[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<IUserRowDto[]>([]);
    const [selectedUserText, setSelectedUserText] = useState<string>("");
    const [isInit, setIsInit] = useState<boolean>(false);
    const roleList = useAppSelector((s) => s.user.roles);
    const [modalShow, setModalShow] = useState<boolean>(false);
    useEffect(() => {
        async function getData() {
            if (!isInit) {
                try {
                    const userList = await usersService.getAll();
                    const userListData = webApiResultData<IUserDto[]>(userList);
                    if (userListData.error) {
                        throw userListData.error;
                    }
                    const newUsers = userListData.result?.length
                        ? userListData.result.sort((a, b) => a.fullName.localeCompare(b.fullName))
                        : [];
                    setUsers(newUsers);
                    if (!!value) {
                        if (!multiple) {
                            let newSelectedUserText = "";
                            if (!!value) {
                                const foundedUser = newUsers.find((u) => u.id === value);
                                if (foundedUser?.id) {
                                    newSelectedUserText = foundedUser.fullName;
                                }
                            }

                            setSelectedUserText(newSelectedUserText);
                            onChangeValue(newUsers.find((u) => u.id === value)?.id || 0);
                        } else {
                            if (typeof value === "object") {
                                const newSelectedUsers = newUsers.filter((x) => value.includes(x.id));
                                setSelectedUsers(newSelectedUsers.map((x) => parseUserData(x, roleList)));
                                onChangeValue(!!newSelectedUsers ? newSelectedUsers.map((u) => u.id) : []);
                            }
                        }
                    }
                } catch (error) {
                } finally {
                    setIsInit(true);
                }
            }
        }
        getData();
    }, [isInit]);
    const delUsers = (ids: number[]) => {
        updateValue(selectedUsers.filter((u) => !ids.includes(u.id)).map((x) => x.id));
    };
    const toAdd = () => {
        setModalShow(true);
    };
    const addUsers = (data: any) => {
        if (multiple) {
            if (!!data?.length) {
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
            if (!!newValue) {
                const foundedUser = users.find((u) => u.id === newValue);
                if (foundedUser?.id) {
                    newSelectedUserText = foundedUser.fullName;
                }
            }

            setSelectedUserText(newSelectedUserText);
            onChangeValue(!!newValue ? users.find((u) => u.id === newValue)?.id || 0 : 0);
        } else {
            if (typeof value === "object") {
                const newSelectedUsers = users.filter((x) => newValue.includes(x.id));
                setSelectedUsers(newSelectedUsers.map((x) => parseUserData(x, roleList)));
                onChangeValue(!!newSelectedUsers ? newSelectedUsers.map((u) => u.id) : []);
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
                >
                    <Input
                        disabled
                        value={selectedUserText}
                        endAdornment={
                            !value ? (
                                <IconButton
                                    name="add"
                                    color="primary"
                                    onClick={toAdd}
                                    size="small"
                                />
                            ) : (
                                <IconButton
                                    name="cancel"
                                    onClick={() => updateValue(null)}
                                    size="small"
                                />
                            )
                        }
                    />
                </FormControl>
                <UserSelectList
                    open={modalShow}
                    onClose={addUsers}
                    userList={users}
                    rolesList={roleList}
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
                {multipleVariant === "table" ? (
                    <UserSelectTable
                        loading={!isInit}
                        users={selectedUsers}
                        onDel={delUsers}
                        onAdd={toAdd}
                    />
                ) : (
                    <UserSelectChips
                        loading={!isInit}
                        users={selectedUsers}
                        onDel={delUsers}
                        onAdd={toAdd}
                    />
                )}
                {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
            <UserSelectList
                open={modalShow}
                onClose={addUsers}
                userList={users}
                rolesList={roleList}
                multiple={multiple}
            />
        </>
    );
}
