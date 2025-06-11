import type { ReactNode } from "react";
import { useMemo } from "react";
import type { IconProps } from "@mui/material";
import { Box, Tooltip } from "@mui/material";

import type { IIconProps, TIconName } from "components/Icon";
import Icon from "components/Icon";
import lang from "lang";

interface IProps {
    value: boolean;
    config?: IGoodTableCellBooleanConfig;
}
export interface IGoodTableCellBooleanConfig {
    true?: IGoodTableCellBooleanConfigValue;
    false?: IGoodTableCellBooleanConfigValue;
}
interface IGoodTableCellBooleanConfigValue {
    title: string;
    cell?: ReactNode;
    icon?: {
        name: TIconName;
        color: IconProps["color"];
    };
}

const goodTableCellBooleanConfig: { true: IGoodTableCellBooleanConfigValue; false: IGoodTableCellBooleanConfigValue } =
    {
        true: {
            title: lang.yes,
            icon: {
                name: "ok",
                color: "success",
            },
        },
        false: {
            title: lang.no,
            icon: {
                color: "error",
                name: "close",
            },
        },
    };
export function getGoodTableCellBooleanConfig(
    value: boolean,
    config?: IGoodTableCellBooleanConfig
): IGoodTableCellBooleanConfigValue {
    const newConfig: any = { ...goodTableCellBooleanConfig };
    const valueConfig = value ? { ...newConfig.true, ...config?.true } : { ...newConfig.false, ...config?.false };
    if (!valueConfig?.title) {
        valueConfig.title = value ? lang.yes : lang.no;
    }
    return valueConfig;
}
function GoodTableCellBoolean({ value, config }: IProps) {
    const element = useMemo<ReactNode>(() => {
        const valueConfig = getGoodTableCellBooleanConfig(value, config);
        if (valueConfig?.cell !== undefined) {
            return valueConfig.cell;
        }
        return (
            <Tooltip title={valueConfig?.title}>
                <Box textAlign="center">
                    <Icon {...(valueConfig.icon as IIconProps)} />
                </Box>
            </Tooltip>
        );
    }, [value, config]);
    return <>{element}</>;
}
export default GoodTableCellBoolean;
