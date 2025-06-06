import type { IMedicalSicknessDto } from "./IMedicalSicknessDto";
import type { IUserDto } from "./IUserDto";

export interface IUserSecretsDto {
    user: IUserDto;
    medicalSickness: IMedicalSicknessDto[];
}
