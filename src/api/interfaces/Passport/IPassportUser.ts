import { IUserDto } from "../user/IUserDto";

export interface IPassportUser {
    user: IUserDto;
    claims?: boolean;
    taxes?: boolean;
    fines?: boolean;
    wanteds?: boolean;
    wanteds2?: boolean;
    medicalPolicies?: boolean;
    medicalInfo?: boolean;
}
