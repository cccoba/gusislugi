import { useEffect, useMemo, useState } from "react";
import { Box, Button } from "@mui/material";

import lang from "lang";
import Modal from "components/Modal";
import List from "components/List";
import GoodTable, { IGoodTableField } from "components/GoodTable";

import { IUserDto } from "api/interfaces/user/IUserDto";
import { IRoleDto } from "api/interfaces/user/IRoleDto";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { ICitizenshipDto } from "api/interfaces/user/ICitizenshipDto";

import { IUserRowDto, parseUserData } from ".";
import { useAppSelector } from "api/hooks/redux";

const langPage = lang.components.userSelect.list;

type IUserSelectListType = "type" | "roles" | "citizenships" | "allList" | "userList";
interface IUserSelectList {
    open?: boolean;
    onClose?: (data: any) => void;
    initType?: IUserSelectListType;
    userList: IUserDto[];
    rolesList: IRoleDto[];
    citizenshipList: ICitizenshipDto[];
    multiple?: boolean;
}

const defTypeList = [
    { id: "roles", title: langPage.roles, icon: "user" },
    { id: "citizenships", title: langPage.citizenships, icon: "user" },
    { id: "allList", title: langPage.allList, icon: "user" },
];

export const defUserFields: IGoodTableField[] = [
    /*{
        name: "image",
        title: langPage.fields.imageId,
        maxWidth: "70px",
        format: "image",
        noSort: true,
    },*/
    { name: "firstName", title: langPage.fields.firstName, maxWidth: "180px" },
    { name: "role", title: langPage.fields.role, maxWidth: "100px" },
    { name: "citizenship", title: langPage.fields.citizenship, maxWidth: "100px" },
    { name: "nickname", title: "", hidden: true },
    { name: "tgLogin", title: "", hidden: true },
];

export default function UserSelectList({
    onClose,
    open = false,
    initType = "type",
    userList = [],
    rolesList = [],
    citizenshipList = [],
    multiple = false,
}: IUserSelectList) {
    const [type, setType] = useState<IUserSelectListType>(initType);
    const [filteredUsers, setFilteredUsers] = useState<IUserRowDto[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const adminPermissions = useAppSelector((s) => s.user.user?.role.params.admins);
    const props = useMemo(() => {
        const newProps = { typeList: [...defTypeList], userFields: [...defUserFields] };
        if (!adminPermissions) {
            newProps.typeList = newProps.typeList.filter((x) => x.id !== "roles");
            newProps.userFields = newProps.userFields.filter((x) => x.name !== "role");
        }
        return newProps;
    }, [adminPermissions]);
    useEffect(() => {
        setType(initType);
    }, [initType]);
    const showUsersList = (filterType: IUserSelectListType, filterValue?: number | string) => {
        const newFilteredUsers = userList.filter((u) => {
            switch (filterType) {
                case "roles":
                    if (typeof filterValue === "number") {
                        return u.roleId === filterValue;
                    }
                    return false;
                case "citizenships":
                    if (typeof filterValue === "number") {
                        return u.citizenshipId === filterValue;
                    }
                    return false;
                case "allList":
                case "userList":
                    return true;
            }
            return false;
        });
        setFilteredUsers(newFilteredUsers.map((user) => parseUserData(user, rolesList, citizenshipList)));
        setType("userList");
    };
    const onCancel = (value: any = null) => {
        if (!!onClose) {
            onClose(value);
        }
        setType(initType);
        setSelectedIds([]);
    };
    const renderSwitch = () => {
        switch (type) {
            case "type":
                return (
                    <List
                        values={props.typeList}
                        onSelectValue={(v) => setType(v.id as IUserSelectListType)}
                    />
                );
            case "roles":
                return (
                    <List
                        filter={true}
                        values={rolesList}
                        onSelectValue={(t) => showUsersList("roles", t.id)}
                    />
                );
            case "citizenships":
                return (
                    <List
                        filter={true}
                        values={citizenshipList}
                        onSelectValue={(t) => showUsersList("citizenships", t.id)}
                    />
                );
            case "allList":
                showUsersList("userList");
                break;
        }
        return null;
    };
    const onSelected = (items: IUserRowDto[]) => {
        if (!multiple) {
            if (items?.length) {
                onCancel(items?.[0]?.id || 0);
            }
        } else {
            setSelectedIds(items.map((u: any) => u.id));
        }
    };
    return (
        <Modal
            open={open}
            title={langPage.title}
            onClose={() => onCancel(null)}
            withCloseButton
            responsiveWidth
        >
            {type === "userList" ? (
                <>
                    <GoodTable<IUserRowDto>
                        values={filteredUsers}
                        isMultiSelection={multiple}
                        onSelectedRows={onSelected}
                        fields={props.userFields}
                        order={{ direction: SortOrderEnum.Ascending, sort: "firstName" }}
                    />
                    {multiple && (
                        <Box sx={{ textAlign: "right" }}>
                            <Button
                                disabled={!selectedIds.length}
                                onClick={() => onCancel(selectedIds)}
                            >
                                {langPage.addBtn}
                                {selectedIds.length ? " ( " + selectedIds.length + " )" : ""}
                            </Button>
                        </Box>
                    )}
                </>
            ) : (
                renderSwitch()
            )}
        </Modal>
    );
}
