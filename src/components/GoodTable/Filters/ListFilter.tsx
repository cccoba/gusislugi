import { Box } from "@mui/material";
import { getEnumSelectValues } from "api/common/enumHelper";
import { FilterNumberEqualsEnum, IFilterNumberValue } from "api/interfaces/components/GoodTable";
import Fieldset from "components/Fieldset";
import InputSearch from "components/Inputs/InputSearch";
import Select, { ISelectValue } from "components/Inputs/Select";
import lang from "lang";
import { useMemo } from "react";

interface IProps {
    label?: string;
    fieldName: string;
    filter?: IFilterNumberValue;
    values: ISelectValue[];
    onChangeValue: (newValue: IFilterNumberValue | null) => void;
    onCloseSearchFilter: () => void;
}

const langPage = lang.components.goodTable.filters;

function GoodTableSearchListFilter({ label, fieldName, values, filter, onChangeValue, onCloseSearchFilter }: IProps) {
    const defFilterValue = useMemo<IFilterNumberValue>(() => {
        if (filter) {
            return filter;
        }
        return { name: fieldName, value: undefined, searchType: FilterNumberEqualsEnum.Equals };
    }, [filter]);
    const toChange = (id: number) => {
        onChangeValue({ ...defFilterValue, value: id, searchType: FilterNumberEqualsEnum.Equals });
        onCloseSearchFilter();
    };
    return (
        <Fieldset
            label={label}
            sx={{ display: "flex" }}
        >
            <Select
                value={defFilterValue.value}
                onChangeValue={toChange}
                variant="standard"
                label={langPage.searchType}
                values={values}
            />
        </Fieldset>
    );
}
export default GoodTableSearchListFilter;
