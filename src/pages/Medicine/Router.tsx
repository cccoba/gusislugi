import { Route, Routes } from "react-router-dom";

import { IPage } from "api/interfaces/components/Page/IPage";

import MedicineMain from "./Main";
import MedicineDiseases from "./Diseases";
import MedicineParams from "./Params";
import MedicineTests from "./Tests";
import MedicineProcedures from "./Procedures";
import MedicinePatientList from "./Patients/List";
import MedicinePatientRouter from "./Patients/Router";
export default function MedicineRouter({ ...pageProps }: IPage) {
    return (
        <Routes>
            <Route
                path="/"
                element={<MedicineMain {...pageProps} />}
            />
            <Route
                path="/diseases/*"
                element={<MedicineDiseases {...pageProps} />}
            />
            <Route
                path="/params/*"
                element={
                    <MedicineParams
                        {...pageProps}
                        icon="settings"
                    />
                }
            />
            <Route
                path="/tests/*"
                element={
                    <MedicineTests
                        {...pageProps}
                        icon="labs"
                    />
                }
            />
            <Route
                path="/procedures/*"
                element={
                    <MedicineProcedures
                        {...pageProps}
                        icon="local_pharmacy"
                    />
                }
            />
            <Route
                path="/patients/*"
                element={
                    <MedicinePatientRouter
                        {...pageProps}
                        icon="users"
                    />
                }
            />
        </Routes>
    );
}
