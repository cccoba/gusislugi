import { RolePermissionFlag } from "api/enums/RolePermissionFlag";

export type TRoleCheckerRole = [keyof IRoleDto["params"], RolePermissionFlag?];
export interface IRoleDto {
    id: number;
    title: string;
    params: {
        admins?: RolePermissionFlag;
        claims?: RolePermissionFlag;
        qr?: RolePermissionFlag;
        users?: RolePermissionFlag;
        medicalPolicies?: RolePermissionFlag;
        taxes?: RolePermissionFlag;
        fines?: RolePermissionFlag;
        wanteds?: RolePermissionFlag;
    };
}
