import { type ReactNode } from "react";
import { Avatar, Backdrop, Box, Typography } from "@mui/material";

import lang from "lang";

interface ILoaderContentProps {
    children?: ReactNode;
    text?: string;
    animate?: false | "spin" | "breathing";
    fullScreen?: boolean;
}
interface ILoaderProps extends ILoaderContentProps {
    isLoading?: boolean;
    zIndex?: number;
}
export default function Loader({ isLoading = true, zIndex, fullScreen = true, ...props }: ILoaderProps) {
    if (fullScreen) {
        return (
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => (zIndex ? zIndex : theme.zIndex.drawer + 1) }}
                open={isLoading}
            >
                <LoaderContent
                    {...props}
                    fullScreen
                />
            </Backdrop>
        );
    }
    return <LoaderContent {...props} />;
}
const LoaderContent = ({
    animate = "spin",
    text = "",
    children = undefined,
    fullScreen = false,
}: ILoaderContentProps) => {
    const animationSx = animate
        ? animate === "spin"
            ? { animation: "spin 2s linear infinite", "@keyframes spin": { "100%": { transform: "rotate(360deg)" } } }
            : {
                  animation: "breathing 1s ease-out infinite normal",
                  "@keyframes breathing": {
                      "0%": { transform: "scale(0.9)" },
                      "25%": { transform: "scale(1)" },
                      "60%": { transform: "scale(0.9)" },
                      "100%": { transform: "scale(0.9)" },
                  },
              }
        : {};
    const sxProps: any = {};
    if (!fullScreen) {
        sxProps.position = "absolute";
        sxProps.left = 0;
        sxProps.top = 0;
        sxProps.right = 0;
        sxProps.bottom = 0;
    }
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                ...sxProps,
            }}
        >
            {!!children ? (
                children
            ) : (
                <>
                    <Avatar
                        src={process.env.PUBLIC_URL + "/assets/images/load.png"}
                        variant="square"
                        sx={{
                            ...animationSx,
                            width: 200,
                            height: 200,
                        }}
                    />
                    <Typography>{!!text ? text : lang.components.loader.defaultText}</Typography>
                </>
            )}
        </Box>
    );
};
