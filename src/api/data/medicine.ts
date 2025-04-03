import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { IMedicineDiseases } from "api/interfaces/Medicine/IMedicineDiseases";
import { IMedicineParam } from "api/interfaces/Medicine/IMedicineParam";
import { IMedicineTest } from "api/interfaces/Medicine/IMedicineTest";
import { IMedicineProcedure } from "api/interfaces/Medicine/IMedicineProcedure";
import { IMedicinePatient } from "api/interfaces/Medicine/IMedicinePatient";
import { IMedicinePatientFullData } from "api/interfaces/Medicine/IMedicinePatientFullData";
import { IMedicinePatientTestDto } from "api/interfaces/Medicine/IMedicinePatientTestDto";

import { CRUDDataProvider, dataProvider } from "./dataProvider";

const MedicinePoliciesProvider = {
    diseases: new CRUDDataProvider<IMedicineDiseases>(`medicineDiseases&view=`).getData(),
    params: new CRUDDataProvider<IMedicineParam>(`medicineParams&view=`).getData(),
    tests: new CRUDDataProvider<IMedicineTest>(`medicineTests&view=`).getData(),
    procedures: {
        ...new CRUDDataProvider<IMedicineProcedure>(`medicineProcedures&view=`).getData(),
    },
    patients: {
        ...new CRUDDataProvider<IMedicinePatient>(`medicinePatients&view=`).getData(),
        users: (): Promise<IWebDataResult<IMedicinePatient[]>> => {
            return dataProvider("medicinePatients&view=getUsers");
        },
        user: (userId: number): Promise<IWebDataResult<IMedicinePatientFullData>> => {
            return dataProvider(`medicinePatients&view=getUser&id=${userId}`);
        },
        addTest: (patientId: number, testId: number): Promise<IWebDataResult<IMedicinePatientTestDto>> => {
            return dataProvider(`medicinePatients&view=addTest`, "post", { patientId, testId });
        },
        updateParam: (patientId: number, paramId: number, value: string): Promise<IWebDataResult<boolean>> => {
            return dataProvider(`medicinePatients&view=updateParam`, "put", { patientId, paramId, value });
        },
    },
};
export default MedicinePoliciesProvider;
