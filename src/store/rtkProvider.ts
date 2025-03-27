import { useEffect, useState } from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import getConst from "api/common/getConst";
import { webApiResultData } from "api/data";
import { getHeaders } from "api/data/dataProvider";

import GlobalStore from "./reducers/GlobalStore";

export type TUseGetDataName = "users" | "medicineParams";
interface IUseGetDataParams<P> {
    isLoading: boolean;
    data: P;
    error?: { name: string; message: string };
}
interface IUseGetDataResult<P> extends IUseGetDataParams<P> {
    refetch: () => void;
}

const d: any = document;
d.rtkProvider = { refetch: {} };

export const rtkProvider = createApi({
    reducerPath: "dbApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "",
        prepareHeaders: (headers) => getHeaders({}),
    }),
    endpoints: (builder) => ({
        getData: builder.query<any, TUseGetDataName>({
            query: (name) => `${getConst("api-url")}db&view=${name}`,
            transformResponse: (res: any) => {
                const { error, result } = webApiResultData<any>(res);
                if (error) {
                    throw error;
                }
                return result;
            },
        }),
    }),
});

function useGetData<T>(name: TUseGetDataName, defValue: T): IUseGetDataResult<T> {
    const dataQuery = useGetDataQuery(name);
    const [data, setData] = useState<IUseGetDataParams<T>>({
        isLoading: true,
        data: defValue,
    });
    useEffect(() => {
        switch (dataQuery.status) {
            case "fulfilled":
                setData({
                    isLoading: false,
                    data: dataQuery.data,
                });
                GlobalStore.addLoadedRtk(name);
                return;
            case "pending":
                setData({
                    isLoading: true,
                    data: defValue,
                });
                return;
            case "rejected":
                setData({
                    isLoading: false,
                    data: defValue,
                });
                return;
        }
    }, [dataQuery.status, name]);

    return { ...data, refetch: dataQuery.refetch };
}

export default useGetData;
export const { useGetDataQuery, useLazyGetDataQuery } = rtkProvider;
