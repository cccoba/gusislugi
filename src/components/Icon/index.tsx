import React from "react";
import { Badge, BadgeProps, Icon as MatIcon, IconProps } from "@mui/material";

import icn from "./iconsList";

const defIcn = "not_interested";
export interface IBadgeProps extends BadgeProps {
    text: string;
    position: BadgeProps["anchorOrigin"];
}

interface IProps extends IconProps {
    name?: string;
    badge?: IBadgeProps;
}

export default function Icon({ name, color = "inherit", badge, ...props }: IProps) {
    const defName = !!name ? (!!icn[name] ? icn[name] : name) : defIcn;
    if (!!badge && !!badge?.text) {
        return (
            <Badge
                {...badge}
                badgeContent={badge.text}
                color={!!badge?.color ? badge.color : "secondary"}
                anchorOrigin={!!badge.position ? badge.position : { vertical: "top", horizontal: "right" }}
            >
                <MatIcon
                    color={color}
                    {...props}
                >
                    {defName}
                </MatIcon>
            </Badge>
        );
    }
    return (
        <MatIcon
            color={color}
            {...props}
        >
            {defName}
        </MatIcon>
    );
}
