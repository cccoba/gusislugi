import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { ITaxesDto } from "api/interfaces/user/ITaxesDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "taxes&view=";

const TaxesProvider = {
    crudList: (): Promise<IWebDataResult<ITaxesDto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudDelete: (ids: number[]): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "remove", "delete", ids);
    },
    crudGet: (id: number): Promise<IWebDataResult<ITaxesDto>> => {
        return dataProvider(baseUrl + `record&id=${id}`);
    },
    crudSave: (data: ITaxesDto): Promise<IWebDataResult<ITaxesDto>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
};
export default TaxesProvider;
