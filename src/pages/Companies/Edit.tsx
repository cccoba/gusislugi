import { useMemo } from "react";
import { Box } from "@mui/material";

import lang from "lang";
import { Accordion, Form, Modal } from "components";
import type { IFormProps } from "components/Form";

import type { ICompanyDto } from "api/interfaces/user/ICompanyDto";

import CompanyMoneyHistory from "./CompanyHistory";

interface IProps {
    data: ICompanyDto;
    onCancel: () => void;
    onSave: (data: ICompanyDto) => void;
    withAdd?: boolean;
    editable?: boolean;
    withSubtract?: boolean;
    onAddClick: () => void;
}

export default function CompaniesEdit({ data, onCancel, onSave, withAdd, editable, withSubtract, onAddClick }: IProps) {
    const langPage = lang.pages.companies;
    const formProps = useMemo<IFormProps>(() => {
        return {
            values: data,
            fields: [
                {
                    name: "title",
                    title: lang.title,
                    type: "text",
                    required: true,
                    disabled: !editable,
                },
                {
                    name: "address",
                    title: langPage.address,
                    type: "text",
                    required: true,
                    disabled: !editable,
                },
                {
                    name: "description",
                    title: lang.description,
                    type: "text",
                    fieldProps: { multiline: true },
                    disabled: !editable,
                },
                {
                    name: "money",
                    title: langPage.money,
                    type: "number",
                    disabled: true,
                    hidden: !data.id,
                },
                {
                    name: "uid",
                    title: langPage.userId,
                    type: "user",
                    required: true,
                    disabled: !editable,
                },
                {
                    name: "deputyUserId",
                    title: langPage.deputyUserId,
                    type: "user",
                    disabled: !editable,
                },
                {
                    name: "created_at",
                    title: lang.created_at,
                    type: "dateTime",
                    disabled: true,
                    hidden: !data.id,
                },
                {
                    name: "updated_at",
                    title: lang.updated_at,
                    type: "dateTime",
                    disabled: true,
                    hidden: !data.id,
                },
            ],
        };
    }, [data, editable]);
    return (
        <Modal
            open
            title={data.id ? lang.edit : lang.add}
            onClose={onCancel}
            withCloseButton
            responsiveWidth
        >
            {!data.id ? (
                <Form
                    {...formProps}
                    onSubmit={onSave}
                    onCancel={onCancel}
                />
            ) : (
                <Accordion
                    defaultId={editable ? "edit" : "money"}
                    values={[
                        {
                            id: "edit",
                            title: lang.edit,
                            child: (
                                <Form
                                    {...formProps}
                                    onSubmit={onSave}
                                    onCancel={onCancel}
                                    submitBtnType={!editable ? "no" : "cancel_save"}
                                />
                            ),
                        },
                        {
                            id: "money",
                            title: `${langPage.history} ${
                                data.companyMoneys?.length ? " ( " + data.companyMoneys.length + " )" : ""
                            }`,
                            child: (
                                <Box>
                                    <CompanyMoneyHistory
                                        data={data.companyMoneys || []}
                                        withDetails
                                        withAdd={!!withAdd || !!withSubtract}
                                        onAddClick={onAddClick}
                                    />
                                </Box>
                            ),
                        },
                    ]}
                />
            )}
        </Modal>
    );
}
