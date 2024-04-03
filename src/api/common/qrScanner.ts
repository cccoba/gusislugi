import { BarcodeFormat, BrowserMultiFormatReader } from "@zxing/library";
import lang from "lang";

const langPage = lang.components.qrScanner;

export interface IQr {
    cameras: MediaDeviceInfo[];
    curCamera: number;
    reader?: BrowserMultiFormatReader;
    el: string;
    init: (selector?: string) => Promise<{ camerasToggle?: boolean; lightToggle?: boolean; curLight?: boolean }>;
    parseError: (err: Error) => string;
    start: (cameraIndex?: number) => Promise<string>;
    changeCamera: () => Promise<string>;
    permissions: (cb?: IPermissionCb) => void;
    stop: () => void;
    lightToggle: () => Promise<{ curLight: boolean }>;
    decode: (text: string, password: number, pref: string) => string;
    encode: (text: string, password: number, pref: string) => string;
}
type IPermissionResult = "granted" | "denied";

type IPermissionCb = (result: IPermissionResult) => void;

const qr: IQr = {
    cameras: [],
    curCamera: 0,
    reader: undefined,
    el: "video",
    //writer: null,
    init: (selector) => {
        if (typeof selector !== "undefined") {
            qr.el = selector;
        }
        return new Promise((resolve, reject) => {
            qr.reader = new BrowserMultiFormatReader();
            if (qr.reader.isMediaDevicesSuported === true) {
                qr.reader
                    .listVideoInputDevices()
                    .then((cameras) => {
                        qr.cameras = cameras;
                        if (qr.cameras.length) {
                            if (qr.cameras.length > 1) {
                                resolve({ camerasToggle: true });
                            } else {
                                resolve({});
                            }
                        } else {
                            console.log("err1");
                            reject(langPage.errors.notFound);
                        }
                    })
                    .catch(function (err) {
                        console.log("err2");

                        reject(qr.parseError(err));
                    });
            } else {
                qr.reader = undefined;
                console.log("err3");
                reject(langPage.errors.media);
            }
        });
    },
    start: (cameraIndex) => {
        if (typeof cameraIndex !== "undefined") {
            qr.curCamera = cameraIndex;
        }
        return new Promise((resolve, reject) => {
            if (!!qr.reader && qr.cameras.length > 0) {
                qr.reader
                    .decodeOnceFromVideoDevice(qr.cameras[qr.curCamera].deviceId, qr.el)
                    .then((res: any) => {
                        if (res.format !== BarcodeFormat.RSS_14) {
                            resolve(res?.text);
                        }
                    })
                    .catch((err) => {
                        const parsedError = qr.parseError(err);
                        if (!parsedError) {
                            resolve("");
                        } else {
                            console.log("start err", err);
                            reject(parsedError);
                        }
                    });
            } else {
                console.log("qe", qr.reader, qr.cameras);

                reject("error");
            }
        });
    },
    changeCamera: () => {
        qr.curCamera++;
        if (qr.curCamera >= qr.cameras.length) {
            qr.curCamera = 0;
        }
        return new Promise((resolve, reject) => {
            if (!!qr.reader) {
                qr.reader
                    .decodeOnceFromVideoDevice(qr.cameras[qr.curCamera].deviceId, qr.el)
                    .then((res: any) => {
                        if (res.format !== BarcodeFormat.RSS_14) {
                            resolve(res?.text);
                        }
                    })
                    .catch((err) => {
                        const parsedError = qr.parseError(err);
                        if (!parsedError) {
                            resolve("");
                        } else {
                            console.log("start", err);
                            reject(parsedError);
                        }
                    });
            }
        });
    },
    parseError: (err: any) => {
        if (!!err && !!err.message) {
            switch (err.message) {
                case "Permission denied":
                case "Permission dismissed":
                    return langPage.errors.access;
                case "Video stream has ended before any code could be detected.":
                    return false;
                case "navigator.mediaDevices.getUserMedia is not a function":
                    return langPage.errors.media;
                case "Requested device not found":
                    return langPage.errors.notFound;
                case "Could not start video source":
                    return langPage.errors.notStart;
            }
            return err.message;
        }
        return "unknown";
    },
    permissions: (cb) => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                if (!!cb) {
                    cb("granted");
                }
                stream.getTracks().forEach(function (track) {
                    track.stop();
                });
            })
            .catch((err) => {
                if (!!cb) {
                    cb("denied");
                }
            });
    },
    stop: () => {
        if (!!qr.reader) {
            qr.reader.reset();
            qr.reader = undefined;
            qr.cameras = [];
        }
    },
    lightToggle: () => {
        return new Promise((resolve, reject) => {
            resolve({ curLight: false });
        });
    },
    decode: (text, password, pref) => {
        let value = "";
        if (text.indexOf(pref) === 0) {
            text = text.slice(pref.length);
            if (text.length > 0) {
                const pswd = password.toString();
                for (let i = 0; i < text.length; i++) {
                    const ind = password > 0 ? parseInt(pswd[i % pswd.length]) : 0;
                    value += String.fromCharCode(text.charCodeAt(i) - ind);
                }
            }
        }
        return value;
    },
    encode: (text, password, pref) => {
        let value = "";
        if (!!text?.length) {
            const pswd = password.toString();
            for (let i = 0; i < text.length; i++) {
                const ind = password > 0 ? parseInt(pswd[i % pswd.length]) : 0;
                value += String.fromCharCode(text.charCodeAt(i) + ind);
            }
        }
        return pref + value;
    },
};
export default qr;
