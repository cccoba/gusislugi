import { useMemo } from "react";
import { Drawer } from "@mui/material";

import { menuToggle } from "store/reducers/ComponentsSlice";

import getConst from "api/common/getConst";
import { useAppDispatch, useAppSelector } from "api/hooks/redux";

import NavigationMenuDrawer from "./NavigationMenuDrawer";

interface IProps {
    window?: () => Window;
}

export default function NavigationMenu({ window }: IProps) {
    const menuShowed = useAppSelector((state) => state.components.menu.show);
    const deviceScreenName = useAppSelector((state) => state.device.screen.name);

    const dispatch = useAppDispatch();

    const drawerWidth = getConst("menu-width");
    const sxProps = {
        "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: 0,
            bgcolor: "#fff",
        },
        "& .MuiDrawer-paper .MuiPaper-rounded": {
            borderRadius: 0,
        },
        "& .MuiPaper-root": {
            borderRight: deviceScreenName === "big" ? "1px solid #000" : "none",
            borderColor: "grey.300",
        },
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const handleDrawerToggle = () => {
        dispatch(menuToggle());
    };
    const drawer = useMemo(() => {
        return <NavigationMenuDrawer />;
    }, [deviceScreenName]);

    if (deviceScreenName === "mobile") {
        return (
            <Drawer
                container={container}
                variant="temporary"
                open={menuShowed}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={sxProps}
            >
                {drawer}
            </Drawer>
        );
    }
    if (deviceScreenName === "normal") {
        return (
            <Drawer
                variant="persistent"
                sx={sxProps}
                open={menuShowed}
            >
                {drawer}
            </Drawer>
        );
    }
    return (
        <Drawer
            variant="permanent"
            sx={sxProps}
            open
        >
            {drawer}
        </Drawer>
    );
}
