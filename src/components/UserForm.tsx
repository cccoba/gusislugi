import { objCopy } from "api/common/helper";
import { useAppSelector } from "api/hooks/redux";
import { IUserDto } from "api/interfaces/user/IUserDto";
import Form, { IFormField, IFormFieldImage, IFormFieldSelect } from "components/Form";
import lang from "lang";
import { useMemo } from "react";

interface IProps {
    user: IUserDto;
    isCurrent?: boolean;
    onChangeValue?: (userData: IUserDto) => void;
}

const langPage = lang.components.userForm;

const defFields: IFormField[] = [
    { name: "image", title: langPage.image, type: "image", fieldProps: { previewWidth: "200px" } } as IFormFieldImage,
    { name: "lastName", title: langPage.lastName },
    { name: "firstName", title: langPage.firstName },
    { name: "nickname", title: langPage.nickname },
    { name: "roleId", title: langPage.role, type: "select", values: [] } as IFormFieldSelect,
    { name: "nationalityId", title: langPage.nationality, type: "select", values: [] } as IFormFieldSelect,
    { name: "citizenshipId", title: langPage.citizenship, type: "select", values: [] } as IFormFieldSelect,
    { name: "passport", title: langPage.passport },
    { name: "registration", title: langPage.registration },
    { name: "description", title: langPage.description, fieldProps: { multiline: true } },
];

function UserForm({ user, isCurrent = false, onChangeValue }: IProps) {
    const currentUserIsAdmin = useAppSelector((s) => s.user.tg?.isAdmin);
    const isMobile = useAppSelector((s) => s.device.isMobile);
    const roles = useAppSelector((s) => s.user.roles);
    const citizenships = useAppSelector((s) => s.user.citizenships);
    const nationalities = useAppSelector((s) => s.user.nationalities);

    const fields = useMemo(() => {
        const newFields = objCopy(defFields);
        for (const field of newFields) {
            if (!currentUserIsAdmin) {
                field.fieldProps = { ...field.fieldProps, inputProps: { readOnly: true } };
            }
            switch (field.name) {
                case "roleId":
                    field.values = roles;
                    break;
                case "nationalityId":
                    field.values = nationalities;
                    break;
                case "citizenshipId":
                    field.values = citizenships;
                    break;
                case "image":
                    field.readOnly = !currentUserIsAdmin;
                    break;
                case "nickname":
                case "description":
                    field.hidden = !currentUserIsAdmin;
                    break;
            }
        }
        return newFields;
    }, [currentUserIsAdmin, roles, citizenships, nationalities]);

    return (
        <>
            <Form
                values={user}
                fields={fields}
                submitBtnType={currentUserIsAdmin && onChangeValue ? "save" : "no"}
                columnCount={isMobile ? 1 : 3}
                onSubmit={onChangeValue}
            />
        </>
    );
}
export default UserForm;
