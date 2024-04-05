import { useMemo, useState } from "react";
import { Menu, MenuItem, Typography } from "@mui/material";

import lang, { sprintf } from "lang";
import { GoodTable, IconButton, Page, RoleChecker } from "components";
import { IGoodTableField } from "components/GoodTable";
import useGetData from "store/rtkProvider";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { IUserDto } from "api/interfaces/user/IUserDto";
import { useAppSelector } from "api/hooks/redux";
import { useNavigate } from "react-router-dom";
import SendUserNotification from "components/SendUserNotification";

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

type TUserAction = "edit" | "message" | "money";
interface IUserActions {
    onAction: (actionName: TUserAction, user: IUserDto) => void;
    user: IUserDto;
}

function UserList({ roles }: IPageWithRoles) {
    const { data, isLoading } = useGetData<IUserDto[]>("users", []);
    const [messageUser, setMessageUser] = useState<IUserDto | null>(null);
    const navigate = useNavigate();
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
            return data.map((x) => ({
                ...x,
                actions: (
                    <UserActions
                        user={x}
                        onAction={toAction}
                    />
                ),
            }));
        }
        return [];
    }, [data]);
    function toAction(actionName: TUserAction, user: IUserDto) {
        switch (actionName) {
            case "edit":
                navigate(`/users/${user.id}`);
                break;
            case "money":
                navigate(`/userMoney/${user.id}`);
                break;
            case "message":
                setMessageUser(user);
                break;
        }
    }
    const hideMessageSender = () => {
        setMessageUser(null);
    };

    return (
        <Page
            title={langPage.title}
            icon="group"
            roles={roles}
            isLoading={isLoading}
        >
            {!!messageUser && (
                <SendUserNotification
                    text=""
                    uid={messageUser.id}
                    title={sprintf(langPage.messageSenderTitle, messageUser?.fullName)}
                    onClose={hideMessageSender}
                />
            )}
            <GoodTable
                fields={fields}
                values={values}
            />
        </Page>
    );
}

function UserActions({ onAction, user }: IUserActions) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const toEdit = () => {
        onAction("edit", user);
    };
    const toMessage = () => {
        onAction("message", user);
    };
    const toMoney = () => {
        onAction("money", user);
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
            >
                <RoleChecker roles={[["admins"]]}>
                    <>
                        <MenuItem onClick={toEdit}>
                            <Typography
                                variant="inherit"
                                noWrap
                            >
                                {langPage.actions.edit}
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={toMessage}>
                            <Typography
                                variant="inherit"
                                noWrap
                            >
                                {langPage.actions.message}
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={toMoney}>
                            <Typography
                                variant="inherit"
                                noWrap
                            >
                                {langPage.actions.money}
                            </Typography>
                        </MenuItem>
                    </>
                </RoleChecker>
            </Menu>
        </>
    );
}
export default UserList;
