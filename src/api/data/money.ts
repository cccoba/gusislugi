import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { IMoneyDto } from "api/interfaces/user/IMoneyDto";
import { IUserMoneyDto } from "api/interfaces/Money/IUserMoneyDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "money&view=";

const MoneyDataProvider = {
    crudList: (): Promise<IWebDataResult<IMoneyDto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudGet: (id: number): Promise<IWebDataResult<IMoneyDto>> => {
        return dataProvider(baseUrl + `record&id=${id}`);
    },
    crudSave: (data: IMoneyDto): Promise<IWebDataResult<IMoneyDto>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
    userData: (userId: number): Promise<IWebDataResult<IUserMoneyDto>> => {
        return dataProvider(baseUrl + `userData&id=${userId}`);
    },
};
export default MoneyDataProvider;
