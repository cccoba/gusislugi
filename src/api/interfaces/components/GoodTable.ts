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

export enum FilterTextEqualsEnum {
    Contains,
    Equals,
    StartWith,
    EndWith,
    IsClear,
    IsNotClear,
}
export enum FilterNumberEqualsEnum {
    Contains,
    Equals,
    More,
    Less,
    NotEquals,
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
