import { IUserDto } from "../interfaces/user/IUserDto";

export interface IFirstLoadView {
    user: IUserDto;
    token: string;
}
