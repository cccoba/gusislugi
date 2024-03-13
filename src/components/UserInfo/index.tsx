import { Card, CardContent, CardHeader, Paper } from "@mui/material";

import lang from "lang";
import { Image } from "components";
import { IUserDto } from "api/interfaces/user/IUserDto";

interface IProps {
    user: IUserDto;
    isCurrent?: boolean;
}

const langPage = lang.components.userInfo;

function UserInfo({ user, isCurrent = false }: IProps) {
    return <Paper square>111</Paper>;
}
export default UserInfo;
