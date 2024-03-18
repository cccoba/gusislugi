import { IWebDataResult } from "api/interfaces/data/IWebDataResult";

import { dataProvider } from "./dataProvider";

const baseUrl = "claims&view=";

const ClaimsDataProvider = {
    removeClaim: (id: number): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "removeClaim&id=" + id, "get");
    },
};
export default ClaimsDataProvider;
