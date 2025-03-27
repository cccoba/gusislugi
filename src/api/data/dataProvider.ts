import { IWebDataResult } from "api/interfaces/data/IWebDataResult";

import getConst from "../common/getConst";
export type TCRUDDataProviderAction = "getAll" | "getRecord" | "save" | "remove";
interface IDataProviderExtraProps {
    withoutInterceptors?: boolean;
    responseType?: "json" | "blob";
    requestType?: "json" | "params" | "raw";
    headers?: any;
}
interface IDataProviderErrorResponse {
    status: number;
    statusText: string;
    data?: any;
}
interface ICheckDataResult<T> {
    error?: {
        name: string;
        message: string;
    };
    result: T | null;
}
const webApiResultError = (message: string) => {
    return {
        name: "webApiResultError",
        message: message,
    };
};
export class CRUDDataProvider<T> {
    private baseUrl: string;
    constructor(baseUrl: string, softDelete: boolean = true) {
        this.baseUrl = baseUrl;
    }
    getData(actions: TCRUDDataProviderAction[] = ["getAll", "getRecord", "remove", "save"]) {
        return {
            getAll: (): Promise<IWebDataResult<T[]>> => {
                if (!actions.includes("getAll")) {
                    return new Promise<IWebDataResult<T[]>>((_, reject) =>
                        reject(webApiResultError("method not included"))
                    );
                }
                return dataProvider(`${this.baseUrl}list`);
            },
            getRecord: (id: number): Promise<IWebDataResult<T>> => {
                if (!actions.includes("getRecord")) {
                    return new Promise<IWebDataResult<T>>((_, reject) =>
                        reject(webApiResultError("method not included"))
                    );
                }
                return dataProvider(`${this.baseUrl}record&id=${id}`, "get");
            },
            save: (data: T): Promise<IWebDataResult<T>> => {
                if (!actions.includes("save")) {
                    return new Promise<IWebDataResult<T>>((_, reject) =>
                        reject(webApiResultError("method not included"))
                    );
                }
                return dataProvider(`${this.baseUrl}save`, "post", data);
            },
            remove: (ids: number[]): Promise<IWebDataResult<boolean>> => {
                if (!actions.includes("remove")) {
                    return new Promise<IWebDataResult<boolean>>((_, reject) =>
                        reject(webApiResultError("method not included"))
                    );
                }
                return dataProvider(`${this.baseUrl}remove`, "delete", ids);
            },
        };
    }
}
export const webApiResultData = <T>(data: IWebDataResult<T>): ICheckDataResult<T> => {
    if (data.error) {
        return {
            error: webApiResultError(data.error),
            result: null,
        };
    }
    const result: ICheckDataResult<T> = { result: data.result };
    return result;
};

export const dataProvider = async (
    url: string,
    method: "get" | "post" | "put" | "delete" = "get",
    data?: any,
    extraProps: IDataProviderExtraProps = {}
) => {
    const defaultExtraProps: IDataProviderExtraProps = {
        requestType: "json",
        responseType: "json",
        withoutInterceptors: false,
        headers: undefined,
    };
    extraProps = { ...defaultExtraProps, ...extraProps };
    url = getConst("api-url") + url;
    const headersParams = getHeaders(extraProps);
    const params: any = {
        method: method,
        headers: headersParams,
    };
    if (method !== "get" && typeof data != "undefined") {
        switch (extraProps.requestType) {
            case "json":
                params.body = JSON.stringify(data);
                break;
            case "params":
                const p = new URLSearchParams();
                Object.keys(data).forEach((key) => p.append(key, data[key]));
                params.body = p.toString();
                break;
            case "raw":
                params.body = data;
                break;
        }
    } else {
        if (data !== "undefined") {
            if (typeof data === "object" && data !== null) {
                const paramsString = new URLSearchParams(data).toString();
                if (!!paramsString) {
                    url += "?" + paramsString;
                }
            }
        }
    }
    return fetch(url, params).then(async (response) => {
        const isJson = response.headers.get("content-type")?.includes("application/json");
        const data = isJson ? await response.json() : response;
        if (!response.ok) {
            const error: IDataProviderErrorResponse = {
                status: response.status,
                statusText: response.statusText,
                data: data,
            };
            return Promise.reject(error);
        }
        return data;
    });
};
export const getHeaders = (extraProps: IDataProviderExtraProps): Headers => {
    let params: any = {};
    if (!extraProps.withoutInterceptors) {
        if (getConst("env-mode") === "development") {
            params["Authorization"] = window.localStorage.getItem(getConst("auth-token-name"));
        } else {
            if (!!(window as any)?.Telegram?.WebApp?.initDataUnsafe?.user?.username) {
                params["Authorization"] = `Telegram ${(window as any).Telegram.WebApp.initDataUnsafe.user.username}`;
            }
        }
    }
    if (extraProps.requestType === "json") {
        params["Content-Type"] = "application/json; charset=utf-8";
    }
    if (!!extraProps.headers && typeof extraProps == "object") {
        params = { ...params, ...extraProps.headers };
    }
    return new Headers(params);
};
