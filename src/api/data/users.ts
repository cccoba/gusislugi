import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { IUserRegistrationDto } from "api/interfaces/user/IUserRegistrationDto";
import { IUserDto } from "api/interfaces/user/IUserDto";

import { dataProvider } from "./dataProvider";
import { IFirstLoadView } from "./IFirstLoadView";
import { IClaimDto } from "api/interfaces/user/IClaimDto";

const baseUrl = "users&view=";

const UsersDataProvider = {
    getMainData: (): Promise<IWebDataResult<IFirstLoadView>> => {
        return dataProvider(baseUrl + "getMainData", "get");
    },
    registration: (data: IUserRegistrationDto): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "registration", "post", data);
    },
    updateUser: (user: IUserDto): Promise<IWebDataResult<IUserDto>> => {
        return dataProvider(baseUrl + "updateUser", "post", user);
    },
    getClaims: (): Promise<IWebDataResult<IClaimDto[]>> => {
        return dataProvider(baseUrl + "getClaims");
    },
};
export default UsersDataProvider;
