import { Button, Paper } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

import { setHeaderAll, loaderChange } from "store/reducers/ComponentsSlice";
import lang from "lang";

import { type IPage } from "api/interfaces/components/Page/IPage";
import { useAppDispatch } from "api/hooks/redux";

import { Icon, RoleChecker } from "..";
import ScrollTo from "../ScrollTo";

export default function Page({
    children,
    title = "",
    icon = "",
    backUrl = "",
    roles = [],
    redirectLink = "/",
    paperProps = { elevation: 0 },
    isLoading = false,
    loadingText = undefined,
    scrollTop = true,
    scrollTopBottom,
    fabMargin = true,
}: IPage) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(
            setHeaderAll({
                title,
                icon,
                backUrl,
            })
        );
    }, [dispatch, title, icon, backUrl]);
    useEffect(() => {
        dispatch(
            loaderChange({
                show: isLoading,
                text: loadingText,
            })
        );
    }, [isLoading, loadingText, roles, dispatch]);
    return (
        <RoleChecker
            roles={roles}
            redirectLink={redirectLink}
        >
            <>
                {scrollTop && (
                    <ScrollTo
                        id={"ModalScrollTop"}
                        bottom={scrollTopBottom}
                    />
                )}
                {isMobile && backUrl && (
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Icon name="back" />}
                        sx={{ mb: 1 }}
                        to={backUrl}
                        component={Link}
                    >
                        {lang.back}
                    </Button>
                )}
                <Paper
                    sx={fabMargin ? { mb: 8 } : {}}
                    {...paperProps}
                >
                    {children}
                </Paper>
            </>
        </RoleChecker>
    );
}
