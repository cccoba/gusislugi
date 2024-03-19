import { ClaimStatusEnum } from "api/enums/ClaimStatusEnum";

export interface IClaimDto {
    id: number;
    uid: number;
    status: ClaimStatusEnum;
    title: string;
    description: string;
    resolution: string;
    created_at?: Date;
    updated_at?: Date;
}
