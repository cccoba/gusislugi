import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { IFineDto } from "api/interfaces/user/IFineDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "fines&view=";

const FinesProvider = {
    crudList: (): Promise<IWebDataResult<IFineDto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudUserList: (userId: number): Promise<IWebDataResult<IFineDto[]>> => {
        return dataProvider(baseUrl + "userList&id=" + userId);
    },
    crudDelete: (ids: number[]): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "remove", "delete", ids);
    },
    crudGet: (id: number): Promise<IWebDataResult<IFineDto>> => {
        return dataProvider(baseUrl + `record&id=${id}`);
    },
    crudSave: (data: IFineDto): Promise<IWebDataResult<IFineDto>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
    getMyData: (): Promise<IWebDataResult<IFineDto[]>> => {
        return dataProvider(baseUrl + "getMyData");
    },
};
export default FinesProvider;
