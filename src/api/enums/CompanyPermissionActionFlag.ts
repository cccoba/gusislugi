export enum CompanyPermissionActionFlag {
    None = 0,
    View = 1,
    Add = 2,
    Edit = 4,
    Delete = 8,
    MoneyAdd = 16,
    MoneySubtract = 32,
}

export const CompanyPermissionFlagAll =
    CompanyPermissionActionFlag.View |
    CompanyPermissionActionFlag.Add |
    CompanyPermissionActionFlag.Edit |
    CompanyPermissionActionFlag.Delete |
    CompanyPermissionActionFlag.MoneyAdd |
    CompanyPermissionActionFlag.MoneySubtract;
