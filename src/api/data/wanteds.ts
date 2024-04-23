import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { IWantedDto } from "api/interfaces/user/IWantedDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "wanteds&view=";

const WantedsProvider = {
    crudList: (): Promise<IWebDataResult<IWantedDto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudDelete: (ids: number[]): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "remove", "delete", ids);
    },
    crudGet: (id: number): Promise<IWebDataResult<IWantedDto>> => {
        return dataProvider(baseUrl + `record&id=${id}`);
    },
    crudSave: (data: IWantedDto): Promise<IWebDataResult<IWantedDto>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
};
export default WantedsProvider;
