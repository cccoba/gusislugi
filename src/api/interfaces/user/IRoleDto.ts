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
        users?: RolePermissionFlag;
        medicalPolicies?: RolePermissionFlag;
        medicalInfo?: RolePermissionFlag;
        medicalInfoAdd?: RolePermissionFlag;
        medicalSickness?: RolePermissionFlag;
        taxes?: RolePermissionFlag;
        taxesTypes?: RolePermissionFlag;
        licenses?: RolePermissionFlag;
        fines?: RolePermissionFlag;
        wanteds?: RolePermissionFlag;
        wanteds2?: RolePermissionFlag;
        company?: CompanyPermissionActionFlag;
        messages?: RolePermissionFlag;
        shop?: RolePermissionFlag;
        medicineAdmin?: RolePermissionFlag;
        weapons?: RolePermissionFlag;
        medicalAdd?: RolePermissionFlag;
    };
}
