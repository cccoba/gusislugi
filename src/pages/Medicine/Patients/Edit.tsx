import { useEffect, useMemo } from "react";

import lang, { getEnumTitleValue } from "lang";
import { Accordion, Page } from "components";

import { IPage } from "api/interfaces/components/Page/IPage";
import useParamsId from "api/hooks/useParamsId";
import useLoadApiData from "api/hooks/useLoadApiData";
import { IMedicinePatientFullData } from "api/interfaces/Medicine/IMedicinePatientFullData";
import { medicine } from "api/data";

import MedicineUserInfo from "./UserInfo";
import MedicinePatientsInfo from "./PatientInfo";
import { IAccordionItem } from "components/Accordion";
import { Box, Typography } from "@mui/material";
import { MedicinePatientStatusEnum } from "api/enums/MedicinePatientStatusEnum";
import MedicinePatientInfo from "./PatientInfo";
import { useAppSelector } from "api/hooks/redux";
import { checkUserRoleAccess } from "components/RoleChecker";

export default function MedicinePatientEdit({ ...pageProps }: IPage) {
    const langPage = lang.pages.medicine.patients;
    const userId = useParamsId();
    const { data, isLoading, error, refetch } = useLoadApiData<IMedicinePatientFullData>(medicine.patients.user, [
        userId,
    ]);
    const currentUserRoleParams = useAppSelector((s) => s.user.user?.role?.params);
    const isAdmin = useMemo(() => {
        return checkUserRoleAccess([["admins"]], currentUserRoleParams);
    }, [currentUserRoleParams]);
    const patients = useMemo<IAccordionItem[]>(() => {
        if (!data?.patients) return [];
        return data?.patients.map((patient) => ({
            id: patient.id,
            title: (
                <Box
                    display="flex"
                    alignItems="center"
                >
                    <Typography variant="h5">{patient.disease?.title}</Typography>
                    {patient.isActive && (
                        <Typography
                            color="error"
                            sx={{ ml: 1 }}
                        >
                            {langPage.isActive}
                        </Typography>
                    )}
                </Box>
            ),
            titleAction: (
                <Typography variant="body2">
                    {getEnumTitleValue(MedicinePatientStatusEnum, "MedicinePatientStatusEnum", patient.status)}
                </Typography>
            ),
            child: (
                <MedicinePatientInfo
                    patient={patient}
                    isAdmin={isAdmin}
                />
            ),
        }));
    }, [data?.patients]);
    const activePatientId = useMemo(() => {
        return data?.patients.find((patient) => patient.isActive)?.id || undefined;
    }, [data?.patients]);
    const toAddDisease = () => {
        console.log("toAddDisease");
    };

    return (
        <Page
            title={langPage.patient}
            {...pageProps}
            isLoading={isLoading}
        >
            {data?.user && (
                <MedicineUserInfo
                    user={data.user}
                    onAdd={toAddDisease}
                    onUpdate={refetch}
                    isAdmin={isAdmin}
                />
            )}
            {data?.patients && (
                <Accordion
                    values={patients}
                    defaultId={activePatientId}
                />
            )}
        </Page>
    );
}
