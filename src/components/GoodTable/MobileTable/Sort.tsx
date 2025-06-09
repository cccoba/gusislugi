import { useMemo } from "react";

import type { ISelectValue } from "components/Inputs/Select";
import Select from "components/Inputs/Select";
import Fieldset from "components/Fieldset";
import lang from "lang";

import type { ISortData } from "api/interfaces/components/GoodTable";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

import type { IGoodTableField } from "..";

const langPage = lang.components.goodTable.filters;
interface IProps {
    fields: IGoodTableField[];
    order?: ISortData;
    onSort: (data: ISortData) => void;
}

const directionValues: ISelectValue[] = [
    { id: SortOrderEnum.Ascending, title: langPage.asc },
    { id: SortOrderEnum.Descending, title: langPage.desc },
];
function GoodTableMobileSort({ fields, order, onSort }: IProps) {
    const values = useMemo<ISelectValue[]>(() => {
        const noFilterFormats: IGoodTableField["format"][] = ["image", "component"];
        if (fields?.length) {
            return fields
                .filter((x) => !noFilterFormats.includes(x.format))
                .map((x) => ({ id: x.name, title: x?.title || "" }));
        }
        return [];
    }, [fields]);

    const toChangeSort = (value: any) => {
        onSort({ direction: order?.direction || SortOrderEnum.Ascending, sort: value });
    };
    const toChangeDirection = (value: any) => {
        onSort({ direction: value || SortOrderEnum.Ascending, sort: order?.sort || "" });
    };
    return (
        <Fieldset
            label={langPage.searchType}
            variant="accordion"
            accordionProps={{ defaultHide: true }}
            sx={{ m: 1 }}
        >
            <Select
                values={values}
                value={order?.sort || ""}
                onChangeValue={toChangeSort}
                noDataText={lang.selectValue}
            />
            <Select
                values={directionValues}
                value={order?.direction || SortOrderEnum.Ascending}
                onChangeValue={toChangeDirection}
            />
        </Fieldset>
    );
}
export default GoodTableMobileSort;
