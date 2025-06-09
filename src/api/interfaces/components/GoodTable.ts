import type { FilterDateEqualsEnum, FilterNumberEqualsEnum, FilterTextEqualsEnum } from "api/common/filters";

export interface IPaginationData {
    pageNumber: number;
    pageSize: number;
    totalItemCount?: number;
}

export interface ISortData {
    sort: string;
    direction: SortOrderEnum | "asc" | "desc";
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
    value?: number | "";
    searchType: FilterNumberEqualsEnum;
}
export interface IFilterListValue {
    name: string;
    value?: string[] | number[];
    searchType: FilterNumberEqualsEnum;
}
export interface IFilterDateValue {
    name: string;
    value?: Date;
    searchType: FilterDateEqualsEnum;
}
export interface IFilterBooleanValue {
    name: string;
    value?: boolean;
    searchType: FilterNumberEqualsEnum;
}

export type TFilterValue =
    | IFilterTextValue
    | IFilterNumberValue
    | IFilterDateValue
    | IFilterBooleanValue
    | IFilterListValue;
