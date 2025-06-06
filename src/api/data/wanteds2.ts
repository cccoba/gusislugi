import type { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import type { IWanteds2Dto } from "api/interfaces/user/IWanteds2Dto";

import { dataProvider } from "./dataProvider";

const baseUrl = "wanteds2&view=";

const Wanteds2Provider = {
    crudList: (): Promise<IWebDataResult<IWanteds2Dto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudUserList: (userId: number): Promise<IWebDataResult<IWanteds2Dto[]>> => {
        return dataProvider(baseUrl + "userList&id=" + userId);
    },
    crudDelete: (ids: number[]): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "remove", "delete", ids);
    },
    crudGet: (id: number): Promise<IWebDataResult<IWanteds2Dto>> => {
        return dataProvider(baseUrl + `record&id=${id}`);
    },
    crudSave: (data: IWanteds2Dto): Promise<IWebDataResult<IWanteds2Dto>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
    getMyData: (): Promise<IWebDataResult<IWanteds2Dto[]>> => {
        return dataProvider(baseUrl + "my");
    },
};
export default Wanteds2Provider;
