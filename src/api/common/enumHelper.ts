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
        if (transformCb) {
            row.title = transformCb(enumArr[i]);
        }
        result.push(row);
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
export function getFlagValuesToFlag(values: number[]): number {
    let result = 0;
    for (const item of values) {
        result |= item;
    }
    return result;
}

/**
 *  из битовой маски получает массив значений
 * @param value  битовая маска
 * @returns массив значений
 */
export function getFlagToFlagValues(value: number, enumValue: any): number[] {
    const result: number[] = [];
    const roles = enumToArrayObject(enumValue);
    for (const role of roles) {
        if (value & role.id) {
            result.push(role.id);
        }
    }
    return result;
}

/**
 * проверяем входит ли mask2 в подмножество mask1
 * @param mask1 маска с которой сравниваем (наше значение)
 * @param mask2 что сравниваем (значение которое можно)
 * @returns
 */
export function checkFlagIncludes(mask1: number, mask2: number): boolean {
    return (mask1 & mask2) === mask2;
}
