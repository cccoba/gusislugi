import lang from "lang";
import { Form, PageOrModal } from "components";
import { IRoleDto } from "api/interfaces/user/IRoleDto";
import { TFormField } from "components/Form/FormAdapters";

const langPage = lang.pages.roles;

interface IProps {
    role: IRoleDto;
    onCancel: () => void;
    onSave: (role: IRoleDto) => void;
}
const fields: TFormField[] = [
    { name: "title", title: langPage.fields.title, type: "text", required: true },
    { name: "params", title: langPage.fields.params, type: "rolePermissions" },
];
function RoleForm({ role, onCancel, onSave }: IProps) {
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
export default RoleForm;
