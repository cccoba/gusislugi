import type { IconButtonProps, SvgIconProps } from "@mui/material";
import { IconButton as MaterialIconButton, Tooltip } from "@mui/material";

import type { TIconName } from ".";
import Icon from ".";

interface IProps extends IconButtonProps {
    name: TIconName;
    iconProps?: SvgIconProps;
    color?: IconButtonProps["color"];
    size?: IconButtonProps["size"];
    tooltip?: string;
}
export default function IconButton({
    name,
    size = "medium",
    color = "inherit",
    tooltip = "",
    iconProps,
    ...props
}: IProps) {
    if (tooltip) {
        return (
            <Tooltip title={tooltip}>
                <span>
                    <MaterialIconButton
                        {...props}
                        size={size}
                        color={color}
                    >
                        <Icon
                            fontSize={size}
                            {...iconProps}
                            name={name}
                        />
                    </MaterialIconButton>
                </span>
            </Tooltip>
        );
    }
    return (
        <MaterialIconButton
            {...props}
            size={size}
            color={color}
        >
            <Icon
                fontSize={size}
                {...iconProps}
                name={name}
            />
        </MaterialIconButton>
    );
}
