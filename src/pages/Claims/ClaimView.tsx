import { Form } from "components";
import { TFormField } from "components/Form";
import lang from "lang";

import { getEnumSelectValues } from "api/common/enumHelper";
import { ClaimStatusEnum } from "api/enums/ClaimStatusEnum";
import { IClaimDto } from "api/interfaces/user/IClaimDto";
import { useMemo } from "react";
import dateTime from "api/common/dateTime";

interface IProps extends IClaimDto {}

const langPage = lang.pages.claims.edit;

const defFields: TFormField[] = [
    { name: "title", title: langPage.fields.title, type: "text", fieldProps: { InputProps: { readOnly: true } } },
    {
        name: "status",
        title: langPage.fields.status,
        type: "select",
        values: getEnumSelectValues(ClaimStatusEnum, "ClaimStatusEnum"),
        fieldProps: { readOnly: true },
    },
    {
        name: "addDate",
        title: langPage.fields.addDate,
        type: "text",
        fieldProps: { InputProps: { readOnly: true } },
    },
    {
        name: "description",
        title: langPage.fields.description,
        type: "text",
        fieldProps: { multiline: true, InputProps: { readOnly: true } },
    },
    {
        name: "resolution",
        title: langPage.fields.resolution,
        type: "text",
        fieldProps: { multiline: true, InputProps: { readOnly: true } },
        hidden: true,
    },
];
function ClaimView({ ...props }: IProps) {
    const values = useMemo<any>(() => {
        const newValues: any = { ...props };
        newValues.addDate = dateTime(newValues.addDate);
        return newValues;
    }, [props]);
    const fields = useMemo(() => {
        const newFields = [...defFields];
        if (values.resolution) {
            const resolution = newFields.find((x) => x.name === "resolution");
            if (resolution) {
                resolution.hidden = false;
            }
        }
        return newFields;
    }, [values.resolution]);

    return (
        <Form
            fields={fields}
            values={values}
            submitBtnType="no"
        />
    );
}
export default ClaimView;
