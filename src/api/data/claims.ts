import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { IClaimDto } from "api/interfaces/user/IClaimDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "claims&view=";

const ClaimsDataProvider = {
    remove: (id: number): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "remove&id=" + id, "get");
    },
    add: (data: IClaimDto): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "add", "post", data);
    },
};
export default ClaimsDataProvider;
