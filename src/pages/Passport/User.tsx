import { Box, Button, Typography } from "@mui/material";

import { Fieldset, Icon, Image, Link, LinkButton } from "components";
import lang from "lang";

import { useAppSelector } from "api/hooks/redux";
import { IUserDto } from "api/interfaces/user/IUserDto";
import { checkFlagIncludes } from "api/common/enumHelper";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";

interface IProps {
    user: IUserDto;
    hideEdit?: boolean;
}

const langPage = lang.pages.passport.user;
const langUser = lang.components.userForm;

function PassportUser({ user, hideEdit }: IProps) {
    const citizenships = useAppSelector((s) => s.user.citizenships);
    const nationalities = useAppSelector((s) => s.user.nationalities);
    const roles = useAppSelector((s) => s.user.roles);
    const curentUserIsAdmin = useAppSelector((s) => s.user.tg?.isAdmin);
    const adminPermissions = useAppSelector((s) => s.user.user?.role.params.admins);
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
                    <Typography>
                        {langUser.citizenship}:{" "}
                        {citizenships.find((x) => x.id === user.citizenshipId)?.title || lang.unknown}
                    </Typography>
                    {!!curentUserIsAdmin && (
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
export default PassportUser;
