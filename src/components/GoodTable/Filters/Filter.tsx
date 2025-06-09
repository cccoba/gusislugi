import { getEnumSelectValues } from "lang";

import type {
    IFilterBooleanValue,
    IFilterDateValue,
    IFilterListValue,
    IFilterNumberValue,
    IFilterTextValue,
    TFilterValue,
} from "api/interfaces/components/GoodTable";

import type { IGoodTableField } from "..";

import GoodTableSearchTextFilter from "./TextFilter";
import GoodTableSearchListFilter from "./ListFilter";
import GoodTableSearchNumberFilter from "./NumberFilter";
import GoodTableSearchDateFilter from "./DateFilter";
import GoodTableSearchBooleanFilter from "./Boolean";

interface IGoodTableSearchFilter {
    field: IGoodTableField;
    filter?: TFilterValue;
    onChangeValue: (newValue: TFilterValue | null) => void;
    onCloseSearchFilter: () => void;
}

export default function GoodTableSearchFilter({
    field,
    filter,
    onChangeValue,
    onCloseSearchFilter,
}: IGoodTableSearchFilter) {
    if (!field?.format || field.format === "text") {
        return (
            <GoodTableSearchTextFilter
                filter={filter as IFilterTextValue | undefined}
                fieldName={field.name}
                onChangeValue={onChangeValue}
                label={field.title}
                onCloseSearchFilter={onCloseSearchFilter}
            />
        );
    }
    if (field.format === "list" || field.format === "listMany") {
        return (
            <GoodTableSearchListFilter
                filter={filter as IFilterListValue | undefined}
                fieldName={field.name}
                values={field.formatProps}
                onChangeValue={onChangeValue}
                label={field.title}
            />
        );
    }
    if (field.format === "enum" && typeof field.formatProps === "object" && field.formatProps?.length === 2) {
        return (
            <GoodTableSearchListFilter
                filter={filter as IFilterListValue | undefined}
                fieldName={field.name}
                values={getEnumSelectValues(field.formatProps[0], field.formatProps[1])}
                onChangeValue={onChangeValue}
                label={field.title}
            />
        );
    }
    if (field.format === "number") {
        return (
            <GoodTableSearchNumberFilter
                filter={filter as IFilterNumberValue | undefined}
                fieldName={field.name}
                onChangeValue={onChangeValue}
                label={field.title}
                onCloseSearchFilter={onCloseSearchFilter}
            />
        );
    }
    if (field.format === "date") {
        return (
            <GoodTableSearchDateFilter
                filter={filter as IFilterDateValue | undefined}
                fieldName={field.name}
                onChangeValue={onChangeValue}
                label={field.title}
            />
        );
    }
    if (field.format === "boolean") {
        return (
            <GoodTableSearchBooleanFilter
                filter={filter as IFilterBooleanValue | undefined}
                fieldName={field.name}
                onChangeValue={onChangeValue}
                label={field.title}
                onCloseSearchFilter={onCloseSearchFilter}
                config={field.formatProps}
            />
        );
    }
    return null;
}
