import { useMemo } from "react";
import lang from "lang";

import Fieldset from "components/Fieldset";
import InputSearch from "components/Inputs/InputSearch";
import Select from "components/Inputs/Select";

import { getEnumSelectValues } from "api/common/enumHelper";
import { IFilterNumberValue } from "api/interfaces/components/GoodTable";
import { FilterNumberEqualsEnum } from "api/common/filters";

interface IProps {
    label?: string;
    fieldName: string;
    filter?: IFilterNumberValue;
    onChangeValue: (newValue: IFilterNumberValue | null) => void;
    onCloseSearchFilter: () => void;
}

const langPage = lang.components.goodTable.filters;

function GoodTableSearchNumberFilter({ label, fieldName, filter, onChangeValue, onCloseSearchFilter }: IProps) {
    const defFilterValue = useMemo<IFilterNumberValue>(() => {
        if (filter) {
            return filter;
        }
        return { name: fieldName, value: undefined, searchType: FilterNumberEqualsEnum.Contains };
    }, [filter, fieldName]);
    const toClear = () => {
        onChangeValue(null);
        onCloseSearchFilter();
    };
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
                values={getEnumSelectValues(FilterNumberEqualsEnum, "FilterNumberEqualsEnum")}
            />
            <InputSearch
                value={defFilterValue.value as any}
                autoComplete="off"
                onChangeValue={(v) => onChangeValue({ ...defFilterValue, value: parseFloat(v) })}
                onClearButtonClick={toClear}
                variant="standard"
                label={langPage.value}
            />
        </Fieldset>
    );
}
export default GoodTableSearchNumberFilter;
