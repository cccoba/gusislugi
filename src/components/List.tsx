import {
    Box,
    List as MuiList,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListProps,
    ListSubheader,
    IconButtonProps,
} from "@mui/material";
import { useEffect, useState } from "react";

import lang from "lang";

import { textFilter } from "api/common/filters";

import Icon from "./Icon";
import IconButton from "./Icon/IconButton";
import Image from "./Image";
import InputSearch from "./Inputs/InputSearch";

interface IListItemAction {
    icon: string;
    color?: IconButtonProps["color"];
    size?: IconButtonProps["size"];
    cb: (id: IListItem["id"]) => void;
}

type MediaType = "image" | "video";

export interface IListItem {
    id: number | string;

    key?: number | string;
    title: string;
    subTitle?: string;
    mediaId?: string;
    mediaType?: MediaType;
    icon?: string;
    selected?: boolean;
    otherProps?: any;
    actions?: IListItemAction[];
}

interface IList extends ListProps {
    onSelectValue?: (value: IListItem) => void;
    label?: string;
    filter?: boolean;
    values?: IListItem[];
    withDivider?: boolean;
}
export default function List({
    onSelectValue,
    label = "",
    filter = false,
    values = [],
    disablePadding = true,
    withDivider = true,
    ...props
}: IList) {
    const [filterValue, setFilterValue] = useState<string>("");
    const [filteredValues, setFilteredValues] = useState<IListItem[]>(values);
    useEffect(() => {
        onFilter(filterValue);
    }, [values]);

    const onFilter = (search: string) => {
        setFilterValue(search);
        setFilteredValues(
            values.filter((v) => textFilter(search, v.title) || (!!v.subTitle && textFilter(search, v.subTitle)))
        );
    };
    const itemClick = (item: IListItem) => {
        if (!!onSelectValue) {
            onSelectValue(item);
        }
    };
    return (
        <>
            {!!filter && (
                <Box sx={{ position: "sticky", top: -24, bgcolor: "common.white", zIndex: 100 }}>
                    <InputSearch
                        value={filterValue}
                        onChangeValue={onFilter}
                        showSearchIcon
                        placeholder={lang.search}
                        autoComplete="off"
                        fullWidth
                    />
                </Box>
            )}
            <MuiList
                {...props}
                disablePadding={disablePadding}
                subheader={!!label ? <ListSubheader>{label}</ListSubheader> : null}
            >
                {filteredValues.map((v) => {
                    return (
                        <ListItem
                            key={v.id}
                            onClick={() => itemClick(v)}
                            alignItems="flex-start"
                            disablePadding
                            divider={withDivider}
                            selected={!!v?.selected}
                            secondaryAction={
                                !!v?.actions?.length ? (
                                    <>
                                        {v.actions.map(({ icon, cb, size = "small", ...actionProps }, actionIndex) => (
                                            <IconButton
                                                key={actionIndex}
                                                edge="end"
                                                name={icon}
                                                size={size}
                                                onClick={() => cb(v.id)}
                                                {...actionProps}
                                            ></IconButton>
                                        ))}
                                    </>
                                ) : null
                            }
                        >
                            {!!v?.actions?.length ? (
                                <>
                                    {!!v.icon ? (
                                        <ListItemIcon>
                                            <Icon name={v.icon} />
                                        </ListItemIcon>
                                    ) : !!v?.mediaId ? (
                                        <ListItemIcon>
                                            <Image
                                                avatar
                                                image={v.mediaId}
                                            />
                                        </ListItemIcon>
                                    ) : null}
                                    {!!v.title && (
                                        <ListItemText
                                            primary={v.title}
                                            secondary={v?.subTitle}
                                        />
                                    )}
                                </>
                            ) : (
                                <ListItemButton>
                                    {!!v.icon ? (
                                        <ListItemIcon>
                                            <Icon name={v.icon} />
                                        </ListItemIcon>
                                    ) : !!v?.mediaId ? (
                                        <ListItemIcon>
                                            <Image
                                                avatar
                                                image={v.mediaId}
                                            />
                                        </ListItemIcon>
                                    ) : null}
                                    {!!v.title && (
                                        <ListItemText
                                            primary={v.title}
                                            secondary={v?.subTitle}
                                        />
                                    )}
                                </ListItemButton>
                            )}
                        </ListItem>
                    );
                })}
            </MuiList>
        </>
    );
}
