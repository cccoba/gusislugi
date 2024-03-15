export function downloadBlob(blob: any, fileName: string) {
    if (fileName) {
        const newBlob = new Blob([blob]);
        const blobUrl = window.URL.createObjectURL(newBlob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
    }
}

export function downloadUrl(url: string, fileName?: string) {
    const link = document.createElement("a");
    link.href = url;
    if (fileName) {
        link.setAttribute("download", fileName);
    }

    document.body.appendChild(link);
    link.click();
    link.remove();
}
export function blobToSrc(blob: any) {
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
}
export function dataURLtoBlob(dataURL: any) {
    const binary = atob(dataURL.split(",")[1]);
    const array = [];
    let i = 0;
    const len = binary.length;
    while (i < len) {
        array.push(binary.charCodeAt(i));
        i++;
    }
    return new Blob([new Uint8Array(array)], {
        type: "image/png",
    });
}

export function getFileType(file: any): "image" | "video" | "unknown" {
    if (!!file) {
        if (typeof file == "object") {
            if (
                (!!file.mimeType && typeof file.mimeType == "string") ||
                (!!file.type && typeof file.type == "string")
            ) {
                const mimeType = !!file.mimeType ? file.mimeType : file.type;
                if (mimeType.startsWith("image/")) {
                    return "image";
                }
                if (mimeType.startsWith("video/")) {
                    return "video";
                }
            }
            if (!!file.originalFileName) {
                return getFileType(file.originalFileName);
            }
        }
        let ext = "";
        if (!!file?.name) {
            ext = getFileExt(file.name);
        } else if (typeof file == "string" && file.indexOf(".") > -1) {
            ext = getFileExt(file);
        }
        if (!!ext) {
            switch (ext) {
                case "png":
                case "jpg":
                case "jpeg":
                case "gif":
                    return "image";
                case "mp4":
                case "webm":
                case "flv":
                case "mov":
                    return "video";
            }
        }
    }
    return "unknown";
}
export function getFileExt(fileName: string) {
    const ext = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
    return ext;
}
export function getFileTypeIconName(filename: string) {
    const fileExt = getFileExt(filename);
    switch (fileExt) {
        case "png":
        case "jpg":
        case "jpeg":
        case "gif":
            return "image";
        case "mp4":
            return "videocam";
        case "pdf":
            return "picture_as_pdf";
    }
    return "sim_card_download";
}

export function getFileName(url: string) {
    return url.substring(url.lastIndexOf("/") + 1);
}
