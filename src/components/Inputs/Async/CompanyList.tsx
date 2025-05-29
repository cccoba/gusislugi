import lang from "lang";
import useGetData from "store/rtkProvider";

import { type IInputProps } from "api/interfaces/components/IInputProps";
import { type ICompanyDto } from "api/interfaces/user/ICompanyDto";

import InputSelect from "../InputSelect/InputSelect";

interface ICompanyListProps extends IInputProps<number> {}
export default function CompanyList({ value, onChangeValue, ...props }: ICompanyListProps) {
    const langPage = lang.pages.companies;
    const { data } = useGetData<ICompanyDto[]>("companies", []);
    return (
        <InputSelect
            values={(data || []).map((x) => ({ id: x.id, title: x.title }))}
            onChangeValue={onChangeValue}
            label={langPage.company}
            value={value}
            {...props}
        />
    );
}
