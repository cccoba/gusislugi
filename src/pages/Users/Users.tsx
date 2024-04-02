import { useMemo, useState } from "react";

import lang from "lang";
import { GoodTable, Icon, IconButton, Page } from "components";
import useGetData from "store/rtkProvider";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { IUserDto } from "api/interfaces/user/IUserDto";
import { IGoodTableField } from "components/GoodTable";
import { useAppSelector } from "api/hooks/redux";
import { Button, Menu, MenuItem, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";

const langPage = lang.pages.users;
const defFields: IGoodTableField[] = [
    { name: "id", title: langPage.fields.id, format: "number", maxWidth: "50px" },
    { name: "image", title: langPage.fields.image, format: "image", noSort: true, maxWidth: "50px" },
    { name: "fullName", title: langPage.fields.fullName },
    { name: "nationalityId", title: langPage.fields.nationalityId, format: "list" },
    { name: "citizenshipId", title: langPage.fields.citizenshipId, format: "list" },
    { name: "created_at", title: langPage.fields.created_at, format: "date" },
    { name: "actions", title: langPage.fields.actions, format: "component" },
];

function Users({ roles }: IPageWithRoles) {
    const { data, isLoading } = useGetData<IUserDto[]>("users", []);
    const nationalities = useAppSelector((x) => x.user.nationalities);
    const citizenships = useAppSelector((x) => x.user.citizenships);
    const fields = useMemo(() => {
        const newFields = [...defFields];
        const nationalityId = newFields.find((x) => x.name === "nationalityId");
        if (nationalityId) {
            nationalityId.formatProps = nationalities;
        }

        const citizenshipId = newFields.find((x) => x.name === "citizenshipId");
        if (citizenshipId) {
            citizenshipId.formatProps = citizenships;
        }
        return newFields;
    }, [nationalities, citizenships]);

    const values = useMemo(() => {
        if (data?.length) {
            return data.map((x) => ({ ...x, actions: <UserActions /> }));
        }
        return [];
    }, [data]);

    const toAdd = (data: any) => {
        console.log("toAdd", data);
    };

    return (
        <Page
            title={langPage.title}
            icon="group"
            roles={roles}
            isLoading={isLoading}
        >
            <GoodTable
                fields={fields}
                values={values}
                actions={[
                    {
                        name: "add",
                        icon: "add",
                        color: "primary",
                        tooltip: lang.add,
                        onClick: toAdd,
                        disable: (rows: any[]) => !rows?.length,
                    },
                ]}
            />
        </Page>
    );
}

function UserActions() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton
                name="menu"
                onClick={handleClick}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </>
    );
}
export default Users;
