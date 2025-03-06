import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { ITransactionDto } from "api/interfaces/Shop/ITransactionDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "shop&view=";

const ShopProvider = {
    crudList: (): Promise<IWebDataResult<ITransactionDto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudDelete: (ids: number[]): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "remove", "delete", ids);
    },
    crudGet: (id: number): Promise<IWebDataResult<ITransactionDto>> => {
        return dataProvider(baseUrl + `record&id=${id}`);
    },
    crudSave: (data: ITransactionDto): Promise<IWebDataResult<ITransactionDto>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
};
export default ShopProvider;
