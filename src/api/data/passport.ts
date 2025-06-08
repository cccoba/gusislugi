import type { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import type { IPassportUser } from "api/interfaces/Passport/IPassportUser";

import { dataProvider } from "./dataProvider";

const baseUrl = "passport&view=";

const PassportDataProvider = {
    getUserByTelegramLogin: (login: string): Promise<IWebDataResult<IPassportUser>> => {
        return dataProvider(baseUrl + "getUserByTelegramLogin&id=" + login);
    },
    getUserByGuid: (guid: string): Promise<IWebDataResult<IPassportUser>> => {
        return dataProvider(baseUrl + "getUserByGuid&id=" + guid);
    },
};
export default PassportDataProvider;
