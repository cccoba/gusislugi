import type { FabProps } from "@mui/material";
import { Box, Fab, Zoom } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import useIntersectionObserver from "api/hooks/useIntersectionObserver";

import Icon from "./Icon";

interface IScrollTop {
    color?: FabProps["color"];
    id?: string;
    bottom?: number;
}

export default function ScrollTo({ color = "secondary", id = "scrollTo", bottom = 24 }: IScrollTop) {
    const scrollRef = useRef(null);
    const entry = useIntersectionObserver(scrollRef, {});
    const [isVisible, setIsVisible] = useState<boolean>(true);

    const handleClick = () => {
        if (scrollRef?.current) {
            const anchor = scrollRef.current as HTMLSpanElement;
            anchor.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    };

    useEffect(() => {
        setIsVisible(!!entry?.isIntersecting);
    }, [entry]);

    return (
        <>
            <Box
                ref={scrollRef}
                component="span"
                sx={{ fontSize: "1px" }}
                id={id}
            ></Box>
            <Zoom in={!isVisible}>
                <Box
                    onClick={handleClick}
                    role="presentation"
                    sx={{ position: "fixed", bottom, right: 16, zIndex: 100 }}
                >
                    <Fab color={color}>
                        <Icon name="up" />
                    </Fab>
                </Box>
            </Zoom>
        </>
    );
}
