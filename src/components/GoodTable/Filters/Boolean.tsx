import { useMemo } from "react";

import Fieldset from "components/Fieldset";
import Select from "components/Inputs/Select";
import lang from "lang";

import { IFilterBooleanValue } from "api/interfaces/components/GoodTable";
import { FilterNumberEqualsEnum } from "api/common/filters";

import { getGoodTableCellBooleanConfig, IGoodTableCellBooleanConfig } from "../Cell/Boolean";

interface IProps {
    label?: string;
    fieldName: string;
    filter?: IFilterBooleanValue;
    config?: IGoodTableCellBooleanConfig;
    onChangeValue: (newValue: IFilterBooleanValue | null) => void;
    onCloseSearchFilter: () => void;
}

export default function GoodTableSearchBooleanFilter({
    label,
    fieldName,
    config,
    filter,
    onChangeValue,
    onCloseSearchFilter,
}: IProps) {
    const langPage = lang.components.goodTable.filters;
    const defFilterValue = useMemo<IFilterBooleanValue>(() => {
        if (filter) {
            return filter;
        }
        return { name: fieldName, value: undefined, searchType: FilterNumberEqualsEnum.Equals };
    }, [filter, fieldName]);
    const values = useMemo(() => {
        const trueValue = getGoodTableCellBooleanConfig(true, config);
        const falseValue = getGoodTableCellBooleanConfig(false, config);
        return [
            { id: "true", title: trueValue.title },
            { id: "false", title: falseValue.title },
        ];
    }, [config]);
    const toChange = (id?: string) => {
        const boolValue = id === undefined ? undefined : id === "true";
        onChangeValue({ ...defFilterValue, value: boolValue });
        onCloseSearchFilter();
    };
    return (
        <Fieldset
            label={label}
            sx={{ display: "flex" }}
        >
            <Select
                value={
                    defFilterValue.value === undefined ? undefined : defFilterValue.value.toString()
                }
                onChangeValue={toChange}
                variant="outlined"
                label={langPage.searchType}
                values={values}
            />
        </Fieldset>
    );
}
