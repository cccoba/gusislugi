import { useState, useEffect } from "react";

import lang from "lang";

import { IWebDataResult } from "api/interfaces/data/IWebDataResult";
import { webDataResultData } from "api/data/dataProvider";

type LoadDataFunction<T, Args extends any[] = any[]> = (...args: Args) => Promise<IWebDataResult<T>>;

function useLoadApiData<T, Args extends any[] = any[]>(loadData: LoadDataFunction<T, Args>, args: Args) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);
    const refetch = async () => {
        try {
            setIsLoading(true);
            const res = await loadData(...args);
            const { error, result } = webDataResultData<T>(res);
            if (error) {
                throw error;
            }
            setData(result);
            setError(null);
        } catch (err: any) {
            setError(err?.name === "webApiResultError" ? err.message : lang.error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        refetch();
    }, [loadData, ...args]);

    return { data, isLoading, error, refetch };
}

export default useLoadApiData;
