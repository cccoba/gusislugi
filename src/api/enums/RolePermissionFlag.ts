export enum RolePermissionFlag {
    View = 1,
    Add = 2,
    Edit = 4,
    Delete = 8,
}

export const RolePermissionFlagAny =
    RolePermissionFlag.View | RolePermissionFlag.Add | RolePermissionFlag.Edit | RolePermissionFlag.Delete;
