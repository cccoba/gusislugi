import lang from "lang";

import Form, { TFormField } from "./Form";

interface IProps {}

const langPage = lang.components.filterForm;

interface IFilterFormProps<T> {
    data: T[];
    onFilter: (filteredData: T[]) => void;
    filters: TFormField[];
    filterInitValue: any;
}

function FilterForm<T>({ filters, filterInitValue, data = [] }: IFilterFormProps<T>) {
    const toFilterData = (data: any) => {
        console.log("toFilterData", data);
    };
    return (
        <>
            <Form
                fields={filters}
                values={filterInitValue}
                onInputChanged={toFilterData}
                submitBtnType="no"
            />
        </>
    );
}
export default FilterForm;
