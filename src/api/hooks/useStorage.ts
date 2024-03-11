import { useState } from "react";

type TStorageType = "localStorage" | "sessionStorage" | "cookie"

export function useStorage<T>(key: string, initialValue: T, storageType?: TStorageType, onError?: (err: any) => void) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            // Get from local storage by key
            switch (storageType) {
                case "sessionStorage":
                    const sessionStorageItem = window.sessionStorage.getItem(key);
                    return sessionStorageItem ? JSON.parse(sessionStorageItem) : initialValue;
                case "cookie":
                    const parts = `; ${document.cookie}`.split(`; ${key}=`);
                    return parts?.length === 2 ? (decodeURIComponent(JSON.parse(parts[1]))) : initialValue;
                default:
                    const localStorageItem = window.localStorage.getItem(key);
                    return localStorageItem ? JSON.parse(localStorageItem) : initialValue;
            }

        } catch (error) {
            // If error also return initialValue
            if (!!onError) {
                onError(error);
            }
            return initialValue;
        }
    });
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== "undefined") {
                switch (storageType) {
                    case "sessionStorage":
                        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
                        break;
                    case "cookie":
                        const cookieValue = `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`
                        document.cookie = cookieValue;
                        break;
                    default:
                        window.localStorage.setItem(key, JSON.stringify(valueToStore));
                }
            }
        } catch (error) {
            if (!!onError) {
                onError(error);
            }
        }
    };
    return [storedValue, setValue] as const;
}