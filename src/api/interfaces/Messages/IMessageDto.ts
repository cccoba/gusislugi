export interface IMessageDto {
    id: number;
    fromUid: number;
    toUid: number;
    created_at: Date;
    message: string;
}
