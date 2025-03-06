import { INationalityDto } from "./INationalityDto";

export interface IUserShopDto {
    id: number;
    guid: string;
    tgId?: number;
    tgLogin?: string;
    money: number;
    nickname: string;
    firstName: string;
    passport: string;
    image: string;
    nationality: INationalityDto;
}
