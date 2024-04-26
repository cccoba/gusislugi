import { useMemo } from "react";
import { Box, Pagination, Select, MenuItem, Typography } from "@mui/material";

import lang from "lang";

interface IProps {
    responsiveView: boolean;
    pageNumber: number;
    totalItemCount: number;
    rowsPerPage: number[];
    pageSize: number;
    onPaginationChange: (page: number, limit: number) => void;
}

const langPage = lang.components.goodTable;

function GoodTablePagination({
    pageSize = 10,
    pageNumber = 1,
    totalItemCount = 0,
    rowsPerPage = [],
    responsiveView,
    onPaginationChange,
}: IProps) {
    const countPage = useMemo(() => {
        return Math.ceil(totalItemCount / pageSize);
    }, [totalItemCount, pageSize]);
    const onPageChange = (_: any, newPage: number) => {
        if (!!onPaginationChange) {
            onPaginationChange(newPage, pageSize);
        }
    };
    const onRowsPerPageChange = (e: any) => {
        if (!!onPaginationChange) {
            const newPageSize = parseInt(e.target.value);
            onPaginationChange(newPageSize !== pageSize ? 1 : pageNumber, newPageSize);
        }
    };
    if (totalItemCount <= pageSize) {
        return null;
    }
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Pagination
                count={countPage}
                page={pageNumber}
                boundaryCount={responsiveView ? 0 : 2}
                siblingCount={1}
                onChange={onPageChange}
            />
            {!responsiveView && !!rowsPerPage?.length && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Typography sx={{ mr: 1, textAlign: "right" }}>{langPage.rowsPerPage}</Typography>
                    <Select
                        value={pageSize}
                        onChange={onRowsPerPageChange}
                        variant="standard"
                    >
                        {rowsPerPage.map((item, index) => {
                            return (
                                <MenuItem
                                    key={index}
                                    value={item}
                                >
                                    {item}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </Box>
            )}
        </Box>
    );
}
export default GoodTablePagination;
