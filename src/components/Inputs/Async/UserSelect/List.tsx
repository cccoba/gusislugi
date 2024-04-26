import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

import lang from "lang";
import Modal from "components/Modal";
import List from "components/List";
import GoodTable, { IGoodTableField } from "components/GoodTable";

import { IUserDto } from "api/interfaces/user/IUserDto";
import { IRoleDto } from "api/interfaces/user/IRoleDto";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

import { IUserRowDto, parseUserData } from ".";

const langPage = lang.components.userSelect.list;

type IUserSelectListType = "type" | "roles" | "allList" | "userList";
interface IUserSelectList {
    open?: boolean;
    onClose?: (data: any) => void;
    initType?: IUserSelectListType;
    userList: IUserDto[];
    rolesList: IRoleDto[];
    multiple?: boolean;
}

const typeList = [
    { id: "roles", title: langPage.roles, icon: "user" },
    { id: "allList", title: langPage.allList, icon: "user" },
];

export const userFields: IGoodTableField[] = [
    /*{
        name: "image",
        title: langPage.fields.imageId,
        maxWidth: "70px",
        format: "image",
        noSort: true,
    },*/
    { name: "firstName", title: langPage.fields.firstName, maxWidth: "180px" },
    { name: "role", title: langPage.fields.role, maxWidth: "100px" },
];

export default function UserSelectList({
    onClose,
    open = false,
    initType = "type",
    userList = [],
    rolesList = [],
    multiple = false,
}: IUserSelectList) {
    const [type, setType] = useState<IUserSelectListType>(initType);
    const [filteredUsers, setFilteredUsers] = useState<IUserRowDto[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

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
                case "allList":
                case "userList":
                    return true;
            }
            return false;
        });
        setFilteredUsers(newFilteredUsers.map((user) => parseUserData(user, rolesList)));
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
                        values={typeList}
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
            case "allList":
                showUsersList("userList");
                break;
        }
        return null;
    };
    const onSelected = (items: any) => {
        if (!multiple) {
            onCancel(items?.id || 0);
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
                        onRowClick={onSelected}
                        fields={userFields}
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
