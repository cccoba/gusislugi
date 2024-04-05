import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import getConst from "api/common/getConst";
import { users } from "api/data";
import { IFirstLoadView } from "api/data/IFirstLoadView";
import { webApiResultData } from "api/data/dataProvider";
import { IUserData } from "api/interfaces/store/IUserData";
import { IRoleDto } from "api/interfaces/user/IRoleDto";
import { IUserDto } from "api/interfaces/user/IUserDto";

const USER_INITIAL_STATE: IUserData = {
    user: null,
    tg: null,
    citizenships: [],
    nationalities: [],
    roles: [],
    isLoading: false,
    isLoad: false,
    isAuth: false,
};
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
        setData(state, { payload }: PayloadAction<IFirstLoadView>) {
            state.tg = payload?.tgUser || null;
            state.user = payload?.user || null;
            state.isAuth = !!payload?.tgUser?.id;
            state.citizenships = payload.citizenships;
            state.nationalities = payload.nationalities;
            state.roles = payload.roles;
        },
        setUserData(state, { payload }: PayloadAction<IUserDto>) {
            state.user = payload;
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
            dispatch(setData(result));

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
export const { setData, setUserData, setRoles } = actions;

export default reducer;
