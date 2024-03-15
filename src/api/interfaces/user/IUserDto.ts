export interface IUserDto {
    id: number;
    tgId?: number;
    tgName: string;
    nickname: string;
    roleId: number;
    lastName: string;
    firstName: string;
    fullName: string;
    nationalityId?: number;
    citizenshipId?: number;
    passport: string;
    image?: string;
    description: string;
}
