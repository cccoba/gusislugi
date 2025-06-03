import type { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import type { IUserRegistrationDto } from "api/interfaces/user/IUserRegistrationDto";
import type { IUserDto } from "api/interfaces/user/IUserDto";
import type { IClaimDto } from "api/interfaces/user/IClaimDto";
import type { IUserShortDto } from "api/interfaces/user/IUserShortDto";

import type { IWeaponUpdaterDto } from "api/interfaces/user/IWeaponUpdaterDto";

import type { IFirstLoadView } from "./IFirstLoadView";

import { dataProvider } from "./dataProvider";

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
    weapons: {
        add: (data: IWeaponUpdaterDto): Promise<IWebDataResult<boolean>> => {
            return dataProvider(baseUrl + "addWeapon", "post", data);
        },
        save: (data: IWeaponUpdaterDto): Promise<IWebDataResult<boolean>> => {
            return dataProvider(baseUrl + "updateWeapon", "put", data);
        },
    },
};
export default UsersDataProvider;
