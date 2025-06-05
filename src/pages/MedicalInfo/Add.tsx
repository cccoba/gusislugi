import { useMemo, useRef, useState } from "react";

import { MedicalInfoStatusEnum } from "api/enums/MedicalInfoStatusEnum";
import type { IMedicalInfoAddDto } from "api/interfaces/user/IMedicalInfoAddDto";

import { Form, Icon } from "components";
import lang, { getEnumSelectValues, sprintf } from "lang";
import { Box, Button } from "@mui/material";
import { useAppSelector, useLoader } from "api/hooks/redux";
import { checkFlagIncludes, getValuesByFlag } from "api/common/enumHelper";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";
import { medicalInfo, webApiResultData } from "api/data";
import { useNotifier } from "api/hooks/useNotifier";
import type { ISelectValue } from "components/Inputs/Select";

interface IProps {
    needRefresh: () => void;
}
export default function MedicalInfoAdd({ needRefresh }: IProps) {
    const langPage = lang.pages.medicalInfo;
    const [isOpen, setIsOpen] = useState(false);
    const { setIsLoading } = useLoader();
    const { showError, showSuccess } = useNotifier();
    const currentUserRoleParams = useAppSelector((s) => s.user.user?.role.params);
    const addProps = useMemo<{ flag: boolean | number[]; statuses: ISelectValue[] }>(() => {
        const statuses: ISelectValue[] = getEnumSelectValues(MedicalInfoStatusEnum, "MedicalInfoStatusEnum");
        if (currentUserRoleParams) {
            if (checkFlagIncludes(currentUserRoleParams?.medicalInfo || 0, RolePermissionFlag.Add)) {
                return { flag: true, statuses };
            }
            if (currentUserRoleParams?.medicalInfoAdd) {
                const flag = getValuesByFlag(currentUserRoleParams.medicalInfoAdd);
                if (flag.length > 0) {
                    return { flag, statuses: statuses.filter((s) => s.id === MedicalInfoStatusEnum.Active) };
                }
            }
        }
        return { flag: false, statuses: [] };
    }, [currentUserRoleParams]);
    const values = useRef<IMedicalInfoAddDto>({
        medicalSicknessId: 0,
        uids: [],
        status: MedicalInfoStatusEnum.Active,
        comments: "",
    });
    const hideModal = () => {
        setIsOpen(false);
    };
    const toAdd = (data: IMedicalInfoAddDto) => {
        setIsLoading(true);
        medicalInfo
            .addUsers(data)
            .then((res) => {
                const { error, result } = webApiResultData<number>(res);
                if (error) {
                    throw error;
                }
                if (result !== null) {
                    if (result > 0) {
                        showSuccess(sprintf(langPage.addUsersSuccess, result));
                        hideModal();
                        needRefresh();
                    } else {
                        showSuccess(sprintf(langPage.addUsersSuccess0));
                    }
                }
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.addUsersError);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    console.log("addProps", addProps);
    return (
        <>
            {!!addProps.statuses.length && (
                <Box textAlign="right">
                    <Button
                        onClick={() => setIsOpen(true)}
                        startIcon={<Icon name="add" />}
                        variant="contained"
                    >
                        {langPage.add}
                    </Button>
                </Box>
            )}
            {!!isOpen && (
                <Form
                    values={values.current}
                    onSubmit={toAdd}
                    modalProps={{
                        open: true,
                        onClose: hideModal,
                        withCloseButton: true,
                        responsiveWidth: true,
                        title: langPage.add,
                    }}
                    fields={[
                        {
                            name: "medicalSicknessId",
                            title: langPage.fields.medicalSickness,
                            type: "medicalSickness",
                            required: true,
                            availableIds: typeof addProps.flag === "object" ? addProps.flag : undefined,
                        },
                        {
                            name: "uids",
                            title: langPage.fields.uid,
                            type: "user",
                            required: true,
                            multiple: true,
                        },
                        {
                            name: "status",
                            title: lang.status,
                            type: "select",
                            values: addProps.statuses,
                            required: true,
                        },
                        {
                            name: "comments",
                            title: langPage.fields.comments,
                            type: "text",
                            multiline: true,
                        },
                    ]}
                />
            )}
        </>
    );
}
