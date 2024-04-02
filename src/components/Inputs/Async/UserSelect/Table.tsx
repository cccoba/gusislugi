import { useState } from "react";

import GoodTable from "components/GoodTable";

import { IUserDto } from "api/interfaces/user/IUserDto";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";

import { userFields } from "./List";

import { IUserRowDto } from ".";

interface IProps {
    loading: boolean;
    users: IUserRowDto[];
    onDel: (ids: number[]) => void;
    onAdd: () => void;
}

function UserSelectTable({ loading = true, users = [], onDel, onAdd }: IProps) {
    const [selectedRows, setSelectedRows] = useState<IUserRowDto[]>([]);

    return (
        <GoodTable<IUserRowDto>
            loading={loading}
            values={users}
            fields={userFields}
            onSelectedRows={setSelectedRows}
            order={{ direction: SortOrderEnum.Ascending, sort: "fullName" }}
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
