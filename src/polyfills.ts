/**
 * Полифиллы для поддержки старых браузеров, включая Android 8
 */

// Полифилл для String.prototype.replaceAll (если вдруг где-то еще используется)
if (!(String.prototype as any).replaceAll) {
    (String.prototype as any).replaceAll = function (searchValue: any, replaceValue: any): string {
        if (typeof searchValue === "string") {
            return this.split(searchValue).join(replaceValue);
        }
        if (searchValue instanceof RegExp) {
            if (!searchValue.global) {
                throw new TypeError("String.prototype.replaceAll called with a non-global RegExp argument");
            }
            return this.replace(searchValue, replaceValue);
        }
        return this.toString();
    };
}

// Полифилл для Array.from (если где-то еще используется)
if (!Array.from) {
    Array.from = function <T>(arrayLike: ArrayLike<T> | Iterable<T>): T[] {
        if (arrayLike == null) {
            throw new TypeError("Array.from requires an array-like object - not null or undefined");
        }
        const items = Object(arrayLike);
        const len = parseInt(items.length) || 0;
        const result: T[] = [];

        for (let i = 0; i < len; i++) {
            if (i in items) {
                result[i] = items[i];
            }
        }
        return result;
    };
}

// Полифилл для Object.assign (может потребоваться)
if (!Object.assign) {
    Object.assign = function (target: any, ...sources: any[]): any {
        if (target == null) {
            throw new TypeError("Cannot convert undefined or null to object");
        }
        const to = Object(target);

        for (let i = 0; i < sources.length; i++) {
            const source = sources[i];
            if (source != null) {
                for (const key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        to[key] = source[key];
                    }
                }
            }
        }
        return to;
    };
}

// Полифилл для Array.prototype.includes (если используется)
if (!Array.prototype.includes) {
    Array.prototype.includes = function <T>(searchElement: T, fromIndex?: number): boolean {
        const len = this.length;
        let index = fromIndex != null ? Math.floor(fromIndex) : 0;

        if (index < 0) {
            index = Math.max(len + index, 0);
        }

        for (; index < len; index++) {
            if (this[index] === searchElement) {
                return true;
            }
        }
        return false;
    };
}

// Полифилл для Promise.allSettled (если используется)
if (!Promise.allSettled) {
    (Promise as any).allSettled = function (promises: Iterable<any>): Promise<any> {
        return Promise.all(
            Array.from(promises).map((promise) =>
                Promise.resolve(promise)
                    .then((value) => ({ status: "fulfilled", value }))
                    .catch((reason) => ({ status: "rejected", reason }))
            )
        );
    };
}

export {}; // Делаем файл модулем
