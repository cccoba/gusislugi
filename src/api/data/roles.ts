import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { IRoleDto } from "api/interfaces/user/IRoleDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "roles&view=";

const RolesDataProvider = {
    crudList: (): Promise<IWebDataResult<IRoleDto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudSave: (data: IRoleDto): Promise<IWebDataResult<IRoleDto>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
};
export default RolesDataProvider;
