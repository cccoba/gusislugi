import { ReactNode } from "react";
import { AppBar, IconButtonProps, SxProps, Tooltip } from "@mui/material";

import IconButton from "./Icon/IconButton";
import { TIconName } from "./Icon";

export interface IFooterAction {
    icon: TIconName;
    color?: IconButtonProps["color"];
    name: string;
    tooltip?: string;
}

interface IProps {
    actions: IFooterAction[];
    onAction: (actionName: string) => void;
    size?: IconButtonProps["size"];
    startChildren?: ReactNode;
    endChildren?: ReactNode;
}

function FooterActions({ actions = [], onAction, size = "large", startChildren, endChildren }: IProps) {
    const toAction = (e: any, action: string) => {
        e.stopPropagation();
        e.preventDefault();
        onAction(action);
    };
    const getButtonSx = (color: IconButtonProps["color"]): SxProps => {
        const sx: SxProps = {
            color: "#fff",
            bgcolor: "grey.500",
            border: "1px solid #fff",
            "&:hover": {
                bgcolor: "grey.500",
            },
        };
        switch (color) {
            case "primary":
            case "warning":
            case "error":
                sx.bgcolor = `${color}.main`;
                sx["&:hover"] = { bgcolor: sx.bgcolor };
                break;
        }
        return sx;
    };
    if (!actions?.length) {
        return null;
    }
    return (
        <AppBar
            position="fixed"
            sx={{
                top: "auto",
                bottom: 0,
                background: "rgba(0, 0, 0, 0.4)",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "6em",
            }}
            component="footer"
        >
            {startChildren}
            {actions.map(({ icon, name, color = "default", tooltip = "" }, actionIndex) => {
                if (tooltip) {
                    return (
                        <Tooltip
                            title={tooltip}
                            key={actionIndex}
                        >
                            <span>
                                <IconButton
                                    edge="end"
                                    name={icon}
                                    size={size}
                                    onClick={(e) => toAction(e, name)}
                                    sx={getButtonSx(color)}
                                ></IconButton>
                            </span>
                        </Tooltip>
                    );
                }
                return (
                    <IconButton
                        key={actionIndex}
                        edge="end"
                        name={icon}
                        size={size}
                        onClick={(e) => toAction(e, name)}
                        sx={getButtonSx(color)}
                    ></IconButton>
                );
            })}
            {endChildren}
        </AppBar>
    );
}
export default FooterActions;
