import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

import getConst from "api/common/getConst";
import { users } from "api/data";
import type { IFirstLoadView } from "api/data/IFirstLoadView";
import { webApiResultData } from "api/data/dataProvider";
import type { IUserData } from "api/interfaces/store/IUserData";
import type { IRoleDto } from "api/interfaces/user/IRoleDto";
import type { IUserDto } from "api/interfaces/user/IUserDto";

import { setServerAppVersion } from "./DeviceSlice";

const USER_INITIAL_STATE: IUserData = {
    user: null,
    tg: null,
    nationalities: [],
    roles: [],
    isLoading: false,
    isLoad: false,
    isAuth: false,
};
interface IFirstLoadData extends Omit<IFirstLoadView, "appVersion"> {}
const UserSlice = createSlice({
    name: "user",
    initialState: USER_INITIAL_STATE,
    reducers: {
        setInitialState(state) {
            return USER_INITIAL_STATE;
        },
        setRoles(state, { payload }: PayloadAction<IRoleDto[]>) {
            state.roles = payload;
        },
        setData(state, { payload }: PayloadAction<IFirstLoadData>) {
            state.tg = payload?.tgUser || null;
            state.user = payload?.user || null;
            state.isAuth = !!payload?.tgUser?.id;
            state.nationalities = payload.nationalities;
            state.roles = payload.roles;
        },
        setUserData(state, { payload }: PayloadAction<IUserDto>) {
            state.user = payload;
        },
        setMoney(state, { payload }: PayloadAction<number>) {
            if (state.user) {
                state.user.money = payload;
            }
        },
        setMoneyMinus(state, { payload }: PayloadAction<number>) {
            if (state.user) {
                state.user.money = state.user.money - payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userInit.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userInit.fulfilled, (state) => {
                state.isLoading = false;
                state.isLoad = true;
            })
            .addCase(userInit.rejected, (state) => {
                state.isLoading = false;
                state.isLoad = false;
                state.user = USER_INITIAL_STATE.user;
                state.tg = USER_INITIAL_STATE.tg;
            });
    },
});

export const userInit = createAsyncThunk("user/load", async (_, { dispatch, getState }) => {
    try {
        const res = await users.getMainData();
        const { error, result } = webApiResultData<IFirstLoadView>(res);
        if (!error && !!result) {
            const { appVersion, ...otherProps } = result;
            dispatch(setData(otherProps));
            dispatch(setServerAppVersion(appVersion));

            if (
                getConst("env-mode") === "development" &&
                window.localStorage.getItem(getConst("auth-token-name")) !== result.token
            ) {
                window.localStorage.setItem(getConst("auth-token-name"), result.token);
            }
        } else {
        }
    } catch (err) {
        console.log("userIniterr", err);
    }
});

const { actions, reducer } = UserSlice;
export const { setData, setUserData, setRoles, setMoneyMinus, setMoney } = actions;

export default reducer;
