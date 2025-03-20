import { Route, Routes } from "react-router-dom";

import { IPage } from "api/interfaces/components/Page/IPage";

import MedicineMain from "./Main";
import MedicineDiseases from "./Diseases";
import MedicineParams from "./Params";
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
        </Routes>
    );
}
