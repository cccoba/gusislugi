import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { IClaimDto } from "api/interfaces/user/IClaimDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "claims&view=";

const ClaimsDataProvider = {
    userRemove: (id: number): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "userRemove&id=" + id, "get");
    },
    userAdd: (data: IClaimDto): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "userAdd", "post", data);
    },
    crudList: (): Promise<IWebDataResult<IClaimDto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudDelete: (ids: number[]): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "remove", "delete", ids);
    },
    crudGet: (id: number): Promise<IWebDataResult<IClaimDto>> => {
        return dataProvider(baseUrl + `record&id=${id}`);
    },
    crudSave: (data: IClaimDto): Promise<IWebDataResult<IClaimDto>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
};
export default ClaimsDataProvider;
