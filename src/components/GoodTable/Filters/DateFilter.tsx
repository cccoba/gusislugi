import { useMemo } from "react";
import lang, { getEnumSelectValues } from "lang";

import Fieldset from "components/Fieldset";
import Select from "components/Inputs/Select";

import { type IFilterDateValue } from "api/interfaces/components/GoodTable";
import { FilterDateEqualsEnum } from "api/common/filters";
import { Date } from "components";

interface IProps {
    label?: string;
    fieldName: string;
    filter?: IFilterDateValue;
    onChangeValue: (newValue: IFilterDateValue | null) => void;
}

export default function GoodTableSearchDateFilter({ label, fieldName, filter, onChangeValue }: IProps) {
    const langPage = lang.components.goodTable.filters;
    const defFilterValue = useMemo<IFilterDateValue>(() => {
        if (filter) {
            return filter;
        }
        return { name: fieldName, value: undefined, searchType: FilterDateEqualsEnum.Equals };
    }, [filter, fieldName]);
    return (
        <Fieldset
            label={label}
            sx={{ display: "flex" }}
        >
            <Select
                value={defFilterValue.searchType}
                onChangeValue={(v) => onChangeValue({ ...defFilterValue, searchType: v })}
                variant="outlined"
                label={langPage.searchType}
                values={getEnumSelectValues(FilterDateEqualsEnum, "FilterDateEqualsEnum")}
            />
            <Date
                value={defFilterValue.value || null}
                onChangeValue={(v) => onChangeValue({ ...defFilterValue, value: v || undefined })}
                variant="outlined"
                label={langPage.value}
            />
        </Fieldset>
    );
}
