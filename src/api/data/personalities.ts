import type { IWebDataResult } from "api/interfaces/data/IWebDataResult";

import type { IPersonalityDto } from "api/interfaces/user/IPersonalityDto";

import { dataProvider } from "./dataProvider";

const baseUrl = "personalities&view=";

const PersonalitiesProvider = {
    crudList: (): Promise<IWebDataResult<IPersonalityDto[]>> => {
        return dataProvider(baseUrl + "list");
    },
    crudUserList: (userId: number): Promise<IWebDataResult<IPersonalityDto[]>> => {
        return dataProvider(baseUrl + "userList&id=" + userId);
    },
    crudDelete: (ids: number[]): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "remove", "delete", ids);
    },
    crudGet: (id: number): Promise<IWebDataResult<IPersonalityDto>> => {
        return dataProvider(baseUrl + `record&id=${id}`);
    },
    crudSave: (data: IPersonalityDto): Promise<IWebDataResult<IPersonalityDto>> => {
        return dataProvider(baseUrl + "save", "post", data);
    },
};
export default PersonalitiesProvider;
