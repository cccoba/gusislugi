import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { IUserRegistrationDto } from "api/interfaces/user/IUserRegistrationDto";
import { IUserDto } from "api/interfaces/user/IUserDto";
import { IClaimDto } from "api/interfaces/user/IClaimDto";
import { IMessageDto } from "api/interfaces/Messages/IMessageDto";

import { dataProvider } from "./dataProvider";
import { IFirstLoadView } from "./IFirstLoadView";

const baseUrl = "users&view=";

const UsersDataProvider = {
    getAll: (): Promise<IWebDataResult<IUserDto[]>> => {
        return dataProvider(baseUrl + "getAll", "get");
    },
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
    getMessages: (): Promise<IWebDataResult<IMessageDto[]>> => {
        return dataProvider(baseUrl + "getMessages");
    },
    getUser: (userId: number): Promise<IWebDataResult<IUserDto>> => {
        return dataProvider(baseUrl + "getUser&id=" + userId);
    },
};
export default UsersDataProvider;
