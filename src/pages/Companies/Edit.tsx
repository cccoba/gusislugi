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
    withSubtract?: boolean;
    onAddClick: () => void;
}

export default function CompaniesEdit({ data, onCancel, onSave, withAdd, withSubtract, onAddClick }: IProps) {
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
                },
                {
                    name: "address",
                    title: langPage.address,
                    type: "text",
                    required: true,
                },
                {
                    name: "description",
                    title: lang.description,
                    type: "text",
                    fieldProps: { multiline: true },
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
                },
                {
                    name: "deputyUserId",
                    title: langPage.deputyUserId,
                    type: "user",
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
    }, [data]);
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
                    defaultId="edit"
                    values={[
                        {
                            id: "edit",
                            title: lang.edit,
                            child: (
                                <Form
                                    {...formProps}
                                    onSubmit={onSave}
                                    onCancel={onCancel}
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
