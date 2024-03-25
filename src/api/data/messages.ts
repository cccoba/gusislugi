import { IWebDataResult } from "api/interfaces/data/IWebDataResult";

import { dataProvider } from "./dataProvider";

const baseUrl = "messages&view=";

const MessagesDataProvider = {
    send: (uid: number, message: string): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "send", "post", { uid, message });
    },
    setReaded: (id: number): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "setReaded", "post", { id });
    },
};
export default MessagesDataProvider;
