import type { Area } from "react-easy-crop/types";

export const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
    });
};

export function getRadianAngle(degreeValue: number) {
    return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number) {
    const rotRad = getRadianAngle(rotation);

    return {
        width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
}
function clearCircle(context: CanvasRenderingContext2D, x: number, y: number, radius: number) {
    context.save();
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, true);
    context.clip();
    context.clearRect(x - radius, y - radius, radius * 2, radius * 2);
    //context.restore();
}

export default async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area,
    rotation = 0,
    roundGrid = false,
    flip = { horizontal: false, vertical: false },
    returnType = "dataURL",
    returnFormat: "jpeg" | "png" = "jpeg"
): Promise<string | null> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return null;
    }

    const rotRad = getRadianAngle(rotation);

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    const croppedCanvas = document.createElement("canvas");

    const croppedCtx = croppedCanvas.getContext("2d");
    if (!croppedCtx) {
        return null;
    }
    croppedCanvas.width = pixelCrop.width;
    croppedCanvas.height = pixelCrop.height;
    if (roundGrid) {
        clearCircle(croppedCtx, pixelCrop.width / 2, pixelCrop.width / 2, pixelCrop.width / 2);
    }
    croppedCtx.drawImage(
        canvas,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    if (returnType === "dataURL") {
        if (returnFormat === "jpeg") {
            return croppedCanvas.toDataURL("image/jpeg", 0.75);
        }
        return croppedCanvas.toDataURL("image/png");
    }

    // As a blob
    return new Promise((resolve, reject) => {
        if (returnFormat === "jpeg") {
            croppedCanvas.toBlob(
                (file: any) => {
                    resolve(URL.createObjectURL(file));
                },
                "image/jpeg",
                0.75
            );
        } else {
            croppedCanvas.toBlob((file: any) => {
                resolve(URL.createObjectURL(file));
            }, "image/png");
        }
    });
}

export function resizeImage(
    objectURL: string,
    maxWidth: number,
    callback: (resizedImageDataURL: string) => void
): void {
    fetch(objectURL)
        .then((response) => {
            return response.blob();
        })
        .then((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = (event) => {
                const img = new Image();

                img.onload = () => {
                    const aspectRatio = img.width / img.height;
                    const width = maxWidth < img.width ? maxWidth : img.width;
                    const height = width / aspectRatio;

                    const canvas = document.createElement("canvas");
                    canvas.width = width;
                    canvas.height = height;
                    const context = canvas.getContext("2d");
                    if (context) {
                        context.drawImage(img, 0, 0, maxWidth, height);
                        const resizedImageDataURL = canvas.toDataURL("image/jpeg", 0.75);
                        callback(resizedImageDataURL);
                    }
                };

                img.src = event?.target?.result as string;
            };
        });
}
