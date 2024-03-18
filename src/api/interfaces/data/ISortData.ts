import { SortOrderEnum } from "api/enums/SortOrderEnum";

export type TTableDirection = 'asc' | 'desc';

export interface ISortData {
    sort: string,
    direction: SortOrderEnum
}