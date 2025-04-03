import { Avatar, Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useState } from "react";

import lang from "lang";
import Icon from "components/Icon";
import dateTime from "api/common/dateTime";
import IconButton from "components/Icon/IconButton";

import { IMedicinePatientParamDto } from "api/interfaces/Medicine/IMedicinePatientParamDto";

import MedicineParamValue from "./Value";
import MedicineParamAddTest from "./AddTest";
import MedicineParamEdit from "./ParamEdit";

export type TMedicineParamAction = ((action: "edit", param: { id: number; value: string }) => void) &
    ((action: "add", param: { id: number; testId: number }) => void);
interface IProps {
    param: IMedicinePatientParamDto;
    isAdmin: boolean;
    onAction: TMedicineParamAction;
}
export default function MedicineParamViewer({ param, isAdmin, onAction }: IProps) {
    const [showedAdd, setShowedAdd] = useState(false);
    const [showedEdit, setShowedEdit] = useState(false);
    const showAdd = () => {
        setShowedAdd(true);
    };
    const showEdit = () => {
        setShowedEdit(isAdmin);
    };
    const hideEdit = () => {
        setShowedEdit(false);
    };
    const toEdit = (value: string) => {
        onAction("edit", { id: param.id, value });
    };
    const toAdd = (testId?: number) => {
        if (testId) {
            onAction("add", { id: param.id, testId });
        }
        setShowedAdd(false);
    };
    return (
        <>
            {showedAdd && <MedicineParamAddTest onSelect={toAdd} />}
            {showedEdit && (
                <MedicineParamEdit
                    onChangeValue={toEdit}
                    onCancel={hideEdit}
                    param={param.param}
                    value={param.value}
                />
            )}
            <Card>
                <CardHeader
                    title={<Typography>{param.param?.title}</Typography>}
                    avatar={
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                            {param.param?.icon ? <Icon name={param.param?.icon} /> : param.param?.title?.[0]}
                        </Avatar>
                    }
                    action={
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                flexDirection: "column",
                            }}
                        >
                            <IconButton
                                name="add"
                                onClick={showAdd}
                                color="primary"
                                tooltip={lang.pages.medicine.params.add}
                                size="small"
                            />
                            {isAdmin && (
                                <IconButton
                                    name="edit"
                                    onClick={showEdit}
                                    tooltip={lang.edit}
                                    size="small"
                                />
                            )}
                        </Box>
                    }
                    subheader={
                        param?.lastSeen?.date ? (
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                            >
                                <Typography>{dateTime(param.lastSeen?.date)}</Typography>
                                <Icon
                                    tooltip={lang.pages.medicine.params.lastSeen}
                                    name="dateTime"
                                    fontSize="small"
                                />
                            </Box>
                        ) : undefined
                    }
                    sx={{
                        p: 1,
                        overflowX: "auto",
                    }}
                />
                <CardContent
                    sx={{
                        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                        padding: "8px 16px!important",
                        minHeight: "70px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                    }}
                >
                    <MedicineParamValue
                        {...param}
                        isAdmin={isAdmin}
                        onAdd={showAdd}
                    />
                </CardContent>
            </Card>
        </>
    );
}
