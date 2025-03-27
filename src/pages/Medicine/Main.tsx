import { useState } from "react";

import lang from "lang";
import { Fieldset, Page } from "components";
import { IPage } from "api/interfaces/components/Page/IPage";
import { Grid } from "@mui/material";
import { HomeItem } from "pages/Home";

export default function MedicineMain({ backUrl, ...pageProps }: IPage) {
    const langPage = lang.pages.medicine;
    return (
        <Page
            title={langPage.title}
            {...pageProps}
        >
            <Fieldset label={langPage.main}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3, lg: 4, xl: 5 }}
                >
                    <HomeItem
                        url={`${backUrl}/diseases`}
                        title={langPage.diseases.title}
                        icon="medicine"
                    />
                    <HomeItem
                        url={`${backUrl}/params`}
                        title={langPage.params.title}
                        icon="settings"
                    />
                    <HomeItem
                        url={`${backUrl}/tests`}
                        title={langPage.params.tests}
                        icon="labs"
                    />
                    <HomeItem
                        url={`${backUrl}/procedures`}
                        title={langPage.params.procedures}
                        icon="local_pharmacy"
                    />
                    <HomeItem
                        url={`${backUrl}/patients`}
                        title={langPage.params.patients}
                        icon="users"
                    />
                </Grid>
            </Fieldset>
        </Page>
    );
}
