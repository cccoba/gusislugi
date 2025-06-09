import { useMemo } from "react";
import { Box } from "@mui/material";

import Fieldset from "components/Fieldset";
import { ISelectValue } from "components/Inputs/Select";
import lang from "lang";
import InputSelectMultiple from "components/Inputs/InputSelect/InputSelectMultiple";

import { FilterNumberEqualsEnum } from "api/common/filters";
import { IFilterListValue } from "api/interfaces/components/GoodTable";

interface IProps {
    label?: string;
    fieldName: string;
    filter?: IFilterListValue;
    values: ISelectValue[];
    onChangeValue: (newValue: IFilterListValue) => void;
}

function GoodTableSearchListFilter({ label, fieldName, values, filter, onChangeValue }: IProps) {
    const langPage = lang.components.goodTable.filters;
    const defFilterValue = useMemo<IFilterListValue>(() => {
        if (filter) {
            return filter;
        }
        return { name: fieldName, value: [], searchType: FilterNumberEqualsEnum.Equals };
    }, [filter, fieldName]);
    const toChange = (id: IFilterListValue["value"]) => {
        onChangeValue({ name: fieldName, value: id, searchType: FilterNumberEqualsEnum.Equals });
    };
    return (
        <Fieldset label={label}>
            <Box sx={{ minWidth: "200px" }}>
                <InputSelectMultiple<string | number>
                    value={defFilterValue.value || []}
                    onChangeValue={toChange as any}
                    variant="outlined"
                    label={langPage.searchType}
                    values={values}
                    fullWidth
                    withSelectAll
                />
            </Box>
        </Fieldset>
    );
}
export default GoodTableSearchListFilter;
