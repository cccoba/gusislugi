import { useEffect } from "react";

export function useKeyPress(onKeyPress: (e: any) => void, type: "keydown" = "keydown") {
    useEffect(() => {
        document.addEventListener(type, onKeyPress);
        return () => {
            document.removeEventListener(type, onKeyPress);
        };
    }, []);
}
