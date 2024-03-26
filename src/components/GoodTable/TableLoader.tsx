import { Box, TableCell, TableRow } from "@mui/material";
import lang from "lang";

interface IProps {
    colSpan: number;
    responsiveView: boolean;
}

const langPage = lang.components.table;

const sx = {
    textAlign: "center",
    fontWeight: "bold",
};

function GoodTableLoader({ colSpan = 1, responsiveView }: IProps) {
    if (responsiveView) {
        return <Box sx={sx}>{langPage.loading}</Box>;
    }
    return (
        <TableRow>
            <TableCell
                colSpan={colSpan}
                sx={sx}
            >
                {langPage.loading}
            </TableCell>
        </TableRow>
    );
}
export default GoodTableLoader;
