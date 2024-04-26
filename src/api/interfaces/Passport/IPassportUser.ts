import { IUserDto } from "../user/IUserDto";

export interface IPassportUser {
    user: IUserDto;
    claims?: boolean;
    taxes?: boolean;
    wanteds?: boolean;
    medicalPolicies?: boolean;
}
