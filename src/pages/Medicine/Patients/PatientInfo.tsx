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
import MedicinePatientHistory from "./History";

interface IProps {
    patient: IMedicinePatient;
    isAdmin?: boolean;
}

export default function MedicinePatientInfo({ patient, isAdmin }: IProps) {
    const { setIsLoading } = useLoader();
    const { showError, showSuccess } = useNotifier();
    const langPage = lang.pages.medicine.patients;
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
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Fieldset>
            )}
            <Fieldset
                label={
                    lang.pages.medicine.history.title +
                    (!patient?.history?.length ? "" : " (" + lang.pages.medicine.history.noHistory + ")")
                }
                icon="medicineHistory"
                variant="accordion"
                accordionProps={{
                    withDivider: true,
                    action: (
                        <IconButton
                            name="add"
                            onClick={toAddHistory}
                            color="primary"
                            tooltip={lang.pages.medicine.history.add}
                        />
                    ),
                }}
            >
                <MedicinePatientHistory histories={patient.history || []} />
            </Fieldset>
        </Box>
    );
}
