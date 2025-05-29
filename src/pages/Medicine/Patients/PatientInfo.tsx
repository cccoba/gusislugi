import { useMemo } from "react";
import { Box, Grid } from "@mui/material";

import { Fieldset, IconButton, KeyValueList } from "components";
import MedicineParamViewer, { TMedicineParamAction } from "components/MedicineParamViewer";
import lang, { sprintf } from "lang";

import { IMedicinePatient } from "api/interfaces/Medicine/IMedicinePatient";
import dateTime from "api/common/dateTime";
import { medicine, webApiResultData } from "api/data";
import { useLoader } from "api/hooks/redux";
import { useNotifier } from "api/hooks/useNotifier";
import { IMedicinePatientTestDto } from "api/interfaces/Medicine/IMedicinePatientTestDto";

import { IMedicinePatientHistoryDto } from "api/interfaces/Medicine/IMedicinePatientHistoryDto";
import { IMedicinePatientProcedureDto } from "api/interfaces/Medicine/IMedicinePatientProcedureDto";

import MedicinePatientHistory from "./History";

interface IProps {
    patient: IMedicinePatient;
    isAdmin?: boolean;
    needUpdate: () => void;
}

export default function MedicinePatientInfo({ patient, isAdmin, needUpdate }: IProps) {
    const langPage = lang.pages.medicine.patients;

    const { setIsLoading } = useLoader();
    const { showError, showSuccess } = useNotifier();
    const baseData = useMemo(() => {
        return [
            {
                title: langPage.createdAt,
                value: dateTime(patient.created_at),
            },
            {
                title: langPage.updatedAt,
                value: dateTime(patient.updated_at),
            },
        ];
    }, [patient]);
    const histories = useMemo<
        IMedicinePatientHistoryDto<IMedicinePatientTestDto | IMedicinePatientProcedureDto>[]
    >(() => {
        const result: IMedicinePatientHistoryDto<IMedicinePatientTestDto | IMedicinePatientProcedureDto>[] = [];
        if (patient?.tests?.length) {
            for (const test of patient.tests) {
                result.push({
                    id: "test-" + test.id,
                    type: "test",
                    updated_at: test.updated_at,
                    created_at: test.created_at,
                    status: test.status,
                    value: test,
                });
            }
        }
        if (patient?.procedures?.length) {
            for (const procedure of patient.procedures) {
                result.push({
                    id: "procedure-" + procedure.id,
                    type: "procedure",
                    updated_at: procedure.updated_at,
                    created_at: procedure.created_at,
                    status: procedure.status,
                    value: procedure,
                });
            }
        }
        return result;
    }, [patient?.tests, patient?.procedures]);

    const toAction: TMedicineParamAction = (action, param) => {
        switch (action) {
            case "add":
                if ("testId" in param) {
                    setIsLoading(true);
                    medicine.patients
                        .addTest(patient.id, param.testId)
                        .then((res) => {
                            const { error, result } = webApiResultData<IMedicinePatientTestDto>(res);
                            if (error) {
                                throw error;
                            }
                            if (result) {
                                showSuccess(sprintf(langPage.success.addTest, result.test?.title || ""));
                                needUpdate();
                            }
                        })
                        .catch((err) => {
                            showError(err?.name === "webApiResultError" ? err.message : langPage.errors.addTest);
                        })
                        .finally(() => {
                            setIsLoading(false);
                        });
                }
                break;
            case "edit":
                if (isAdmin && "value" in param) {
                    medicine.patients.updateParam(patient.id, param.id, param.value);
                }
                break;
        }
    };
    const toAddHistory = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log("toAddHistory");
    };

    return (
        <Box>
            <KeyValueList
                values={baseData}
                withDivider
            />
            {patient.params && (
                <Fieldset
                    label={lang.pages.medicine.params.title}
                    icon="settings"
                    variant="accordion"
                    accordionProps={{ defaultHide: true, withDivider: true }}
                >
                    {!patient.params || patient.params.length === 0 ? null : (
                        <Grid
                            container
                            spacing={1}
                            sx={{ mt: 0.5 }}
                        >
                            {patient.params.map((param, index) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    xl={3}
                                    key={index}
                                >
                                    <MedicineParamViewer
                                        param={param}
                                        isAdmin={!!isAdmin}
                                        onAction={toAction}
                                        readOnly={!patient.isActive}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Fieldset>
            )}
            <Fieldset
                label={`${lang.pages.medicine.history.title} (${
                    histories?.length || lang.pages.medicine.history.noHistory
                })`}
                icon="history"
                variant="accordion"
                accordionProps={{
                    withDivider: true,
                    action: patient.isActive ? (
                        <IconButton
                            name="add"
                            onClick={toAddHistory}
                            color="primary"
                            tooltip={lang.pages.medicine.history.add}
                        />
                    ) : null,
                }}
            >
                <MedicinePatientHistory histories={histories} />
            </Fieldset>
        </Box>
    );
}
