import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import getConst from "api/common/getConst";
import { users } from "api/data";
import { IFirstLoadView } from "api/data/IFirstLoadView";
import { webDataResultData } from "api/data/dataProvider";
import { UserRolesEnum } from "api/enums/UserRolesEnum";

export interface IUserData {
    name: string;
    id: number;
    roleId: UserRolesEnum;
    isLoading: boolean;
    isAuth: boolean;
    phone: string;
    email: string;
    isBlocked: boolean;
}
const USER_INITIAL_STATE: IUserData = {
    name: "",
    roleId: UserRolesEnum.None,
    id: 0,
    isLoading: true,
    isAuth: false,
    phone: "",
    email: "",
    isBlocked: false,
};
const UserSlice = createSlice({
    name: "user",
    initialState: USER_INITIAL_STATE,
    reducers: {
        setInitialState(state) {
            return USER_INITIAL_STATE;
        },
        setUserData(state, { payload }: PayloadAction<IFirstLoadView>) {
            state.id = payload.user.id;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userInit.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userInit.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(userInit.rejected, (state) => {
                state.isLoading = false;
                state.isAuth = USER_INITIAL_STATE.isAuth;
                state.name = USER_INITIAL_STATE.name;
                state.email = USER_INITIAL_STATE.email;
                state.phone = USER_INITIAL_STATE.phone;
                state.id = USER_INITIAL_STATE.id;
            });
    },
});

export const userInit = createAsyncThunk("user/load", async (_, { dispatch, getState }) => {
    const authCookie = window.localStorage.getItem(getConst("auth-token-name"));
    try {
        const res = await users.getMainData();
        const { error, result } = webDataResultData<IFirstLoadView>(res);
        if (!error && !!result) {
            dispatch(setUserData(result));
            if (authCookie !== result.token) {
                window.localStorage.setItem(getConst("auth-token-name"), result.token);
            }
        } else {
        }
    } catch (err) {}
});

const { actions, reducer } = UserSlice;
export const { setUserData } = actions;

export default reducer;
