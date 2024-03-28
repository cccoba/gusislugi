import { IFilterNumberValue, IFilterTextValue, TFilterValue } from "api/interfaces/components/GoodTable";

import { IGoodTableField } from "..";

import GoodTableSearchTextFilter from "./TextFilter";
import GoodTableSearchListFilter from "./ListFilter";
import GoodTableSearchNumberFilter from "./NumberFilter";

interface IGoodTableSearchFilter {
    field: IGoodTableField;
    filter?: TFilterValue;
    onChangeValue: (newValue: TFilterValue | null) => void;
    onCloseSearchFilter: () => void;
}

function GoodTableSearchFilter({ field, filter, onChangeValue, onCloseSearchFilter }: IGoodTableSearchFilter) {
    if (!field?.format || field.format === "text" || field.format === "date") {
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
    if (field.format === "list") {
        return (
            <GoodTableSearchListFilter
                filter={filter as IFilterNumberValue | undefined}
                fieldName={field.name}
                values={field.formatProps}
                onChangeValue={onChangeValue}
                label={field.title}
                onCloseSearchFilter={onCloseSearchFilter}
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
    return null;
}
export default GoodTableSearchFilter;
