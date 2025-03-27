import { alpha, Box, Chip, FilterOptionsState, StandardTextFieldProps, SxProps, Tooltip } from "@mui/material";

import Image, { IImageProps } from "components/Image";
import Icon from "components/Icon";

import { textFilter } from "api/common/filters";

import { ISelectValue } from "../Select";

import InputSelectAll from "./SelectAll";

export interface IInputSelectBaseProps {
    inputProps?: Omit<StandardTextFieldProps, "variant">;
    renderOptionCb?: any;
    noOptionsText?: string;
    values: ISelectValue[];
    sx?: SxProps;
    loading?: boolean;
    groupByFieldName?: string;
    groupBy?: (option: ISelectValue) => string;
}
export function inputSelectBaseRenderOption(data: React.HTMLAttributes<HTMLLIElement>, option: ISelectValue) {
    if (option?.key === "undefinedData") {
        return null;
    }
    let imageProps: IImageProps | undefined = undefined;
    const boxSx: SxProps = { "&  img": { mr: 2, flexShrink: 0 } };
    if (option?.image) {
        const defImageProps: IImageProps = {
            width: "24px",
            height: "24px",

            style: { marginRight: "4px" },
        };
        switch (typeof option.image) {
            case "string":
                imageProps = { ...defImageProps, image: option.image };
                break;
        }
    }
    return (
        <Box
            component="li"
            {...data}
            sx={boxSx}
            key={option?.key ? option?.key : option.id}
        >
            {!!imageProps && <Image {...imageProps} />}
            {!!option?.icon && (
                <Icon
                    name={option.icon}
                    fontSize="small"
                    sx={{ mr: 1 }}
                />
            )}
            {option.title}
        </Box>
    );
}

export function sortValuesByFieldName(values: any[], fieldName?: string) {
    if (!fieldName) {
        return values;
    }
    return values.sort((a, b) => {
        const aValue = a[fieldName];
        const bValue = b[fieldName];
        return aValue.localeCompare(bValue);
    });
}

export function inputSelectBaseRenderMultiplyOption(
    data: React.HTMLAttributes<HTMLLIElement>,
    option: ISelectValue,
    selectedIds: any[],
    selectAllProps?: {
        selectAllId: string;
        valuesCount: number;
    }
) {
    let imageProps: IImageProps | undefined = undefined;
    const boxSx: SxProps = { "&  img": { mr: 2, flexShrink: 0 } };
    if (option?.image) {
        const defImageProps: IImageProps = {
            width: "24px",
            height: "24px",

            style: { marginRight: "4px" },
        };
        switch (typeof option.image) {
            case "string":
                imageProps = { ...defImageProps, image: option.image };
                break;
        }
    }
    if (selectedIds?.includes(option.id)) {
        boxSx.bgcolor = (theme: any) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity);
    }
    if (!!selectAllProps && option.id === selectAllProps.selectAllId) {
        return (
            <Box
                component="li"
                {...data}
                sx={{ ...boxSx, position: "sticky", top: -8 }}
                key={option?.key ? option?.key : option.id}
            >
                <InputSelectAll
                    valuesCount={selectAllProps.valuesCount}
                    selectedValuesCount={selectedIds.length}
                />
            </Box>
        );
    }
    return (
        <Box
            component="li"
            {...data}
            sx={boxSx}
            key={option?.key ? option?.key : option.id}
        >
            {!!imageProps && <Image {...imageProps} />}
            {!!option?.icon && (
                <Icon
                    name={option.icon}
                    fontSize="small"
                    sx={{ mr: 1 }}
                />
            )}
            {option.title}
        </Box>
    );
}
export function inputSelectFilterOptions(data: ISelectValue[], { inputValue }: FilterOptionsState<any>) {
    return data.filter((v) => textFilter(inputValue, v.title));
}
export const inputSelectBaseProps = {
    getOptionDisabled: (option: ISelectValue) => !!(option as any)?.disabled,
    getOptionLabel: (option: ISelectValue) => option.title,
    renderTags: (values: any[], getTagProps: any) => {
        return values.map((option: any, index: number) => {
            const props = getTagProps({ index });

            return (
                <Tooltip
                    title={option.title}
                    key={index}
                >
                    <Chip
                        onDelete={props.onDelete}
                        label={option.title}
                        clickable={false}
                        onClick={(e: any) => e.stopPropagation()}
                        sx={{
                            maxWidth: "250px",
                            "& .MuiChip-label": {
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            },
                        }}
                        {...(option.chipProps as any)}
                    />
                </Tooltip>
            );
        });
    },
};
