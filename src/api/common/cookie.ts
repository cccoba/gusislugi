export function getCookie(name: string, def = "") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts?.length === 2 ? (decodeURIComponent(parts[1])) : def;
}
export function setCookie(name: string, value: string) {
    const cookieValue = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`
    document.cookie = cookieValue;
}
export function removeCookie(name: string) {
    document.cookie = `${encodeURIComponent(name)}=; Max-Age=-99999999;`;
}