import { CompanyPermissionActionFlag } from "api/enums/CompanyPermissionActionFlag";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";

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
        taxes?: RolePermissionFlag;
        fines?: RolePermissionFlag;
        wanteds?: RolePermissionFlag;
        company?: CompanyPermissionActionFlag;
        messages?: RolePermissionFlag;
        shop?: RolePermissionFlag;
        medicineAdmin?: RolePermissionFlag;
    };
}
