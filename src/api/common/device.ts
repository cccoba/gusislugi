import { isMobile } from "react-device-detect";

import { IDeviceData } from "api/interfaces/store/IDeviceData";

export const deviceLoad = (): IDeviceData => {
    const data: IDeviceData = {
        isMobile: deviceIsMobile(),
        screen: {
            size: deviceGetScreenSize(),
            type: "xs",
            name: "mobile",
        },
    };
    data.screen.type = deviceGetScreenType(data.screen.size.width);
    data.screen.name = deviceGetScreenName(data.screen.type, data.isMobile);
    return data;
};

export const deviceIsMobile = () => {
    return isMobile;
};
export const deviceGetScreenSize = (): IDeviceData["screen"]["size"] => {
    return { width: window.innerWidth, height: window.innerHeight };
};
export const deviceGetScreenType = (width: number): IDeviceData["screen"]["type"] => {
    if (width >= 1536) {
        return "xl";
    }
    if (width >= 1200) {
        return "lg";
    }
    if (width >= 900) {
        return "md";
    }
    if (width >= 600) {
        return "sm";
    }
    return "xs";
};
export const deviceGetScreenName = (screenType: IDeviceData["screen"]["type"], isMobile: boolean) => {
    if (!isMobile) {
        switch (screenType) {
            case "xl":
            case "lg":
            case "md": //big
                return "big";
        }
        return "normal";
    }
    return "mobile";
};
