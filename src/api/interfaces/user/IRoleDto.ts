import type { CompanyPermissionActionFlag } from "api/enums/CompanyPermissionActionFlag";
import type { RolePermissionFlag } from "api/enums/RolePermissionFlag";

export type TRoleCheckerRole = [keyof IRoleDto["params"], RolePermissionFlag?];
export interface IRoleDto {
    id: number;
    title: string;
    description: string;
    params: {
        admins?: RolePermissionFlag | -1;
        claims?: RolePermissionFlag | -1;
        qr?: RolePermissionFlag | -1;
        users?: RolePermissionFlag | -1;
        medicalPolicies?: RolePermissionFlag | -1;
        medicalInfo?: RolePermissionFlag | -1;
        medicalInfoAdd?: RolePermissionFlag | -1;
        medicalSickness?: RolePermissionFlag | -1;
        taxes?: RolePermissionFlag | -1;
        taxesTypesEdit?: RolePermissionFlag | -1;
        taxesTypesView?: RolePermissionFlag | -1;
        licenses?: RolePermissionFlag | -1;
        fines?: RolePermissionFlag | -1;
        wanteds?: RolePermissionFlag | -1;
        wanteds2?: RolePermissionFlag | -1;
        wanteds3?: RolePermissionFlag | -1;
        company?: CompanyPermissionActionFlag | -1;
        messages?: RolePermissionFlag | -1;
        shop?: RolePermissionFlag | -1;
        shopUse?: 1 | 0;
        medicineAdmin?: RolePermissionFlag | -1;
        weapons?: RolePermissionFlag | -1;
        medicalAdd?: RolePermissionFlag | -1;
    };
}
