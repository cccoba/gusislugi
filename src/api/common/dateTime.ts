import dayjs from "dayjs";
import "dayjs/locale/ru";
export default function dateTime(dt?: string | Date | number | null, format = "DD.MM.YYYY HH:mm"): string {
    if (dt) {
        if (typeof dt === "number" && isUnixTime(dt)) {
            dt *= 1000;
        }
        const momentDate = dayjs(dt).format(format);
        if (momentDate) {
            return momentDate.toString();
        }
    }
    return "";
}
export function isUnixTime(dt: any) {
    if (typeof dt === "number") {
        if (dt > 15 * 100000000 && dt < 15 * 100000000000) {
            return true;
        }
    }
    return false;
}
