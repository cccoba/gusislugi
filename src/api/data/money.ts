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
    crudSave: (data: IMoneyDto): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
    getUserData: (userId: number): Promise<IWebDataResult<IUserMoneyDto>> => {
        return dataProvider(baseUrl + `getUserData&id=${userId}`);
    },
    userHistory: (userId?: number): Promise<IWebDataResult<IMoneyDto[]>> => {
        let url = baseUrl + "userHistory";
        if (userId) {
            url += "&id=" + userId;
        }
        return dataProvider(url);
    },
    userSendMoney: (toUid: number, value: number, hidden: boolean): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "userSendMoney", "post", { toUid, value, hidden });
    },
    getValue: (): Promise<IWebDataResult<number>> => {
        return dataProvider(baseUrl + "getValue");
    },
};
export default MoneyDataProvider;
