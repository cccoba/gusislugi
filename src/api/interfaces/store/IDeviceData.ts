export interface IDeviceData {
    isMobile: boolean;
    screen: {
        size: {
            width: number;
            height: number;
        };
        type: "xs" | "sm" | "md" | "lg" | "xl";
        name: "mobile" | "normal" | "big";
    };
}
