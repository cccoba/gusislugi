import { IPage } from "api/interfaces/components/Page/IPage";
import lang from "lang";
import { Route, Routes } from "react-router-dom";
import MedicinePatientList from "./List";
import MedicinePatientEdit from "./Edit";

interface IProps {}

export default function MedicinePatientRouter({ ...pageProps }: IPage) {
    return (
        <Routes>
            <Route
                path="/"
                element={<MedicinePatientList {...pageProps} />}
            />
            <Route
                path="/:id"
                element={
                    <MedicinePatientEdit
                        {...pageProps}
                        backUrl={`${pageProps.backUrl}/patients`}
                        icon="edit"
                    />
                }
            />
        </Routes>
    );
}
