import { Grid, Paper, Typography, Box, Button } from "@mui/material";

import { Icon, IconButton, Image, Link } from "components";

import { IMedicinePatientFullData } from "api/interfaces/Medicine/IMedicinePatientFullData";

import { useAppSelector } from "api/hooks/redux";
import { checkUserRoleAccess } from "components/RoleChecker";
import { useMemo } from "react";
import lang from "lang";

interface IUserInfoProps {
    user: IMedicinePatientFullData["user"];
    isAdmin: boolean;
    onAdd: () => void;
    onUpdate: () => void;
}

export default function UserInfo({ user, isAdmin, onAdd, onUpdate }: IUserInfoProps) {
    const langPage = lang.pages.medicine.patients;

    if (!user) return null;

    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <Grid
                container
                spacing={2}
                alignItems="center"
            >
                <Grid item>
                    <Image
                        image={user.image}
                        avatar
                    />
                </Grid>
                <Grid
                    item
                    xs
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="h6">{user.firstName}</Typography>
                        {isAdmin && (
                            <Link url={`/users/${user.id}`}>
                                <Icon
                                    name="edit"
                                    fontSize="small"
                                />
                            </Link>
                        )}
                    </Box>
                    <Typography
                        variant="body2"
                        color={!user?.patientId ? "success" : "error"}
                    >
                        {user?.patientId ? langPage.statusActive : langPage.statusNotActive}
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton
                        name="refresh"
                        onClick={onUpdate}
                    />
                    <IconButton
                        color="primary"
                        name="add"
                        onClick={onAdd}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}
