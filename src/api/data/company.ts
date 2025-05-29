import type { ICompanyDto } from "api/interfaces/user/ICompanyDto";
import type { ICompanyMoneyDto } from "api/interfaces/user/ICompanyMoneyDto";
import type { IWebDataResult } from "api/interfaces/data/IWebDataResult";

import { dataProvider } from "./dataProvider";

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
    money: {
        add: (data: ICompanyMoneyDto): Promise<IWebDataResult<number>> => {
            return dataProvider(baseUrl + "addMoney", "post", data);
        },
        getList: (): Promise<IWebDataResult<ICompanyMoneyDto[]>> => {
            return dataProvider(baseUrl + "moneyList");
        },
    },
};
export default CompanyProvider;
