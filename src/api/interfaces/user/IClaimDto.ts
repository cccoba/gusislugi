import { ClaimStatusEnum } from "api/enums/ClaimStatusEnum";

export interface IClaimDto {
    id: number;
    addDate: number;
    updatedDate: number;
    title: string;
    description: string;
    resolution: string;
    status: ClaimStatusEnum;
    uid: number;
}
