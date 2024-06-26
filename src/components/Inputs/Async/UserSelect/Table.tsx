import GoodTable, { IGoodTableField } from "components/GoodTable";

import { SortOrderEnum } from "api/interfaces/components/GoodTable";

import { IUserRowDto } from ".";

interface IProps {
    loading: boolean;
    users: IUserRowDto[];
    userFields: IGoodTableField[];
    onDel: (ids: number[]) => void;
    onAdd: () => void;
}

function UserSelectTable({ userFields = [], loading = true, users = [], onDel, onAdd }: IProps) {
    return (
        <GoodTable<IUserRowDto>
            loading={loading}
            values={users}
            fields={userFields}
            order={{ direction: SortOrderEnum.Ascending, sort: "firstName" }}
            actions={[
                {
                    name: "add",
                    icon: "add",
                    onClick: onAdd,
                    disable: () => false,
                },
                {
                    name: "delete",
                    icon: "delete",
                    onClick: (selectedRows) => onDel(selectedRows.map((x) => x.id)),
                    disable: (selectedRows) => !selectedRows?.length,
                },
            ]}
        />
    );
}
export default UserSelectTable;
