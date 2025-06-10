import { useMemo, useState } from "react";
import { Button, InputAdornment, Link } from "@mui/material";

import Form from "components/Form";
import type { TFormField } from "components/Form/FormAdapters";
import lang, { getEnumSelectValues } from "lang";
import Passport from "pages/Passport";

import { checkFlagIncludes } from "api/common/enumHelper";
import { objCopy } from "api/common/helper";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";
import { useAppSelector } from "api/hooks/redux";
import type { IUserDto } from "api/interfaces/user/IUserDto";

import { WeaponEnum } from "api/enums/WeaponEnum";

import Icon from "./Icon";
import QrUserData from "./QrPrint/QrUserData";
import InputText from "./Inputs/InputText";

interface IProps {
    user: IUserDto;
    onChangeValue: (userData: IUserDto) => void;
}

export default function UserForm({ user, onChangeValue }: IProps) {
    const langPage = lang.components.userForm;

    const defFields: TFormField[] = [
        { name: "image", title: langPage.image, type: "image", fieldProps: { previewWidth: "200px" } },

        { type: "text", name: "firstName", title: langPage.firstName },

        { name: "nationalityId", title: langPage.nationality, type: "select", values: [] },
        {
            name: "weapon",
            title: langPage.weapon,
            type: "select",
            values: getEnumSelectValues(WeaponEnum, "WeaponEnum"),
            required: true,
        },
        { type: "text", name: "passport", title: langPage.passport },
        { type: "text", name: "registration", title: langPage.registration },
        { type: "text", name: "jobPosition", title: langPage.jobPosition },
        { type: "text", name: "birthDate", title: langPage.birthDate, required: true, minLength: 10 },
        { type: "text", name: "nickname", title: langPage.nickname },
        { type: "text", name: "weaponPoints", title: langPage.weaponPoints },
        { name: "roleId", title: langPage.role, type: "select", values: [] },
        { type: "text", name: "description", title: langPage.description, fieldProps: { multiline: true } },
    ];
    const currentUserRoleParams = useAppSelector((s) => s.user.user?.role.params.admins);
    const currentUserIsAdmin = useAppSelector((s) => s.user.tg?.isAdmin);
    const isEditable = useMemo(() => {
        return checkFlagIncludes(currentUserRoleParams || 0, RolePermissionFlag.Edit);
    }, [currentUserRoleParams]);
    const isMobile = useAppSelector((s) => s.device.isMobile);
    const roles = useAppSelector((s) => s.user.roles);
    const nationalities = useAppSelector((s) => s.user.nationalities);
    const fields = useMemo(() => {
        const newFields = objCopy(defFields);
        for (const field of newFields) {
            if (!isEditable) {
                field.fieldProps = { ...field.fieldProps, inputProps: { readOnly: true } };
            }
            switch (field.name) {
                case "nationalityId":
                    field.values = nationalities;
                    break;
                case "image":
                    field.readOnly = !isEditable;
                    break;
                case "roleId":
                    field.values = roles;
                    field.hidden = !currentUserIsAdmin;
                    break;
                case "tgLogin":
                case "nickname":
                case "description":
                    field.hidden = !currentUserIsAdmin;
                    break;
            }
        }
        return newFields;
    }, [currentUserIsAdmin, roles, nationalities, isEditable]);

    return (
        <>
            {!!isEditable && (
                <>
                    <ShowQR user={user} />
                    <ShowPassport user={user} />
                </>
            )}
            <Form
                values={user}
                fields={fields}
                submitBtnType={isEditable ? "save" : "no"}
                columnCount={isMobile ? 1 : 3}
                onSubmit={onChangeValue}
            />
            <InputText
                disabled
                value={user?.tgLogin || ""}
                onChangeValue={() => {}}
                label={langPage.tgLogin}
                InputProps={{
                    startAdornment: user?.tgLogin && (
                        <InputAdornment position="start">
                            <Button
                                component={Link}
                                variant="contained"
                                href={"https://t.me/" + user.tgLogin}
                                target="_blank"
                            >
                                <Icon name="links" />
                            </Button>
                        </InputAdornment>
                    ),
                }}
                variant="standard"
            />
        </>
    );
}
interface IShowQRProps {
    user: IUserDto;
}
function ShowQR({ user }: IShowQRProps) {
    const langPage = lang.components.userForm;
    const [isIdShowed, setIsIdShowed] = useState(false);
    const showMyId = () => {
        setIsIdShowed(true);
    };
    const hideMyId = () => {
        setIsIdShowed(false);
    };
    return (
        <>
            {!!isIdShowed && (
                <QrUserData
                    onClose={hideMyId}
                    title={langPage.titleShowId}
                    user={user}
                />
            )}
            <Button
                startIcon={<Icon name="id" />}
                onClick={showMyId}
                variant="outlined"
            >
                {langPage.showId}
            </Button>
        </>
    );
}
function ShowPassport({ user }: IShowQRProps) {
    const langPage = lang.components.userForm;
    const [isIdShowed, setIsIdShowed] = useState(false);
    const showMyId = () => {
        setIsIdShowed(true);
    };
    const hideMyId = () => {
        setIsIdShowed(false);
    };
    return (
        <>
            {!!isIdShowed && (
                <Passport
                    idName="guid"
                    userGuid={user.guid}
                    roles={[["qr"]]}
                    icon="badge"
                    modalProps={{
                        withCloseButton: true,
                        onClose: hideMyId,
                        responsiveWidth: true,
                    }}
                />
            )}
            <Button
                startIcon={<Icon name="badge" />}
                onClick={showMyId}
                variant="outlined"
            >
                {langPage.showPasport}
            </Button>
        </>
    );
}
