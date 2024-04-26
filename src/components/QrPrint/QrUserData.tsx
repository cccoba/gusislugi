import { Box, Typography } from "@mui/material";

import Modal from "components/Modal";

import dateTime from "api/common/dateTime";
import { IUserDto } from "api/interfaces/user/IUserDto";

import QrPrint from ".";

interface IProps {
    user: IUserDto | null;
    onClose: () => void;
    title: string;
}

function QrUserData({ user, onClose, title }: IProps) {
    if (!user) {
        return null;
    }
    return (
        <Modal
            open
            responsiveWidth
            withCloseButton
            onClose={onClose}
            title={title}
        >
            <Box
                sx={{
                    textAlign: "center",
                    mt: 2,
                }}
            >
                <QrPrint value={user.guid || ""} />
                <Typography
                    variant="h3"
                    sx={{ mt: 2 }}
                >
                    {user.firstName}{" "}
                </Typography>
                <Typography>{dateTime(new Date())}</Typography>
            </Box>
        </Modal>
    );
}
export default QrUserData;
