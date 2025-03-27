import { useEffect, useState } from "react";

import lang from "lang";
import { Page } from "components";

import { IPage } from "api/interfaces/components/Page/IPage";
import useParamsId from "api/hooks/useParamsId";
import useLoadApiData from "api/hooks/useLoadApiData";
import { IMedicinePatientFullData } from "api/interfaces/Medicine/IMedicinePatientFullData";
import { medicine } from "api/data";

export default function MedicinePatientEdit({ ...pageProps }: IPage) {
    const langPage = lang.pages.medicine.patients;
    const userId = useParamsId();
    const { data, isLoading, error, refetch } = useLoadApiData<IMedicinePatientFullData>(medicine.patients.user, [
        userId,
    ]);
    useEffect(() => {
        console.log("data", data);
    }, [data]);
    return (
        <Page
            title={langPage.patient}
            {...pageProps}
        ></Page>
    );
}
