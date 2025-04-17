import { useMemo, useState } from "react";

import Form from "components/Form";
import lang from "lang";
import { TFormField } from "components/Form/FormAdapters";

import { objCopy } from "api/common/helper";
import { useAppSelector } from "api/hooks/redux";
import { IUserDto } from "api/interfaces/user/IUserDto";

import { checkFlagIncludes } from "api/common/enumHelper";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";
import { Button } from "@mui/material";
import Icon from "./Icon";
import QrUserData from "./QrPrint/QrUserData";
import Passport from "pages/Passport";

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
        { name: "citizenshipId", title: langPage.citizenship, type: "select", values: [] },
        { type: "text", name: "passport", title: langPage.passport },
        { type: "text", name: "registration", title: langPage.registration },
        { type: "text", name: "nickname", title: langPage.nickname },
        { name: "roleId", title: langPage.role, type: "select", values: [] },
        { type: "text", name: "tgLogin", title: langPage.tgLogin, disabled: true },
        { type: "text", name: "description", title: langPage.description, fieldProps: { multiline: true } },
    ];
    const currentUserRoleParams = useAppSelector((s) => s.user.user?.role.params.admins);
    const currentUserIsAdmin = useAppSelector((s) => s.user.tg?.isAdmin);
    const isEditable = useMemo(() => {
        return checkFlagIncludes(currentUserRoleParams || 0, RolePermissionFlag.Edit);
    }, [currentUserRoleParams]);
    const isMobile = useAppSelector((s) => s.device.isMobile);
    const roles = useAppSelector((s) => s.user.roles);
    const citizenships = useAppSelector((s) => s.user.citizenships);
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
                case "citizenshipId":
                    field.values = citizenships;
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
    }, [currentUserIsAdmin, roles, citizenships, nationalities, isEditable]);

    return (
        <>
            {!!isEditable && (
                <>
                    <ShowQR user={user} />
                    <ShowPasport user={user} />
                </>
            )}
            <Form
                values={user}
                fields={fields}
                submitBtnType={isEditable ? "save" : "no"}
                columnCount={isMobile ? 1 : 3}
                onSubmit={onChangeValue}
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
function ShowPasport({ user }: IShowQRProps) {
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
