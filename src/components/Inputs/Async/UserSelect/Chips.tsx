import { Box, Chip, Typography } from "@mui/material";

import { IconButton, Image } from "components";
import lang from "lang";

import type { IUserRowDto } from ".";

interface IProps {
    loading: boolean;
    users: IUserRowDto[];
    withImage: boolean;
    onDel: (ids: number[]) => void;
    onAdd: () => void;
}
const langPage = lang.components.userSelect;

function UserSelectChips({ loading = true, users = [], withImage, onDel, onAdd }: IProps) {
    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Box sx={{ flexGrow: 3 }}>
                {users?.length ? (
                    users.map((user) => (
                        <Chip
                            sx={{
                                "& .MuiChip-label": { pl: 0 },
                            }}
                            key={user.id}
                            label={user.firstName}
                            avatar={
                                !!withImage ? (
                                    <Image
                                        width="32px"
                                        avatar
                                        image={user.image}
                                        variant="circular"
                                    />
                                ) : undefined
                            }
                            onDelete={() => onDel([user.id])}
                        />
                    ))
                ) : (
                    <Typography
                        variant="subtitle2"
                        sx={{ opacity: 0.6 }}
                    >
                        {langPage.multiplePlaceholder}
                    </Typography>
                )}
            </Box>
            <IconButton
                name="add"
                onClick={onAdd}
                color="primary"
            />
        </Box>
    );
}
export default UserSelectChips;
