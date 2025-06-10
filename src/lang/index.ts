import { enumToArray, enumToValuesArray, getEnumValue } from "api/common/enumHelper";
import type { ISelectValue } from "components/Inputs/Select";

import ruLang from "./ru";
type TLangTypes = "ru";
const shortName: TLangTypes = "ru";
const name = "ru-RU";

interface ILangPlural {
    [key: string]: string[];
}
interface ILangPipes {
    [key: string]: { [key2: string]: string };
}
const lang = ruLang;

export function getLangValue(langObject: any, field: string | number, defValue: string = "") {
    if (field in langObject) {
        return langObject[field];
    }
    return defValue;
}

export function getLocaleName(type = "") {
    switch (type) {
        case "short":
            return shortName;
        default:
            return name;
    }
}

export function sprintf(text: string, ...values: (string | number)[]): string {
    if (typeof text == "string" && values?.length) {
        for (const value of values) {
            text = text.replace("%s", value.toString());
        }
    }
    return text;
}
export function getEnumTitleValue(enumObject: any, enumName: string, enumValue: number, defaultTitle = "") {
    const value = getEnumValue(enumObject, enumValue);
    if (value !== null) {
        return getEnumTitle(enumName, value);
    }
    return defaultTitle;
}
export function getEnumTitle(enumName: string, valueName: string) {
    enumName = enumName.charAt(0).toLocaleLowerCase() + enumName.slice(1);
    if (enumName.endsWith("Enum") || enumName.endsWith("Flag")) {
        enumName = enumName.slice(0, -4);
    }
    valueName = valueName.charAt(0).toLocaleLowerCase() + valueName.slice(1);
    const langPipes = lang.pipes as ILangPipes;
    return langPipes?.[enumName]?.[valueName] ? langPipes?.[enumName]?.[valueName] : valueName;
}

export function sortArray(arr: any[], fieldName: string, options = { numeric: true }) {
    const sorter = new Intl.Collator(name, options);
    return arr.sort((a, b) => {
        const aValue = a[fieldName];
        const bValue = b[fieldName];
        return sorter.compare(aValue, bValue);
    });
}
export function getEnumSelectValues(enums: any, enumName: string): ISelectValue[] {
    const enumNames = enumToArray(enums);
    const enumValues = enumToValuesArray(enums);

    const result: ISelectValue[] = [];
    for (let i = 0; i < enumNames.length; i++) {
        result.push({
            id: enumValues[i],
            title: getEnumTitle(enumName, enumNames[i].toString()),
        });
    }
    return result;
}
export default lang;
