import Form, { IFormGroup } from "components/Form";

import { ICRUDAsyncEditConfig } from "./Edit";

interface IProps {
    values: any;
    fields: ICRUDAsyncEditConfig["fields"];
    groups?: IFormGroup[];
    onCancel: () => void;
    onSubmit: (values: any) => void;
}

function CRUDAsyncForm({ values, fields, groups, onCancel, onSubmit }: IProps) {
    if (!values) {
        return null;
    }
    return (
        <Form
            fields={fields}
            values={values}
            groups={groups}
            onSubmit={onSubmit}
            onCancel={onCancel}
        />
    );
}
export default CRUDAsyncForm;
