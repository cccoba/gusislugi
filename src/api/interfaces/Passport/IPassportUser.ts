import { IClaimDto } from "../user/IClaimDto";
import { IUserDto } from "../user/IUserDto";

export interface IPassportUser {
    user: IUserDto;
    claims: IClaimDto[];
}
