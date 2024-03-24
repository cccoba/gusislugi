import { useEffect, useMemo, useState } from "react";

import lang from "lang";
import { Form } from "components";

import { ClaimStatusEnum } from "api/enums/ClaimStatusEnum";
import { IClaimDto } from "api/interfaces/user/IClaimDto";
import { TFormField } from "components/Form";
import { getEnumSelectValues } from "api/common/enumHelper";

const langPage = lang.pages.claims;

interface IProps {
    id?: number;
    userId?: number;
    onCancel: () => void;
    onSave: (data: IClaimDto) => void;
}
const defValues: IClaimDto = {
    id: 0,
    description: "",
    resolution: "",
    status: ClaimStatusEnum.Created,
    uid: 0,
    title: "",
};
const defFields: TFormField[] = [
    { name: "title", title: langPage.fields.title, type: "text", required: true },
    {
        name: "status",
        title: langPage.fields.status,
        type: "select",
        required: true,
        values: getEnumSelectValues(ClaimStatusEnum, "ClaimStatusEnum"),
    },
    {
        name: "uid",
        title: langPage.fields.uid,
        type: "user",
        required: true,
    },
    {
        name: "description",
        title: langPage.fields.description,
        type: "text",
        required: true,
        fieldProps: { multiline: true },
    },
    { name: "resolution", title: langPage.fields.resolution, type: "text", fieldProps: { multiline: true } },
];
function ClaimEdit({ userId = 0, id = 0, onCancel, onSave }: IProps) {
    const [values, setValues] = useState(defValues);
    const claimId = useMemo(() => {
        if (id) {
            return id;
        }
        return 0;
    }, [id]);
    useEffect(() => {
        if (!claimId) {
            if (userId) {
                setValues({ ...defValues, uid: userId });
            } else {
                setValues(defValues);
            }
        }
    }, [claimId, userId]);
    const fields = useMemo(() => {
        const newFields = [...defFields];
        if (userId) {
            for (const field of newFields) {
                switch (field.name) {
                    case "status":
                    case "uid":
                    case "resolution":
                        field.hidden = true;
                        break;
                }
            }
        }
        return newFields;
    }, [userId]);
    return (
        <Form
            fields={fields}
            values={values}
            onCancel={onCancel}
            onSubmit={onSave}
        />
    );
}
export default ClaimEdit;
