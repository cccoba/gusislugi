export function keyboardFilterSearch(searchText: string, value: string | number) {
    if (!searchText) {
        return true;
    }


    searchText = searchText.toLowerCase();
    value = value.toString().toLowerCase()

    if (value.includes(searchText)) return true;
    return value.includes(replaceKeyboard(searchText))
}
export function replaceKeyboard(str: string, to = "auto") {
    let from = "";
    if (!str || !str.length || typeof str !== "string") { return str; }
    str = str.toLowerCase();

    const search: any = {
        ru: [
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э",
            "я", "ч", "с", "м", "и", "т", "ь", "б", "ю"
        ],
        eng: [
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
            "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'",
            "z", "x", "c", "v", "b", "n", "m", ",", "."
        ]
    }
    if (to === "auto") {
        if (search.ru.indexOf(str[0]) > -1) { to = "eng"; from = "ru"; }
        else {
            if (search.eng.indexOf(str[0]) > -1) { to = "ru"; from = "eng"; }
        }
    }
    if (from === "") { return str; }
    let newStr = "";
    for (let i = 0; i < str.length; i++) {

        const ind = search[from].indexOf(str[i]);
        if (ind !== -1) {
            newStr += search[to][ind]
        }
        else {
            newStr += str[i];
        }
    }
    return newStr;
}