import type { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import type { ILicenseDto } from "api/interfaces/user/ILicenseDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "licenses&view=";

const LicensesProvider = {
    crudList: (): Promise<IWebDataResult<ILicenseDto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudUserList: (userId: number): Promise<IWebDataResult<ILicenseDto[]>> => {
        return dataProvider(baseUrl + "userList&id=" + userId);
    },
    crudDelete: (ids: number[]): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "remove", "delete", ids);
    },
    crudGet: (id: number): Promise<IWebDataResult<ILicenseDto>> => {
        return dataProvider(baseUrl + `record&id=${id}`);
    },
    crudSave: (data: ILicenseDto): Promise<IWebDataResult<ILicenseDto>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
    getMyData: (): Promise<IWebDataResult<ILicenseDto[]>> => {
        return dataProvider(baseUrl + "getMyData");
    },
};
export default LicensesProvider;
