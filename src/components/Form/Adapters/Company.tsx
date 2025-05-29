import CompanyList from "components/Inputs/Async/CompanyList";

import type { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldCompany extends IFormField {
    type: "company";
}

const CompanyAdapter: IFormAdapter = {
    name: "company",
    input: ({ fieldProps, fieldParams, ...props }: IFormAdapterInputProps) => {
        return (
            <CompanyList
                {...props}
                {...fieldProps}
                {...fieldParams}
            />
        );
    },
    validate: (v, required) => {
        if (!!required && !v) {
            return false;
        }
        return true;
    },
};

export default CompanyAdapter;
