import { ILinkDto } from "./ILinkDto";

export interface ILinkCategoryDto {
    id: number;
    title: string;
    roles: string;
    links: ILinkDto[];
}
