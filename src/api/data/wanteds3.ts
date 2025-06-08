import type { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import type { IWanteds3Dto } from "api/interfaces/user/IWanteds3Dto";

import { dataProvider } from "./dataProvider";

const baseUrl = "wanteds3&view=";

const Wanteds3Provider = {
    crudList: (): Promise<IWebDataResult<IWanteds3Dto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudUserList: (userId: number): Promise<IWebDataResult<IWanteds3Dto[]>> => {
        return dataProvider(baseUrl + "userList&id=" + userId);
    },
    crudDelete: (ids: number[]): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "remove", "delete", ids);
    },
    crudGet: (id: number): Promise<IWebDataResult<IWanteds3Dto>> => {
        return dataProvider(baseUrl + `record&id=${id}`);
    },
    crudSave: (data: IWanteds3Dto): Promise<IWebDataResult<IWanteds3Dto>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
};
export default Wanteds3Provider;
