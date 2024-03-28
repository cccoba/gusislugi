import { FilterNumberEqualsEnum, FilterTextEqualsEnum } from "api/common/filters";

export interface IPaginationData {
    pageNumber: number;
    pageSize: number;
    totalItemCount?: number;
}

export type TTableDirection = "asc" | "desc";

export interface ISortData {
    sort: string;
    direction: SortOrderEnum;
}

export enum SortOrderEnum {
    Ascending,
    Descending = 1,
}

export interface IFilterTextValue {
    name: string;
    value: string;
    searchType: FilterTextEqualsEnum;
}
export interface IFilterNumberValue {
    name: string;
    value?: number;
    searchType: FilterNumberEqualsEnum;
}
export interface IFilterDateValue {
    name: string;
    value?: Date;
    searchType: FilterNumberEqualsEnum;
}

export type TFilterValue = IFilterTextValue | IFilterNumberValue | IFilterDateValue;
