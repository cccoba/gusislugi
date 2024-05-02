import { MessageStatusEnum } from "api/enums/MessageStatusEnum";

import { IUserShortDto } from "../user/IUserShortDto";

export interface IMessageDto {
    id: number;
    fromUid: number;
    toUid: number;
    created_at: Date;
    message: string;
    status: MessageStatusEnum;
    from_user?: IUserShortDto;
    to_user?: IUserShortDto;
}
