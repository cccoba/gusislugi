import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IComponentsData {
    header: {
        title: string | "";
        icon: string | null;
        backUrl: string | null;
    };
    menu: {
        show: boolean;
        filterText: string;
        //data: IMenusItem[];
    };
    loader: {
        show: boolean;
        text?: string;
    };
    alert: {
        title?: string;
        text: string;
        type?: "info" | "error" | "success";
        show?: boolean;
    };
    redirect: null | { id?: any; page: string };
}
const COMPONENTS_INITIAL_STATE: IComponentsData = {
    header: {
        title: "",
        icon: null,
        backUrl: null,
    },
    menu: {
        show: false,
        filterText: "",
        //data: []
    },
    loader: {
        show: false,
        text: "",
    },
    alert: {
        title: "",
        text: "",
        type: "info",
        show: false,
    },
    redirect: null,
};
const HeaderSlice = createSlice({
    name: "components",
    initialState: COMPONENTS_INITIAL_STATE,
    reducers: {
        setHeaderInitialState(state) {
            state.header = COMPONENTS_INITIAL_STATE.header;
        },
        setHeaderTitle(state, { payload }: PayloadAction<string>) {
            state.header.title = payload;
        },
        setHeaderIcon(state, { payload }: PayloadAction<string | null>) {
            state.header.icon = payload;
        },
        setHeaderBackUrl(state, { payload }: PayloadAction<string | null>) {
            state.header.backUrl = payload;
        },
        setHeaderAll(state, { payload }: PayloadAction<IComponentsData["header"]>) {
            state.header = payload;
        },
        menuShow(state) {
            state.menu.show = true;
        },
        menuHide(state) {
            state.menu.show = false;
        },
        menuToggle(state) {
            state.menu.show = !state.menu.show;
        },
        loaderShow(state) {
            state.loader.show = true;
        },
        loaderHide(state) {
            state.loader.show = false;
        },
        loaderChange(state, { payload }: PayloadAction<IComponentsData["loader"] | boolean>) {
            if (typeof payload === "boolean") {
                state.loader.show = payload;
            } else {
                state.loader = payload;
            }
        },
        showAlert(state, { payload }: PayloadAction<string>) {
            state.alert.text = payload;
            state.alert.show = true;
        },
        hideAlert(state) {
            state.alert = { ...COMPONENTS_INITIAL_STATE.alert };
        },
        setRedirect(state, { payload }: PayloadAction<IComponentsData["redirect"]>) {
            state.redirect = !!payload ? payload : null;
        },
    },
});

const { actions, reducer } = HeaderSlice;
export const {
    setHeaderTitle,
    setHeaderIcon,
    setHeaderBackUrl,
    setHeaderAll,
    setHeaderInitialState,
    menuShow,
    menuHide,
    menuToggle /*menuLoadData,*/,
    loaderShow,
    loaderHide,
    loaderChange,
    showAlert,
    hideAlert,
    setRedirect,
} = actions;

export default reducer;
