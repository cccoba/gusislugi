import { CRUDDataProvider } from "./dataProvider";

const MedicinePoliciesProvider = {
    diseases: new CRUDDataProvider(`medicineDiseases&view=`).getData(),
    params: new CRUDDataProvider(`medicineParams&view=`).getData(),
};
export default MedicinePoliciesProvider;
