import { useMemo } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import Icon from "components/Icon";
import { Image } from "components";

import TreeViewer, { ITreeItem } from ".";

export function treeItemSearchInChildrens(childrens: ITreeItem[], value: number | string) {
    for (const children of childrens) {
        if (children.id === value) {
            return true;
        }
        if (children.childrens?.length) {
            if (treeItemSearchInChildrens(children.childrens, value)) {
                return true;
            }
        }
    }
    return false;
}

interface IProps extends ITreeItem {
    type?: "table" | "input";
    value?: number | string;
    onSelect: (value: number | string) => void;
}

const paddingLeft = 2;

function TreeItem({ type = "table", value, childrens = [], id, icon, mediaId, title, subTitle, onSelect }: IProps) {
    const itemButtonSx = useMemo(() => {
        const sx: any = {
            "&.Mui-selected": {
                bgcolor: "primary.light",
                color: "primary.contrastText",
            },
            "&.Mui-selected:hover": {
                color: "primary.contrastText",
                bgcolor: "primary.dark",
            },
        };
        if (type === "input") {
            sx.p = 0;
            sx.pl = 1;
        }
        return sx;
    }, [type]);
    const isSelected = useMemo(() => {
        if (typeof value !== "undefined") {
            if (value === id) {
                return true;
            }
            return treeItemSearchInChildrens(childrens, value);
        }
        return false;
    }, [id, value, childrens]);
    const itemClick = () => {
        onSelect(id);
    };
    if (!childrens?.length) {
        return (
            <ListItem
                component={Box}
                sx={{ p: 0 }}
            >
                <ListItemButton
                    selected={isSelected}
                    onClick={itemClick}
                    sx={itemButtonSx}
                >
                    {!!icon ? (
                        <ListItemIcon>
                            <Icon name={icon} />
                        </ListItemIcon>
                    ) : !!mediaId ? (
                        <ListItemIcon>
                            <Image
                                avatar
                                image={mediaId}
                            />
                        </ListItemIcon>
                    ) : null}
                    {typeof title !== "undefined" && (
                        <ListItemText
                            primary={title}
                            secondary={subTitle}
                            sx={{ color: "currentColor", "& .MuiTypography-root": { color: "currentColor" } }}
                        />
                    )}
                </ListItemButton>
            </ListItem>
        );
    }
    return (
        <Accordion
            TransitionProps={{ unmountOnExit: true }}
            expanded={!!isSelected}
            sx={{
                boxShadow: "none",
                "&.Mui-expanded": { m: 0 },
            }}
        >
            <AccordionSummary
                sx={{
                    m: 0,
                    p: 0,
                    minHeight: `${type === "table" ? 48 : 24}px!important`,

                    "& .MuiAccordionSummary-content": {
                        m: 0,
                        "&.Mui-expanded": {
                            m: 0,
                            minHeight: `${type === "table" ? 48 : 24}px!important`,
                        },
                    },
                }}
            >
                <ListItem
                    component={Box}
                    sx={{ m: 0, p: 0 }}
                >
                    <ListItemButton
                        selected={isSelected}
                        onClick={itemClick}
                        sx={itemButtonSx}
                    >
                        {<Icon name={!!isSelected ? "indeterminate_check_box" : "add_box"} />}
                        {!!icon ? (
                            <ListItemIcon>
                                <Icon name={icon} />
                            </ListItemIcon>
                        ) : !!mediaId ? (
                            <ListItemIcon>
                                <Image
                                    avatar
                                    image={mediaId}
                                />
                            </ListItemIcon>
                        ) : null}
                        {typeof title !== "undefined" && (
                            <ListItemText
                                primary={title}
                                secondary={subTitle}
                                sx={{ color: "currentColor", "& .MuiTypography-root": { color: "currentColor" } }}
                            />
                        )}
                    </ListItemButton>
                </ListItem>
            </AccordionSummary>

            {!!childrens?.length && (
                <AccordionDetails sx={{ p: 0, pl: paddingLeft }}>
                    <TreeViewer
                        values={childrens}
                        value={value}
                        isNotRoot
                        onSelect={onSelect}
                        type={type}
                    />
                </AccordionDetails>
            )}
        </Accordion>
    );
}
export default TreeItem;
