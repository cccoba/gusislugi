import type { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import type { ITaxesTypesDto } from "api/interfaces/user/ITaxesTypesDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "taxesTypes&view=";

const TaxesTypesProvider = {
    crudList: (): Promise<IWebDataResult<ITaxesTypesDto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudDelete: (ids: number[]): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "remove", "delete", ids);
    },
    crudGet: (id: number): Promise<IWebDataResult<ITaxesTypesDto>> => {
        return dataProvider(baseUrl + `record&id=${id}`);
    },
    crudSave: (data: ITaxesTypesDto): Promise<IWebDataResult<ITaxesTypesDto>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
};

export default TaxesTypesProvider;
