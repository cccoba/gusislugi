import { Box } from "@mui/material";
import { getEnumSelectValues } from "api/common/enumHelper";
import { FilterTextEqualsEnum, IFilterTextValue, TFilterValue } from "api/interfaces/components/GoodTable";
import Fieldset from "components/Fieldset";
import InputSearch from "components/Inputs/InputSearch";
import Select from "components/Inputs/Select";
import lang from "lang";
import { useMemo } from "react";

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
                values={getEnumSelectValues(FilterTextEqualsEnum, "FilterTextEqualsEnum")}
            />
            <InputSearch
                value={defFilterValue.value}
                autoComplete="off"
                onChangeValue={(v) => onChangeValue({ ...defFilterValue, value: v })}
                onClearButtonClick={toClear}
                variant="standard"
                label={langPage.value}
            />
        </Fieldset>
    );
}
export default GoodTableSearchTextFilter;
