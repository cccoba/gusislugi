import { IWebDataResult } from "api/interfaces/data/IWebDataResult";

import { dataProvider } from "./dataProvider";
import { IFirstLoadView } from "./IFirstLoadView";

const UsersDataProvider = {
    getMainData: (): Promise<IWebDataResult<IFirstLoadView>> => {
        return dataProvider(`mainData`, "get");
    },
};
export default UsersDataProvider;
