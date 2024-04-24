import { ReactNode, useMemo } from "react";
import { Box, List, ListItem, ListItemBaseProps, ListProps, ListSubheader, Typography } from "@mui/material";

export interface IKeyValueListItem {
    title: string | number | ReactNode;
    value: string | number | ReactNode;
}
interface IProps extends ListProps {
    values: IKeyValueListItem[];
    label?: string;
    withDivider?: boolean;
    itemSxProps?: ListItemBaseProps["sx"];
}

const defItemSxProps: ListItemBaseProps["sx"] = {
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
};

function KeyValueList({
    values = [],
    disablePadding = true,
    label,
    withDivider = false,
    itemSxProps,
    ...props
}: IProps) {
    const itemSx = useMemo(() => {
        const newItemSx = { ...defItemSxProps };
        if (itemSxProps) {
            return { ...newItemSx, ...defItemSxProps };
        }
        return newItemSx;
    }, [itemSxProps]);
    return (
        <List
            {...props}
            disablePadding={disablePadding}
            subheader={!!label ? <ListSubheader>{label}</ListSubheader> : null}
        >
            {values.map((row, index) => {
                return (
                    <ListItem
                        key={index}
                        disablePadding
                        divider={withDivider}
                        sx={itemSx}
                    >
                        <Box sx={{ pr: 1, width: "50%", textAlign: "left" }}>
                            {typeof row.title === "object" ? (
                                row.title
                            ) : (
                                <Typography
                                    variant="subtitle1"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {row.title}
                                </Typography>
                            )}
                        </Box>
                        <Box sx={{ pl: 1, width: "50%", textAlign: "left" }}>
                            {typeof row.value === "object" ? (
                                row.value
                            ) : (
                                <Typography variant="subtitle2">{row.value}</Typography>
                            )}
                        </Box>
                    </ListItem>
                );
            })}
        </List>
    );
}
export default KeyValueList;
