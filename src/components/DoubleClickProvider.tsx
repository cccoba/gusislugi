import type { BoxProps } from "@mui/material";
import { Box } from "@mui/material";
import type { MouseEvent } from "react";
import { useEffect, useRef } from "react";

interface IProps extends BoxProps {
    delayMs?: number;
    onDoubleClick: (item: MouseEvent<any>) => void;
}

export default function DoubleClickProvider({
    delayMs = 300,
    onDoubleClick,
    onClick,
    ...props
}: IProps) {
    const clickCount = useRef(0);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        onClick?.(e);

        clickCount.current += 1;

        if (clickCount.current === 1) {
            timerRef.current = setTimeout(() => {
                if (clickCount.current === 1) {
                    clickCount.current = 0;
                }
            }, delayMs);
        } else if (clickCount.current === 2) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            onDoubleClick(e);
            clickCount.current = 0;
        }
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return (
        <Box
            {...props}
            onClick={handleClick}
        />
    );
}
