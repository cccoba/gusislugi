import type { IMedicalSicknessDto } from "./IMedicalSicknessDto";
import type { IPersonalityDto } from "./IPersonalityDto";
import type { IUserDto } from "./IUserDto";

export interface IUserSecretsDto {
    user: IUserDto;
    medicalSickness: IMedicalSicknessDto[];
    personalities: IPersonalityDto[];
}
