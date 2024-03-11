import { IconButton as MaterialIconButton, IconButtonProps, IconProps, Tooltip } from "@mui/material";

import Icon, { IBadgeProps } from ".";

interface IProps extends IconButtonProps {
    name?: string;
    badge?: IBadgeProps;
    iconProps?: IconProps;
    color?: IconButtonProps["color"];
    size?: IconButtonProps["size"];
    tooltip?: string;
}
export default function IconButton({ name, badge, size = "medium", tooltip = "", iconProps, ...props }: IProps) {
    if (tooltip) {
        return (
            <Tooltip title={tooltip}>
                <span>
                    <MaterialIconButton
                        {...props}
                        size={size}
                    >
                        <Icon
                            fontSize={size}
                            {...iconProps}
                            name={name}
                            badge={badge}
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
        >
            <Icon
                fontSize={size}
                {...iconProps}
                name={name}
                badge={badge}
            />
        </MaterialIconButton>
    );
}
