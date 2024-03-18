export type TRoleParamName = "claims" | "messages";
export type TRoleParamValue = "no" | "view" | "edit";
export interface IRoleDto {
    id: number;
    title: string;
    params: { [key in TRoleParamName]: TRoleParamValue };
}
