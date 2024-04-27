export enum RolePermissionFlag {
    None = 0,
    View = 1,
    Add = 2,
    Edit = 4,
    Delete = 8,
}

export const RolePermissionFlagAll =
    RolePermissionFlag.View | RolePermissionFlag.Add | RolePermissionFlag.Edit | RolePermissionFlag.Delete;
