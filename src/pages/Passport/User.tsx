import { Box, Button, Typography } from "@mui/material";

import { Fieldset, Icon, Image, Link, LinkButton } from "components";
import lang, { getEnumTitleValue } from "lang";

import { useAppSelector } from "api/hooks/redux";
import type { IUserDto } from "api/interfaces/user/IUserDto";
import { checkFlagIncludes } from "api/common/enumHelper";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";
import { WeaponEnum } from "api/enums/WeaponEnum";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

interface IProps {
    user: IUserDto;
    hideEdit?: boolean;
}

export default function PassportUser({ user, hideEdit }: IProps) {
    const langPage = lang.pages.passport.user;
    const langUser = lang.components.userForm;
    const nationalities = useAppSelector((s) => s.user.nationalities);
    const roles = useAppSelector((s) => s.user.roles);
    const currentUserIsAdmin = useAppSelector((s) => s.user.tg?.isAdmin);
    const adminPermissions = useAppSelector((s) => s.user.user?.role.params.admins);
    const { state } = useLocation();
    const showAll = useMemo(() => {
        return !!state?.showAll;
    }, [state]);
    return (
        <>
            {!hideEdit && checkFlagIncludes(adminPermissions || 0, RolePermissionFlag.Edit) && (
                <Box sx={{ textAlign: "right" }}>
                    <LinkButton
                        url={`/users/${user.id}`}
                        variant="outlined"
                        startIcon={<Icon name="edit" />}
                    >
                        {lang.edit}
                    </LinkButton>
                </Box>
            )}
            <Box
                display="flex"
                flexWrap="wrap"
            >
                <Box sx={{ float: "left", mr: 1 }}>
                    <Image
                        image={user.image}
                        zoom
                        width="100px"
                    />
                </Box>
                <Fieldset label={`${langPage.mainData}`}>
                    <Typography>
                        {langUser.firstName}: {user.firstName}
                    </Typography>
                    {!!showAll /*|| currentUserIsAdmin*/ && (
                        <Typography>
                            {langUser.weapon}: {getEnumTitleValue(WeaponEnum, "WeaponEnum", user.weapon)}
                        </Typography>
                    )}
                    {!!currentUserIsAdmin && (
                        <Typography>
                            {langUser.role}: {roles.find((x) => x.id === user.roleId)?.title || lang.unknown}
                        </Typography>
                    )}
                </Fieldset>
                <Fieldset label={langPage.passportData}>
                    <Typography>
                        {langUser.nationality}:{" "}
                        {nationalities.find((x) => x.id === user.nationalityId)?.title || lang.unknown}
                    </Typography>
                    {!!currentUserIsAdmin && !!user.jobPosition && (
                        <Typography>
                            {langUser.jobPosition}: {user.jobPosition}
                        </Typography>
                    )}
                    <Typography>
                        {langUser.passport}: {user.passport}
                    </Typography>
                    <Typography>
                        {langUser.registration}: {user.registration}
                    </Typography>
                </Fieldset>
            </Box>
        </>
    );
}
