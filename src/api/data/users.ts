import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { IUserRegistrationDto } from "api/interfaces/user/IUserRegistrationDto";
import { IUserDto } from "api/interfaces/user/IUserDto";

import { dataProvider } from "./dataProvider";
import { IFirstLoadView } from "./IFirstLoadView";

const baseUrl = "users&view=";

const UsersDataProvider = {
    getMainData: (): Promise<IWebDataResult<IFirstLoadView>> => {
        return dataProvider(baseUrl + "getMainData", "get");
    },
    registration: (data: IUserRegistrationDto): Promise<IWebDataResult<IUserDto>> => {
        return dataProvider(baseUrl + "registration", "post", data);
    },
    updateUser: (user: IUserDto): Promise<IWebDataResult<IUserDto>> => {
        return dataProvider(baseUrl + "updateUser", "post", user);
    },
};
export default UsersDataProvider;
