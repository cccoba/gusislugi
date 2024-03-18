import { useState } from "react";

import Table from "components/Table";

import { IUserDto } from "api/interfaces/user/IUserDto";
import { SortOrderEnum } from "api/enums/SortOrderEnum";

import { userFields } from "./List";

import { IUserRowDto } from ".";

interface IProps {
    loading: boolean;
    users: IUserRowDto[];
    onDel: (ids: number[]) => void;
    onAdd: () => void;
}

function UserSelectTable({ loading = true, users = [], onDel, onAdd }: IProps) {
    const [selectedRows, setSelectedRows] = useState<IUserDto[] | null>(null);

    return (
        <Table
            loading={loading}
            values={users}
            fields={userFields}
            onSelectedRows={(x: IUserDto[]) => setSelectedRows(!!x?.length ? x : null)}
            order={{ direction: SortOrderEnum.Ascending, sort: "fullName" }}
            actions={[
                {
                    name: "add",
                    icon: "add",
                    onClick: onAdd,
                    disabled: false,
                },
                {
                    name: "delete",
                    icon: "delete",
                    onClick: (ids: number[]) => onDel(ids),
                    disabled: selectedRows === null,
                },
            ]}
        />
    );
}
export default UserSelectTable;
