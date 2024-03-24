import { ISelectValue } from "components/Inputs/Select";
import { getEnumTitle } from "lang";

export interface IEnumHelperObject {
    id: number;
    value: string;
    title?: string;
}
export function enumToArray(enumValues: any): string[] {
    const arr: string[] = [];
    for (const item in enumValues) {
        if (isNaN(Number(item))) {
            arr.push(item);
        }
    }
    return arr;
}
export function enumToValuesArray(enumValues: any): number[] {
    const arr: number[] = [];
    for (const item in enumValues) {
        if (!isNaN(Number(item))) {
            arr.push(parseInt(item));
        }
    }
    return arr;
}
export function enumToArrayObject(enums: any, transformCb: Function | null = null): IEnumHelperObject[] {
    const enumArr = enumToArray(enums);
    const enumValues = enumToValuesArray(enums);

    const result: IEnumHelperObject[] = [];
    for (let i = 0; i < enumArr.length; i++) {
        const row: IEnumHelperObject = {
            id: enumValues[i],
            value: enumArr[i],
        };
        if (!!transformCb) {
            row.title = transformCb(enumArr[i]);
        }
        result.push(row);
    }
    return result;
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

export function getEnumValue(enumValues: any, value: number): string | null {
    if (typeof enumValues[value] == "undefined") {
        return null;
    }
    return enumValues[value];
}

export function enumGetId(enumValues: any, value: any): number | null {
    if (typeof enumValues[value] == "undefined") {
        return null;
    }

    if (typeof value == "string") {
        return enumValues[value];
    }
    if (typeof value == "number") {
        return enumValues[enumValues[value]];
    }
    return null;
}

/**
 *  из массива значений получает битовую маску
 * @param values массив значений
 * @returns битовая маска
 */
export function getFlagByEnumValues(values: number[]): number {
    let result = 0;
    for (const item of values) {
        result |= item;
    }
    return result;
}
