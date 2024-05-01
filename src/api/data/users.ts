import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { IUserRegistrationDto } from "api/interfaces/user/IUserRegistrationDto";
import { IUserDto } from "api/interfaces/user/IUserDto";
import { IClaimDto } from "api/interfaces/user/IClaimDto";
import { IMessageDto } from "api/interfaces/Messages/IMessageDto";
import { IUserShortDto } from "api/interfaces/user/IUserShortDto";

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
    addUser: (user: IUserDto): Promise<IWebDataResult<IUserDto>> => {
        return dataProvider(baseUrl + "addUser", "post", user);
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
    getUserByName: (search: string): Promise<IWebDataResult<IUserShortDto>> => {
        return dataProvider(baseUrl + "getUserByName&search=" + search);
    },
    getUserByGuid: (search: string): Promise<IWebDataResult<IUserShortDto>> => {
        return dataProvider(baseUrl + "getUserByGuid&search=" + search);
    },
    getPersons: (): Promise<IWebDataResult<IUserDto[]>> => {
        return dataProvider(baseUrl + "getPersons", "get");
    },
};
export default UsersDataProvider;
