import { Chip, ChipProps } from "@mui/material";
import { Link } from "react-router-dom";

import { IUserShortDto } from "api/interfaces/user/IUserShortDto";

import Image from "./Image";

interface IProps {
    user: IUserShortDto;
    withOutLink?: boolean;
    onClick?: (user: IUserShortDto) => void;
    variant?: ChipProps["variant"];
}

export default function UserView({ user, withOutLink, onClick, variant = "outlined" }: IProps) {
    const toUser = () => {
        onClick?.(user);
    };
    return (
        <Chip
            label={user.firstName}
            component={withOutLink ? "div" : Link}
            to={withOutLink ? undefined : `/users/${user.id}`}
            avatar={
                user.image ? (
                    <Image
                        width="26px"
                        height="26px"
                        avatar
                        image={user.image}
                        variant="circular"
                    />
                ) : undefined
            }
            onClick={withOutLink ? undefined : toUser}
            variant={variant}
        />
    );
}
