import { useCallback } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import { loaderChange } from "store/reducers/ComponentsSlice";

import type { RootState, AppDispatch } from "store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useLoader = () => {
    const dispatch = useDispatch();

    const setIsLoading = useCallback(
        (isLoading: boolean) => {
            dispatch(loaderChange(isLoading));
        },
        [dispatch]
    );

    return { setIsLoading };
};
