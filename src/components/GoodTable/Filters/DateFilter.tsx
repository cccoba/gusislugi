import { useMemo } from "react";
import lang from "lang";

import Fieldset from "components/Fieldset";
import Select from "components/Inputs/Select";

import { getEnumSelectValues } from "api/common/enumHelper";
import { IFilterDateValue } from "api/interfaces/components/GoodTable";
import { FilterDateEqualsEnum } from "api/common/filters";
import { Date } from "components";

interface IProps {
    label?: string;
    fieldName: string;
    filter?: IFilterDateValue;
    onChangeValue: (newValue: IFilterDateValue | null) => void;
    onCloseSearchFilter: () => void;
}

const langPage = lang.components.goodTable.filters;

function GoodTableSearchDateFilter({ label, fieldName, filter, onChangeValue, onCloseSearchFilter }: IProps) {
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
                variant="standard"
                label={langPage.searchType}
                values={getEnumSelectValues(FilterDateEqualsEnum, "FilterDateEqualsEnum")}
            />
            <Date
                value={defFilterValue.value as any}
                onChangeValue={(v) => onChangeValue({ ...defFilterValue, value: v || undefined })}
                variant="standard"
                label={langPage.value}
            />
        </Fieldset>
    );
}
export default GoodTableSearchDateFilter;
