import { IUserDto } from "../user/IUserDto";

export interface IPassportUser {
    user: IUserDto;
    claims?: boolean;
    taxes?: boolean;
    fines?: boolean;
    wanteds?: boolean;
    companies?: boolean;
    medicalPolicies?: boolean;
    medicalInfo?: boolean;
}
