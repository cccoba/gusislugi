import Form from "components/Form";
import lang from "lang";
import { ICRUDAsyncEditConfig } from "./Edit";

interface IProps {
    values: any;
    fields: ICRUDAsyncEditConfig["fields"];
    onCancel: () => void;
    onSubmit: (values: any) => void;
}

function CRUDAsyncForm({ values, fields, onCancel, onSubmit }: IProps) {
    if (!values) {
        return null;
    }
    return (
        <Form
            fields={fields}
            values={values}
            onSubmit={onSubmit}
            onCancel={onCancel}
        />
    );
}
export default CRUDAsyncForm;
