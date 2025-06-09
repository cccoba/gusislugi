import { useMemo, useState } from "react";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import lang, { sprintf } from "lang";
import { Form, GoodTable, type IGoodTableField, IconButton, Modal, Page, RoleChecker, Switcher } from "components";
import useGetData from "store/rtkProvider";
import SendUserNotification from "components/SendUserNotification";
import type { TFormField } from "components/Form/FormAdapters";

import type { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import type { IUserDto } from "api/interfaces/user/IUserDto";
import { useAppSelector } from "api/hooks/redux";
import type { IFormFieldSelect } from "components/Form/Adapters/Select";
import { users, webApiResultData } from "api/data";
import { useNotifier } from "api/hooks/useNotifier";
import { MessageStatusEnum } from "api/enums/MessageStatusEnum";
import { WeaponEnum } from "api/enums/WeaponEnum";

type TUserAction = "edit" | "message" | "money" | "passport";
interface IUserActions {
    onAction: (actionName: TUserAction, user: IUserDto) => void;
    user: IUserDto;
}

export default function AdminUserList({ roles }: IPageWithRoles) {
    const langPage = lang.pages.users;
    const langAddForm = lang.components.userForm;

    const addValue: IUserDto = {
        id: 0,
        guid: "",
        nickname: "",
        roleId: 1,
        firstName: "",
        nationalityId: 1,
        weapon: WeaponEnum.Knife,
        birthDate: "",
        jobPosition: "",
        passport: "",
        registration: "",
        image: "",
        description: "",
        money: 0,
        weaponPoints: 0,
        role: {
            id: 1,
            description: "",
            params: {},
            title: "",
        },
    };
    const { data, isLoading: initLoading, refetch } = useGetData<IUserDto[]>("users", []);
    const [messageUser, setMessageUser] = useState<IUserDto | null>(null);
    const [addForm, setAddForm] = useState(false);
    const navigate = useNavigate();
    const { showError, showSuccess } = useNotifier();
    const [isLoading, setIsLoading] = useState(false);
    const nationalities = useAppSelector((x) => x.user.nationalities);
    const allRoles = useAppSelector((x) => x.user.roles);
    const [withImage, setWithImage] = useState(false);
    const fields = useMemo(() => {
        const defFields: IGoodTableField[] = [
            { name: "id", title: langPage.fields.id, format: "number", maxWidth: "50px" },
            { name: "actions", title: langPage.fields.actions, format: "component" },
            { name: "image", title: langPage.fields.image, format: "image", noSort: true, maxWidth: "30px" },
            { name: "firstName", title: langPage.fields.firstName, wrap: true },
            { name: "nationalityId", title: langPage.fields.nationalityId, format: "list" },
            { name: "nickname", title: langPage.fields.nickname },
            { name: "roleId", title: langPage.fields.roleId, format: "list" },
            { name: "tgLogin", title: langPage.fields.tgLogin },
            { name: "passport", title: "", hidden: true },
        ];
        const defAddFields: TFormField[] = [
            { name: "image", title: langAddForm.image, type: "image", fieldProps: { previewWidth: "200px" } },

            { type: "text", name: "firstName", title: langAddForm.firstName },
            { type: "text", name: "birthDate", title: langAddForm.birthDate, required: true },

            { name: "nationalityId", title: langAddForm.nationality, type: "select", values: [] },
            { type: "text", name: "passport", title: langAddForm.passport },
            { type: "text", name: "registration", title: langAddForm.registration },
            { type: "text", name: "nickname", title: langAddForm.nickname },
            { name: "roleId", title: langAddForm.role, type: "select", values: [] },
            { type: "text", name: "description", title: langAddForm.description, fieldProps: { multiline: true } },
        ];
        const fields = { fields: [...defFields], addFields: [...defAddFields] };
        if (!withImage) {
            fields.fields = fields.fields.filter((x) => x.name !== "image");
        }
        const nationalityId = fields.fields.find((x) => x.name === "nationalityId");
        if (nationalityId) {
            nationalityId.formatProps = nationalities;
        }
        const roleId = fields.fields.find((x) => x.name === "roleId");
        if (roleId) {
            roleId.formatProps = allRoles;
        }

        const nationalityId2 = fields.addFields.find((x) => x.name === "nationalityId") as IFormFieldSelect;
        if (nationalityId2) {
            nationalityId2.values = nationalities;
        }
        const roleId2 = fields.addFields.find((x) => x.name === "roleId") as IFormFieldSelect;
        if (roleId2) {
            roleId2.values = allRoles;
        }
        return fields;
    }, [nationalities, allRoles, withImage]);

    const values = useMemo(() => {
        if (data?.length) {
            return data.map((x) => ({
                ...x,
                tgLogin: x.tgLogin ? `@${x.tgLogin}` : null,
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
            case "passport":
                navigate(`/passport/${user.guid}`, { state: { backUrl: "/users" } });
                break;
        }
    }
    const hideMessageSender = () => {
        setMessageUser(null);
    };
    const showAddForm = () => {
        setAddForm(true);
    };
    const hideAddForm = () => {
        setAddForm(false);
    };
    const toAdd = (newUser: IUserDto) => {
        setIsLoading(true);
        users
            .addUser(newUser)
            .then((res) => {
                const { error, result } = webApiResultData<IUserDto>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    showSuccess(langPage.success.addUser);
                    hideAddForm();
                    setIsLoading(false);
                    refetch();
                }
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.addUser);
                setIsLoading(false);
            });
    };

    return (
        <Page
            title={langPage.title}
            icon="users"
            roles={roles}
            isLoading={isLoading || initLoading}
        >
            {!!messageUser && (
                <SendUserNotification
                    text=""
                    uid={messageUser.id}
                    title={sprintf(langPage.messageSenderTitle, messageUser?.firstName)}
                    status={MessageStatusEnum.Messages}
                    onClose={hideMessageSender}
                />
            )}
            {!!addForm && (
                <Modal
                    open
                    responsiveWidth
                    onClose={hideAddForm}
                    title={langPage.addUser}
                    withCloseButton
                >
                    <Form
                        fields={fields.addFields}
                        values={addValue}
                        onSubmit={toAdd}
                        onCancel={hideAddForm}
                    />
                </Modal>
            )}
            <Box>
                <Switcher
                    value={withImage}
                    onChangeValue={setWithImage}
                    textValue={langPage.withImage}
                />
            </Box>
            <GoodTable
                fields={fields.fields}
                values={values}
                actions={[
                    { name: "refresh", icon: "refresh", onClick: refetch },
                    { name: "add", icon: "add", onClick: showAddForm },
                ]}
            />
        </Page>
    );
}

function UserActions({ onAction, user }: IUserActions) {
    const langPage = lang.pages.users.actions;
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
    const toPassport = () => {
        onAction("passport", user);
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
                                {langPage.edit}
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={toMessage}>
                            <Typography
                                variant="inherit"
                                noWrap
                            >
                                {langPage.message}
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={toPassport}>
                            <Typography
                                variant="inherit"
                                noWrap
                            >
                                {langPage.passport}
                            </Typography>
                        </MenuItem>
                    </>
                </RoleChecker>
            </Menu>
        </>
    );
}
