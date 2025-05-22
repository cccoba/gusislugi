import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { ICompanyDto } from "api/interfaces/user/ICompanyDto";

import { dataProvider } from "./dataProvider";
import { ICompanyMoneyDto } from "api/interfaces/user/ICompanyMoneyDto";

const baseUrl = "companies&view=";

const CompanyProvider = {
    crudList: (): Promise<IWebDataResult<ICompanyDto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudUserList: (userId: number): Promise<IWebDataResult<ICompanyDto[]>> => {
        return dataProvider(baseUrl + "userList&id=" + userId);
    },
    crudDelete: (ids: number[]): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "remove", "delete", ids);
    },
    crudGet: (id: number): Promise<IWebDataResult<ICompanyDto>> => {
        return dataProvider(baseUrl + `record&id=${id}`);
    },
    crudSave: (data: ICompanyDto): Promise<IWebDataResult<ICompanyDto>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
    getMyData: (): Promise<IWebDataResult<ICompanyDto[]>> => {
        return dataProvider(baseUrl + "getMyData");
    },
    addMoney: (data: ICompanyMoneyDto): Promise<IWebDataResult<number>> => {
        return dataProvider(baseUrl + "addMoney", "post", data);
    },
};
export default CompanyProvider;
