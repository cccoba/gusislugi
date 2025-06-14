import type { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import type { IMessageDto } from "api/interfaces/Messages/IMessageDto";
import type { MessageStatusEnum } from "api/enums/MessageStatusEnum";

import { dataProvider } from "./dataProvider";

const baseUrl = "messages&view=";

const MessagesDataProvider = {
    send: (uid: number, message: string, status: MessageStatusEnum): Promise<IWebDataResult<boolean>> => {
        return dataProvider(baseUrl + "send", "post", { uid, message, status });
    },
    getAll: (): Promise<IWebDataResult<IMessageDto[]>> => {
        return dataProvider(baseUrl + "getAll");
    },
    getByUser: (uid: number): Promise<IWebDataResult<IMessageDto[]>> => {
        return dataProvider(baseUrl + "getByUser&id=" + uid);
    },
    getMyMessages: (): Promise<IWebDataResult<IMessageDto[]>> => {
        return dataProvider(baseUrl + "getMyMessages");
    },
    add: (data: any): Promise<IWebDataResult<number>> => {
        return dataProvider(baseUrl + "add", "post", data);
    },
};
export default MessagesDataProvider;
