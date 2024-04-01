import { Box, Paper } from "@mui/material";

import GoodTableLoader from "../TableLoader";
import { IGoodTableField, IGoodTableProps } from "..";

import GoodTableMobileRow from "./TableRow";

interface IProps<T> {
    fields: IGoodTableField[];
    values: IGoodTableProps<T>["values"];
    idName: string;
    loading: boolean;
    variant: IGoodTableProps<T>["variant"];
    onSelectRow?: (data: any) => void;
}

function GoodTableMobile<T>({
    fields = [],
    values = [],
    idName = "id",
    loading = false,
    variant = "box",
    onSelectRow,
}: IProps<T>) {
    return (
        <Box component={variant === "paper" ? Paper : Box}>
            {!!loading ? (
                <GoodTableLoader
                    colSpan={fields.length}
                    responsiveView={true}
                />
            ) : (
                values.map((row: any, index) => {
                    let key = index;
                    if (idName in row) {
                        key = row[idName];
                    }
                    return (
                        <GoodTableMobileRow
                            key={key}
                            row={row}
                            fields={fields}
                            onClick={onSelectRow}
                        />
                    );
                })
            )}
        </Box>
    );
}
export default GoodTableMobile;
