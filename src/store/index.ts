import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import UserReducer from "./reducers/UserSlice";
import ComponentsReducer from "./reducers/ComponentsSlice";
import DeviceReducer from "./reducers/DeviceSlice";
import { rtkProvider } from "./rtkProvider";

const store = configureStore({
    reducer: {
        user: UserReducer,
        components: ComponentsReducer,
        device: DeviceReducer,
        [rtkProvider.reducerPath]: rtkProvider.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkProvider.middleware),
});
setupListeners(store.dispatch);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
