import { Box, Fab, FabProps, Tooltip } from "@mui/material";

import Icon, { TIconName } from ".";

interface IProps extends FabProps {
    onClick: () => void;
    icon: TIconName;
    tooltip?: string;
    bottom?: number;
    right?: number;
    disabled?: boolean;
}

function FabIcon({ onClick, icon, color = "primary", tooltip, bottom = 16, right = 16, disabled = false }: IProps) {
    return (
        <Box
            role="presentation"
            sx={{ position: "fixed", bottom, right, zIndex: 100 }}
        >
            <Tooltip title={tooltip || ""}>
                <span>
                    <Fab
                        color={color}
                        disabled={disabled}
                        onClick={onClick}
                    >
                        <Icon name={icon} />
                    </Fab>
                </span>
            </Tooltip>
        </Box>
    );
}
export default FabIcon;
