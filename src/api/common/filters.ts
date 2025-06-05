import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { isMobile } from "react-device-detect";

import { checkDate } from "./helper";

require("dayjs/locale/ru");

export enum FilterTextEqualsEnum {
    Contains,
    Equals,
    StartWith,
    EndWith,
    NotContains,
    IsClear,
    IsNotClear,
}
export enum FilterNumberEqualsEnum {
    Contains,
    Equals,
    More,
    Less,
    NotEquals,
}
export enum FilterDateEqualsEnum {
    Equals,
    More,
    Less,
    NotEquals,
}
/**
 * регистро и раскладко независимый поиск в тексте
 * @param searchText текст для поиска
 * @param value где ищем
 * @param filterFormat как сравниваем
 * @returns
 */

function textIsClear(value: string) {
    return value === "" || typeof value === "undefined" || value === null;
}
export function textFilter(searchText: string, value: string, filterFormat?: FilterTextEqualsEnum): boolean {
    if (filterFormat === FilterTextEqualsEnum.IsClear) {
        return textIsClear(value);
    }
    if (filterFormat === FilterTextEqualsEnum.IsNotClear) {
        return !textIsClear(value);
    }

    if (textIsClear(searchText)) {
        return true;
    }

    searchText = searchText.toLowerCase();
    value = value.toString().toLowerCase();

    switch (filterFormat) {
        case FilterTextEqualsEnum.Equals:
            if (searchText === value) {
                return true;
            }
            if (!isMobile) {
                return searchText === replaceKeyboard(value) || replaceKeyboard(searchText) === value;
            }
            break;
        case FilterTextEqualsEnum.StartWith:
            if (value.startsWith(searchText)) {
                return true;
            }
            if (!isMobile) {
                return value.startsWith(replaceKeyboard(searchText));
            }
            break;
        case FilterTextEqualsEnum.EndWith:
            if (value.endsWith(searchText)) {
                return true;
            }
            if (!isMobile) {
                return value.endsWith(replaceKeyboard(searchText));
            }
            break;
        case FilterTextEqualsEnum.NotContains:
            return !textFilter(searchText, value, FilterTextEqualsEnum.Contains);
        default:
            if (value.includes(searchText)) return true;
            if (!isMobile) {
                return value.includes(replaceKeyboard(searchText));
            }
    }
    return false;
}
export function numberFilter(searchNumber: number | "", value: number, filterFormat?: FilterNumberEqualsEnum): boolean {
    if (searchNumber === "") {
        return true;
    }
    switch (filterFormat) {
        case FilterNumberEqualsEnum.Equals:
            return searchNumber === value;
        case FilterNumberEqualsEnum.More:
            return searchNumber <= value;
        case FilterNumberEqualsEnum.Less:
            return searchNumber >= value;
        case FilterNumberEqualsEnum.NotEquals:
            return searchNumber !== value;
        default:
            return value.toString().includes(searchNumber.toString());
    }
}

export function dateFilter(searchDate: Date | null, value: Date | null, filterFormat?: FilterDateEqualsEnum): boolean {
    if (searchDate === null) {
        return true;
    }
    let djsValue: Dayjs = dayjs();
    if (value !== null) {
        if (typeof value === "string") {
            djsValue = dayjs(new Date(value));
        }
        if (checkDate(value)) {
            djsValue = dayjs(value);
        }
    } else {
        return false;
    }
    let djsSearchDate: Dayjs = dayjs();
    if (typeof searchDate === "string") {
        djsSearchDate = dayjs(new Date(searchDate));
    }
    if (checkDate(searchDate)) {
        djsSearchDate = dayjs(searchDate);
    }

    switch (filterFormat) {
        case FilterDateEqualsEnum.Less:
            djsSearchDate.set("hour", 0).set("minute", 0).set("second", 0);
            return djsSearchDate.diff(djsValue) >= 0;

        case FilterDateEqualsEnum.More:
            djsSearchDate.set("hour", 23).set("minute", 59).set("second", 59);
            return djsSearchDate.diff(djsValue) <= 0;
        case FilterDateEqualsEnum.Equals:
            return (
                djsValue.year() === djsSearchDate.year() &&
                djsValue.month() === djsSearchDate.month() &&
                djsValue.day() === djsSearchDate.day()
            );
        case FilterDateEqualsEnum.NotEquals:
            return (
                djsValue.year() !== djsSearchDate.year() ||
                djsValue.month() !== djsSearchDate.month() ||
                djsValue.day() !== djsSearchDate.day()
            );
    }

    return false;
}
export function replaceKeyboard(str: string, to = "auto") {
    let from = "";
    if (!str || !str.length || typeof str !== "string") {
        return str;
    }
    str = str.toLowerCase();

    const search: any = {
        ru: [
            "й",
            "ц",
            "у",
            "к",
            "е",
            "н",
            "г",
            "ш",
            "щ",
            "з",
            "х",
            "ъ",
            "ф",
            "ы",
            "в",
            "а",
            "п",
            "р",
            "о",
            "л",
            "д",
            "ж",
            "э",
            "я",
            "ч",
            "с",
            "м",
            "и",
            "т",
            "ь",
            "б",
            "ю",
        ],
        eng: [
            "q",
            "w",
            "e",
            "r",
            "t",
            "y",
            "u",
            "i",
            "o",
            "p",
            "[",
            "]",
            "a",
            "s",
            "d",
            "f",
            "g",
            "h",
            "j",
            "k",
            "l",
            ";",
            "'",
            "z",
            "x",
            "c",
            "v",
            "b",
            "n",
            "m",
            ",",
            ".",
        ],
    };
    if (to === "auto") {
        if (search.ru.indexOf(str[0]) > -1) {
            to = "eng";
            from = "ru";
        } else {
            if (search.eng.indexOf(str[0]) > -1) {
                to = "ru";
                from = "eng";
            }
        }
    }
    if (from === "") {
        return str;
    }
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
        const ind = search[from].indexOf(str[i]);
        if (ind !== -1) {
            newStr += search[to][ind];
        } else {
            newStr += str[i];
        }
    }
    return newStr;
}
