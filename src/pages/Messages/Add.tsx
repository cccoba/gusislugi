import { Form } from "components";
import lang from "lang";

interface IProps {
    onClose: (needUpdate: boolean) => void;
}

export default function MessageAdd({ onClose }: IProps) {
    const langPage = lang.pages.messages;
    const toSave = (data: any) => {
        console.log("toSave", data);
    };
    const onCancel = () => {
        onClose(false);
    };
    return (
        <Form
            fields={[]}
            values={{}}
            onSubmit={toSave}
        />
    );
}
