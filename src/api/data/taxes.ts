import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { ITaxeDto } from "api/interfaces/user/ITaxeDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "taxes&view=";

const TaxesProvider = {
    crudList: (): Promise<IWebDataResult<ITaxeDto[]>> => {
        return dataProvider(baseUrl + "list");
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
};
export default TaxesProvider;
