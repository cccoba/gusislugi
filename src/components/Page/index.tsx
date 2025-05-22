import { Button, Paper } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { setHeaderAll, loaderChange } from "store/reducers/ComponentsSlice";
import lang from "lang";

import { IPage } from "api/interfaces/components/Page/IPage";
import { useAppDispatch, useAppSelector } from "api/hooks/redux";

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
    fabMargin = true,
}: IPage) {
    const isMobile = useAppSelector((s) => s.device.isMobile);
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
                    {scrollTop && <ScrollTo id={"ModalScrollTop"} />}
                    {children}
                </Paper>
            </>
        </RoleChecker>
    );
}
