import type { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import type { IMedicalSicknessDto } from "api/interfaces/user/IMedicalSicknessDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "medicalSicknesses&view=";

const MedicalSicknessProvider = {
    crudList: (): Promise<IWebDataResult<IMedicalSicknessDto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudUserList: (userId: number): Promise<IWebDataResult<IMedicalSicknessDto[]>> => {
        return dataProvider(baseUrl + "userList&id=" + userId);
    },
    crudDelete: (ids: number[]): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "remove", "delete", ids);
    },
    crudGet: (id: number): Promise<IWebDataResult<IMedicalSicknessDto>> => {
        return dataProvider(baseUrl + `record&id=${id}`);
    },
    crudSave: (data: IMedicalSicknessDto): Promise<IWebDataResult<IMedicalSicknessDto>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
    getMyData: (): Promise<IWebDataResult<IMedicalSicknessDto[]>> => {
        return dataProvider(baseUrl + "getMyData");
    },
};
export default MedicalSicknessProvider;
