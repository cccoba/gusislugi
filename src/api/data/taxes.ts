import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { ITaxeDto } from "api/interfaces/user/ITaxeDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "taxes&view=";

const TaxesProvider = {
    crudList: (): Promise<IWebDataResult<ITaxeDto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudUserList: (userId: number): Promise<IWebDataResult<ITaxeDto[]>> => {
        return dataProvider(baseUrl + "userList&id=" + userId);
    },
    crudDelete: (ids: number[]): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "remove", "delete", ids);
    },
    crudGet: (id: number): Promise<IWebDataResult<ITaxeDto>> => {
        return dataProvider(baseUrl + `record&id=${id}`);
    },
    crudSave: (data: ITaxeDto): Promise<IWebDataResult<ITaxeDto>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
    getMyData: (): Promise<IWebDataResult<ITaxeDto[]>> => {
        return dataProvider(baseUrl + "getMyData");
    },
};
export default TaxesProvider;
