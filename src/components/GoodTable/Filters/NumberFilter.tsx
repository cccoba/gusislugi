import { useEffect, useState } from "react";
import lang, { getEnumSelectValues } from "lang";

import Fieldset from "components/Fieldset";
import InputSearch from "components/Inputs/InputSearch";
import Select from "components/Inputs/Select";

import type { IFilterNumberValue } from "api/interfaces/components/GoodTable";
import { FilterNumberEqualsEnum } from "api/common/filters";

interface IProps {
    label?: string;
    fieldName: string;
    filter?: IFilterNumberValue;
    onChangeValue: (newValue: IFilterNumberValue | null) => void;
    onCloseSearchFilter: () => void;
}

export default function GoodTableSearchNumberFilter({
    label,
    fieldName,
    filter,
    onChangeValue,
    onCloseSearchFilter,
}: IProps) {
    const langPage = lang.components.goodTable.filters;
    const defFilterType = FilterNumberEqualsEnum.Contains;
    const defFilterValue: string = "";
    const [filterType, setFilterType] = useState<FilterNumberEqualsEnum>(defFilterType);
    const [filterValue, setFilterValue] = useState<string>(defFilterValue);
    useEffect(() => {
        setFilterType(typeof filter?.searchType !== "undefined" ? filter.searchType : defFilterType);
        setFilterValue(typeof filter?.value === "number" ? filter.value.toString() : defFilterValue);
    }, [filter, fieldName]);
    const toClear = () => {
        onChangeValue(null);
        onCloseSearchFilter();
    };
    const onTypeChanged = (newType: FilterNumberEqualsEnum) => {
        setFilterType(newType);
        if (typeof filterValue === "string" && filterValue.length) {
            onChangeValue({
                name: fieldName,
                value: parseFloat(filterValue),
                searchType: filterType,
            });
        }
    };
    const onValueChanged = (newValue: string) => {
        onChangeValue({
            name: fieldName,
            value: newValue?.length ? parseFloat(newValue) : undefined,
            searchType: filterType,
        });
    };

    return (
        <Fieldset
            label={label}
            sx={{ display: "flex" }}
        >
            <Select
                value={filterType}
                onChangeValue={onTypeChanged}
                variant="outlined"
                label={langPage.searchType}
                values={getEnumSelectValues(FilterNumberEqualsEnum, "FilterNumberEqualsEnum")}
            />
            <InputSearch
                value={filterValue}
                autoComplete="off"
                onChangeValue={onValueChanged}
                onClearButtonClick={toClear}
                variant="outlined"
                label={langPage.value}
            />
        </Fieldset>
    );
}
