import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { IMessageDto } from "api/interfaces/Messages/IMessageDto";
import { MessageStatusEnum } from "api/enums/MessageStatusEnum";

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
};
export default MessagesDataProvider;
