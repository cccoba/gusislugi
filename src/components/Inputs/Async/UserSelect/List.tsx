import { useEffect, useMemo, useState } from "react";
import { Box, Button } from "@mui/material";

import lang from "lang";
import Modal from "components/Modal";
import type { IListItem } from "components/List";
import List from "components/List";
import type { IGoodTableField } from "components/GoodTable";
import GoodTable from "components/GoodTable";

import type { IUserDto } from "api/interfaces/user/IUserDto";
import type { IRoleDto } from "api/interfaces/user/IRoleDto";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

import { useAppSelector } from "api/hooks/redux";

import type { INationalityDto } from "api/interfaces/user/INationalityDto";

import type { IUserRowDto } from ".";
import { parseUserData } from ".";

const langPage = lang.components.userSelect.list;

type IUserSelectListType = "type" | "roles" | "allList" | "userList" | "nationalities";
interface IUserSelectList {
    open?: boolean;
    onClose?: (data: any) => void;
    initType?: IUserSelectListType;
    userList: IUserDto[];
    rolesList: IRoleDto[];
    nationalitiesList: INationalityDto[];
    multiple?: boolean;
}

export default function UserSelectList({
    onClose,
    open = false,
    initType = "type",
    userList = [],
    rolesList = [],
    nationalitiesList = [],
    multiple = false,
}: IUserSelectList) {
    const [type, setType] = useState<IUserSelectListType>(initType);
    const [filteredUsers, setFilteredUsers] = useState<IUserRowDto[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const adminPermissions = useAppSelector((s) => s.user.user?.role.params.admins);

    const props = useMemo(() => {
        const defTypeList: IListItem[] = [
            { id: "allList", title: langPage.allList, icon: "user" },
            { id: "roles", title: langPage.roles, icon: "roles" },
            { id: "nationalities", title: langPage.nationalities, icon: "list" },
        ];

        const defUserFields: IGoodTableField[] = [
            /*{
                name: "image",
                title: langPage.fields.imageId,
                maxWidth: "70px",
                format: "image",
                noSort: true,
            },*/
            { name: "firstName", title: langPage.fields.firstName, maxWidth: "180px" },
            { name: "roleId", title: langPage.fields.role, maxWidth: "100px", format: "list", formatProps: rolesList },
            {
                name: "nationalityId",
                title: langPage.fields.nationality,
                maxWidth: "100px",
                format: "list",
                formatProps: nationalitiesList,
            },
            { name: "nickname", title: "", hidden: true },
            { name: "tgLogin", title: "", hidden: true },
        ];
        const newProps = { typeList: [...defTypeList], userFields: [...defUserFields] };
        if (!adminPermissions) {
            newProps.typeList = newProps.typeList.filter((x) => x.id !== "roles");
            newProps.userFields = newProps.userFields.filter((x) => x.name !== "role");
        }
        return newProps;
    }, [adminPermissions, rolesList, nationalitiesList]);
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
                case "nationalities":
                    if (typeof filterValue === "number") {
                        return u.nationalityId === filterValue;
                    }
                    return false;
                case "allList":
                case "userList":
                    return true;
            }
            return false;
        });
        setFilteredUsers(newFilteredUsers.map((user) => parseUserData(user, rolesList, nationalitiesList)));
        setType("userList");
    };
    const onCancel = (value: any = null) => {
        if (onClose) {
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
            case "nationalities":
                return (
                    <List
                        filter={true}
                        values={nationalitiesList}
                        onSelectValue={(t) => showUsersList("nationalities", t.id)}
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
                        typeSelection={multiple ? "multiple" : "single"}
                        onSelectedRows={onSelected}
                        fields={props.userFields}
                        autoFocus="simpleSearchInput"
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
