import type { CompanyPermissionActionFlag } from "api/enums/CompanyPermissionActionFlag";
import type { RolePermissionFlag } from "api/enums/RolePermissionFlag";

export type TRoleCheckerRole = [keyof IRoleDto["params"], RolePermissionFlag?];
export interface IRoleDto {
    id: number;
    title: string;
    description: string;
    params: {
        admins?: RolePermissionFlag;
        claims?: RolePermissionFlag;
        qr?: RolePermissionFlag;
        users?: number;
        medicalPolicies?: RolePermissionFlag;
        medicalInfo?: RolePermissionFlag;
        medicalInfoAdd?: number;
        medicalSickness?: RolePermissionFlag;
        taxes?: RolePermissionFlag;
        licenses?: RolePermissionFlag;
        fines?: RolePermissionFlag;
        wanteds?: RolePermissionFlag;
        company?: CompanyPermissionActionFlag;
        messages?: RolePermissionFlag;
        shop?: RolePermissionFlag;
        medicineAdmin?: RolePermissionFlag;
        weapons?: RolePermissionFlag;
        medicalAdd?: RolePermissionFlag;
    };
}
