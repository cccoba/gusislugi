import { Box, Paper } from "@mui/material";

import GoodTableLoader from "../TableLoader";
import { IGoodTableField, IGoodTableProps } from "..";

import GoodTableMobileRow from "./TableRow";
import GoodTableMobileNoRecordsRow from "./TableNoRecordsRow";

interface IProps<T> {
    fields: IGoodTableField[];
    values: IGoodTableProps<T>["values"];
    idName: string;
    loading: boolean;
    variant: IGoodTableProps<T>["variant"];
    noRecordsText?: string;
    onSelectRow?: (data: T) => void;
    onRowClick?: (data: T) => void;
}

function GoodTableMobile<T>({
    fields = [],
    values = [],
    idName = "id",
    loading = false,
    variant = "box",
    noRecordsText,
    onSelectRow,
    onRowClick,
}: IProps<T>) {
    const onClick = (data: T) => {
        if (onSelectRow) {
            onSelectRow(data);
        }
        if (onRowClick) {
            onRowClick(data);
        }
    };
    return (
        <Box component={variant === "paper" ? Paper : Box}>
            {!!loading ? (
                <GoodTableLoader
                    colSpan={fields.length}
                    responsiveView={true}
                />
            ) : !!values?.length ? (
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
                            onClick={onClick}
                        />
                    );
                })
            ) : (
                <GoodTableMobileNoRecordsRow noRecordsText={noRecordsText} />
            )}
        </Box>
    );
}
export default GoodTableMobile;
