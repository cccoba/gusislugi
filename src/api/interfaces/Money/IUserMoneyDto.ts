import { IMoneyDto } from "../user/IMoneyDto";
import { IUserDto } from "../user/IUserDto";

export interface IUserMoneyDto {
    user: IUserDto;
    history: IMoneyDto[];
}
