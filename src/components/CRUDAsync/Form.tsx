import type { IFormGroup } from "components/Form";
import Form from "components/Form";

import type { IModalProps } from "components/Modal";

import type { ICRUDAsyncEditConfig } from "./Edit";

interface IProps {
    modalProps?: IModalProps;
    values: any;
    fields: ICRUDAsyncEditConfig["fields"];
    groups?: IFormGroup[];
    onCancel: () => void;
    onSubmit: (values: any) => void;
}

function CRUDAsyncForm({ values, fields, groups, onCancel, onSubmit, modalProps }: IProps) {
    if (!values) {
        return null;
    }
    return (
        <Form
            modalProps={modalProps}
            fields={fields}
            values={values}
            groups={groups}
            onSubmit={onSubmit}
            onCancel={onCancel}
        />
    );
}
export default CRUDAsyncForm;
