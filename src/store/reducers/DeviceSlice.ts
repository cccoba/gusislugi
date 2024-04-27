import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { deviceGetScreenName, deviceGetScreenType } from "api/common/device";
import { IDeviceData } from "api/interfaces/store/IDeviceData";

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
    serverAppVersion: "",
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
        setServerAppVersion(state, { payload }: PayloadAction<string>) {
            state.serverAppVersion = payload;
        },
    },
});

const { actions, reducer } = DeviceSlice;
export const { deviceInit, setDeviceSize, setServerAppVersion } = actions;

export default reducer;
