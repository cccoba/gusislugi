import type { SxProps } from "@mui/material";

import getConst from "./getConst";

export function getObjLength(obj: any) {
    if (typeof obj === "object") {
        return Object.keys(obj).length;
    }
    return 0;
}

export function getServerFileUrl(image?: string): string {
    return image ? getConst("images-url") + image.toString() : getConst("assets-images-path") + "nopic.jpg";
}

export function cutText(text = "", length = 100) {
    if (1 + text.length > length) {
        return text.substring(0, length) + "…";
    }
    return text;
}

export function objEquals(firstObj: any, secondObject: any): boolean {
    if (null === firstObj || null === secondObject) return false;
    if ("object" !== typeof firstObj && "object" !== typeof secondObject) return firstObj === secondObject;
    else if ("object" != typeof firstObj || "object" != typeof secondObject) return false;
    if (firstObj instanceof Date && secondObject instanceof Date) return firstObj.getTime() === secondObject.getTime();
    else if (firstObj instanceof Date && secondObject instanceof Date) return false;
    const keysFirstObj = Object.keys(firstObj);
    const keysSecondObject = Object.keys(secondObject);
    if (keysFirstObj.length !== keysSecondObject.length) {
        return false;
    }
    return !keysFirstObj.filter(function (key) {
        if (typeof firstObj[key] === "object" || Array.isArray(firstObj[key])) {
            return !objEquals(firstObj[key], secondObject[key]);
        } else {
            return firstObj[key] !== secondObject[key];
        }
    }).length;
}
export function objCopyWithType<T>(obj: T) {
    return JSON.parse(JSON.stringify(obj)) as T;
}
export function objCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}

export function toArray<T>(obj: any): T[] {
    switch (typeof obj) {
        case "object":
            return Object.keys(obj).map(function (key) {
                return obj[key] as T;
            });
    }
    return [];
}

export function getCookie(name: string) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return "";
}

export function isGuid(value: string) {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value);
}
export function generateGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
export function generateRandomString(count: number, keys: string): string {
    let result: string = "";
    const keysLength: number = keys.length;
    if (keysLength === 0) {
        return "";
    }

    for (let i = 0; i < count; i++) {
        const randomIndex: number = Math.floor(Math.random() * keysLength);
        result += keys.charAt(randomIndex);
    }

    return result;
}
export function isUrl(value: string) {
    if (!value?.length || typeof value !== "string") {
        return false;
    }
    try {
        new URL(value);
        return true;
    } catch (err) {
        return false;
    }
}

export function stripTag(html: string) {
    html = html.replace(/<(?:.|\n)*?>/gm, "");
    html = html.replaceAll("&nbsp;", " ");
    html = html.replaceAll("&quot;", '"');
    html = html.replaceAll("&amp;", "&");
    html = html.replaceAll("&laquo;", "«");
    html = html.replaceAll("&raquo;", "»");
    html = html.replaceAll("&ndash;", "–");
    html = html.replaceAll("&mdash;", "–");
    return html;
}
export function numberFixed(number: string | number, fixed: number): number | undefined {
    if (typeof number === "number" || typeof number === "string" /*&& !isNaN(number - parseFloat(number))*/) {
        number = String(number);
        const split = number.split(".");
        if (split.length > 1) {
            const left = split[0];
            const right = split[1].substr(0, !fixed ? 4 : fixed);
            return Number(left + (fixed !== 0 ? "." + right : ""));
        }
        return Number(number);
    }
    return undefined;
}

export function checkDate(dateValue: any) {
    if (typeof dateValue === "object" && typeof dateValue?.getMonth === "function") {
        if (!!dateValue && !isNaN(dateValue)) {
            if (dateValue.toString() !== "Invalid Date") {
                return true;
            }
        }
    }
    return false;
}

/**
 * обводка для текста
 * @param color - цвет обводки
 * @returns -
 */

export function getTextStrokeSxProps(color = "#fff"): SxProps {
    return {
        textShadow: `1px 0 1px ${color}, 
                        0 1px 1px ${color}, 
                        -1px 0 1px ${color}, 
                        0 -1px 1px ${color};`,
    };
}

export function getUniqueValuesFromArray<T>(values: T[]) {
    return Array.from(new Set(values));
}

/**
 * меняем текущий url без перерендера
 * @param newUrl новый url
 * @param method "replace" | "push"
 * @param state
 */
export function updateUrl(newUrl: string, method: "replace" | "push" = "replace", state: any = null) {
    if (method === "push") {
        window.history.pushState(state, "", newUrl);
    } else {
        window.history.replaceState(state, "", newUrl);
    }
}
