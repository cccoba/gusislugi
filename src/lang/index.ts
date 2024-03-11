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

//const lang = require("./" + shortName).default;
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
export function getEnumTitle(enumName: string, valueName: string) {
    enumName = enumName.charAt(0).toLocaleLowerCase() + enumName.slice(1);
    if (enumName.endsWith("Enum") || enumName.endsWith("Flag")) {
        enumName = enumName.slice(0, -4);
    }
    valueName = valueName.charAt(0).toLocaleLowerCase() + valueName.slice(1);
    const langPipes = lang.pipes as ILangPipes;
    return !!langPipes?.[enumName]?.[valueName] ? langPipes?.[enumName]?.[valueName] : valueName;
}

export function sortArray(arr: any[], fieldName: string, options = { numeric: true }) {
    const sorter = new Intl.Collator(name, options);
    return arr.sort((a, b) => {
        return sorter.compare(a[fieldName], b[fieldName]);
    });
}
export default lang;
