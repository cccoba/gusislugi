import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { deviceGetScreenName, deviceGetScreenType } from "api/common/device";

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
const DEVICE_INITIAL_STATE: IDeviceData = {
    isMobile: true,
    screen: {
        size: {
            width: window.innerWidth,
            height: window.innerHeight,
        },
        type: "xs",
        name: "mobile",
    },
};
const DeviceSlice = createSlice({
    name: "device",
    initialState: DEVICE_INITIAL_STATE,
    reducers: {
        deviceInit(state, { payload }: PayloadAction<IDeviceData>) {
            return payload;
        },
        setDeviceSize(state, { payload }: PayloadAction<IDeviceData["screen"]["size"]>) {
            state.screen.size = payload;
            state.screen.type = deviceGetScreenType(state.screen.size.width);
            state.screen.name = deviceGetScreenName(state.screen.type, state.isMobile);
        },
    },
});

const { actions, reducer } = DeviceSlice;
export const { deviceInit, setDeviceSize } = actions;

export default reducer;
