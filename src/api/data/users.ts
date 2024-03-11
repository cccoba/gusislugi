import { IWebDataResult } from "api/interfaces/data/IWebDataResult";

import { dataProvider } from "./dataProvider";
import { IFirstLoadView } from "./IFirstLoadView";

const baseUrl = "users&view=";

const UsersDataProvider = {
    getMainData: (): Promise<IWebDataResult<IFirstLoadView>> => {
        return dataProvider(baseUrl + "getMainData", "get");
    },
};
export default UsersDataProvider;
