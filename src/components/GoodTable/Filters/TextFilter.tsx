import { useMemo } from "react";

import Fieldset from "components/Fieldset";
import InputSearch from "components/Inputs/InputSearch";
import Select from "components/Inputs/Select";
import lang, { getEnumSelectValues } from "lang";

import { FilterTextEqualsEnum } from "api/common/filters";
import { IFilterTextValue } from "api/interfaces/components/GoodTable";

interface IProps {
    label?: string;
    fieldName: string;
    filter?: IFilterTextValue;
    onChangeValue: (newValue: IFilterTextValue | null) => void;
    onCloseSearchFilter: () => void;
}

const langPage = lang.components.goodTable.filters;

function GoodTableSearchTextFilter({ label, fieldName, filter, onChangeValue, onCloseSearchFilter }: IProps) {
    const defFilterValue = useMemo<IFilterTextValue>(() => {
        if (filter) {
            return filter;
        }
        return { name: fieldName, value: "", searchType: FilterTextEqualsEnum.Contains };
    }, [filter]);
    const toClear = () => {
        onChangeValue(null);
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
                values={getEnumSelectValues(FilterTextEqualsEnum, "FilterTextEqualsEnum")}
            />
            {defFilterValue.searchType !== FilterTextEqualsEnum.IsClear &&
            defFilterValue.searchType !== FilterTextEqualsEnum.IsNotClear ? (
                <InputSearch
                    value={defFilterValue.value}
                    autoComplete="off"
                    autoFocus={true}
                    onChangeValue={(v) => onChangeValue({ ...defFilterValue, value: v })}
                    onClearButtonClick={toClear}
                    variant="standard"
                    label={langPage.value}
                />
            ) : null}
        </Fieldset>
    );
}
export default GoodTableSearchTextFilter;
