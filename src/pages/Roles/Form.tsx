import lang from "lang";
import { Form, PageOrModal } from "components";
import { IRoleDto } from "api/interfaces/user/IRoleDto";
import { TFormField } from "components/Form/FormAdapters";

interface IProps {
    role: IRoleDto;
    onCancel: () => void;
    onSave: (role: IRoleDto) => void;
}

export default function RoleForm({ role, onCancel, onSave }: IProps) {
    const langPage = lang.pages.roles;
    const fields: TFormField[] = [
        { name: "title", title: langPage.fields.title, type: "text", required: true },
        { name: "description", title: langPage.fields.description, type: "text", fieldProps: { multiline: true } },
        { name: "params", title: langPage.fields.params, type: "rolePermissions" },
    ];

    return (
        <PageOrModal
            modalProps={{
                onClose: onCancel,
                withCloseButton: true,
                responsiveWidth: true,
            }}
            title={role.title || lang.add}
        >
            <Form
                fields={fields}
                values={role}
                onCancel={onCancel}
                onSubmit={onSave}
            />
        </PageOrModal>
    );
}
