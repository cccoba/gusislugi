import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { IMedicalPoliciesDto } from "api/interfaces/user/IMedicalPoliciesDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "medicalPolicies&view=";

const MedicalPoliciesProvider = {
    crudList: (): Promise<IWebDataResult<IMedicalPoliciesDto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudUserList: (userId: number): Promise<IWebDataResult<IMedicalPoliciesDto[]>> => {
        return dataProvider(baseUrl + "userList&id=" + userId);
    },
    crudDelete: (ids: number[]): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "remove", "delete", ids);
    },
    crudGet: (id: number): Promise<IWebDataResult<IMedicalPoliciesDto>> => {
        return dataProvider(baseUrl + `record&id=${id}`);
    },
    crudSave: (data: IMedicalPoliciesDto): Promise<IWebDataResult<IMedicalPoliciesDto>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
    getMyData: (): Promise<IWebDataResult<IMedicalPoliciesDto[]>> => {
        return dataProvider(baseUrl + "getMyData");
    },
};
export default MedicalPoliciesProvider;
