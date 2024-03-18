import { Box, Paper } from "@mui/material";
import { ITableField, ITableProps } from "..";
import TableLoading from "../TableLoading";
import MobileTableRow from "./MobileTableRow";

interface IProps {
    fields: ITableField[];
    values: ITableProps["values"]
    idName: string;
    loading: boolean;
    variant: ITableProps["variant"]
    onSelect?: (data: any) => void
}

function MobileTable({
    fields = [],
    values = [],
    idName = "id",
    loading = false,
    variant = "box",
    onSelect
}: IProps) {
    return (
        <Box component={variant === "paper" ? Paper : Box}>
            {!!loading ? (
                <TableLoading
                    colSpan={fields.length}
                    responsiveView={true}
                />
            ) : values.map((row) => {
                const { rowProps, ...oterProps } = row;
                return (
                    <MobileTableRow
                        key={row[idName]}
                        row={oterProps}
                        rowProps={rowProps}
                        fields={fields}
                        onClick={onSelect}
                    />)
            })}
        </Box>
    )
}
export default MobileTable;