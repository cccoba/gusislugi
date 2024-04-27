import { useMemo } from "react";
import { Button } from "@mui/material";

import getConst from "api/common/getConst";
import { useAppSelector } from "api/hooks/redux";
import { useNotifier } from "api/hooks/useNotifier";
import lang from "lang";

const langPage = lang.components.header.appNotLast;
function AppVersion() {
    const serverAppVersion = useAppSelector((s) => s.device.serverAppVersion);
    const { showError } = useNotifier();
    const isLatest = useMemo(() => {
        return serverAppVersion === getConst("app-version");
    }, [serverAppVersion]);
    const toClick = () => {
        if (!isLatest) {
            showError(langPage);
        }
    };
    return (
        <Button
            sx={{
                position: "absolute",
                right: 5,
                top: 0,
                opacity: 0.5,
                textTransform: "none",
            }}
            color={isLatest ? "inherit" : "error"}
            onClick={toClick}
        >
            v {getConst("app-version")}
        </Button>
    );
}
export default AppVersion;
