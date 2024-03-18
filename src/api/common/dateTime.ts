import dayjs from "dayjs";
import "dayjs/locale/ru";
export default function dateTime(dateTime?: string | Date | number | null, format = "DD.MM.YYYY HH:mm"): string {
    let result = "";
    if (!!dateTime) {
        const momentDate = dayjs(dateTime).format(format);
        if (!!momentDate) {
            result = momentDate.toString();
        }
    }

    return result;
}
