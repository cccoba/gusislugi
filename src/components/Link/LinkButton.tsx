import { Button, ButtonProps } from "@mui/material";
import { NavLink, NavLinkProps } from "react-router-dom";

interface IProps extends ButtonProps {
    url: string;
    state?: NavLinkProps["state"];
}

export default function Link({ url = "", state, ...props }: IProps) {
    return (
        <Button
            component={NavLink}
            to={url}
            state={state}
            {...props}
        />
    );
}
