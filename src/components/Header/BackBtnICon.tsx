import { Box } from "@mui/material";
import Icon from "components/Icon";
import Link from "components/Link/Link";

interface IBackBtnICon {
    backUrl: string | null;
    icon: string | null;
    deviceScreenName: string;
}
function BackBtnICon({ backUrl = "", icon = "", deviceScreenName = "" }: IBackBtnICon) {
    if ((!backUrl && !icon) || deviceScreenName === "mobile") {
        return null;
    }
    return (
        <Box sx={{ display: "flex", maxWidth: "70px" }}>
            {!!backUrl && (
                <Link
                    url={backUrl}
                    sx={{ display: "flex", color: "primary.contrastText" }}
                >
                    <Icon
                        name="back"
                        sx={{ mr: 1 }}
                    />
                </Link>
            )}
            {deviceScreenName !== "mobile" && !!icon && (
                <Icon
                    name={icon}
                    sx={{ mr: 1, display: { xs: "none", sm: "inline-block" } }}
                />
            )}
        </Box>
    );
}
export default BackBtnICon;
