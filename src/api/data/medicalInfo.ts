import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { IMedicalInfoDto } from "api/interfaces/user/IMedicalInfoDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "medicalInfo&view=";

const MedicalPoliciesProvider = {
    crudList: (): Promise<IWebDataResult<IMedicalInfoDto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudDelete: (ids: number[]): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "remove", "delete", ids);
    },
    crudGet: (id: number): Promise<IWebDataResult<IMedicalInfoDto>> => {
        return dataProvider(baseUrl + `record&id=${id}`);
    },
    crudSave: (data: IMedicalInfoDto): Promise<IWebDataResult<IMedicalInfoDto>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
    crudUserList: (userId: number): Promise<IWebDataResult<IMedicalInfoDto[]>> => {
        return dataProvider(baseUrl + "userList&id=" + userId);
    },
};
export default MedicalPoliciesProvider;
