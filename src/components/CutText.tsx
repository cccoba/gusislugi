import React from "react";
import { Box, Paper, Popper, Typography } from "@mui/material";

interface GridCellExpandProps {
    value: string;
    width?: number | string;
    zIndex?: number;
}

function isOverflown(element: Element): boolean {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

const GridCellExpand = React.memo(function GridCellExpand({
    width = "50%",
    zIndex = 1500,
    value,
}: GridCellExpandProps) {
    const wrapper = React.useRef<HTMLDivElement | null>(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current!);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    React.useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent: KeyboardEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
                setShowFullCell(false);
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: "center",
                lineHeight: "24px",
                width: "100%",
                height: "100%",
                position: "relative",
                display: "flex",
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: "100%",
                    width,
                    display: "block",
                    position: "absolute",
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
            >
                {value}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{ maxWidth: width, zIndex }}
                >
                    <Paper
                        elevation={5}
                        style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
                    >
                        <Typography
                            variant="body2"
                            style={{ padding: 8 }}
                        >
                            {value}
                        </Typography>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});

export default function CutText(params: GridCellExpandProps) {
    return <GridCellExpand {...params} />;
}
