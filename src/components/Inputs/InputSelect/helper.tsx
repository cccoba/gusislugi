import type { FilterOptionsState, StandardTextFieldProps, SxProps } from "@mui/material";
import { alpha, Box, Chip, Tooltip } from "@mui/material";

import Icon from "components/Icon";

import { textFilter } from "api/common/filters";

import type { ISelectValue } from "../Select";

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
    const boxSx: SxProps = { "&  img": { mr: 2, flexShrink: 0 } };
    return (
        <Box
            component="li"
            {...data}
            sx={boxSx}
            key={option?.key ? option?.key : option.id}
        >
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
    const boxSx: SxProps = { "&  img": { mr: 2, flexShrink: 0 } };

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
