import { useEffect, useState } from "react";

interface IWindowSize {
    width: number | undefined;
    height: number | undefined;
    orientation: "portrait" | "landscape";
}
export function useWindowSize() {
    const [windowSize, setWindowSize] = useState<IWindowSize>({
        width: undefined,
        height: undefined,
        orientation: "landscape",
    });
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
                orientation:
                    window.innerWidth > window.innerHeight
                        ? "landscape"
                        : "portrait",
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}
