import { Link as MuiLink, LinkProps } from "@mui/material";
import { NavLink, NavLinkProps } from "react-router-dom";

import getConst from "api/common/getConst";

interface IProps extends LinkProps {
    url: string;
    state?: NavLinkProps["state"];
}

export default function Link({ url = "", state, ...props }: IProps) {
    return (
        <MuiLink
            component={NavLink}
            to={url}
            state={state}
            {...props}
        />
    );
}
