import type { MessageStatusEnum } from "api/enums/MessageStatusEnum";

import type { IUserShortDto } from "../user/IUserShortDto";

export interface IMessageDto {
    id: number;
    fromUid: number;
    toUid: number;
    creatorId?: number;
    created_at: Date;
    message: string;
    status: MessageStatusEnum;
    from_user?: IUserShortDto;
    to_user?: IUserShortDto;
    creator?: IUserShortDto;
}
