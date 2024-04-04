import { Box, Button, Typography } from "@mui/material";
import { UserRolesEnum } from "api/enums/UserRolesEnum";
import { useAppSelector } from "api/hooks/redux";
import { IUserDto } from "api/interfaces/user/IUserDto";
import { Fieldset, Icon, Image, Link, RoleChecker } from "components";
import lang from "lang";

interface IProps {
    user: IUserDto;
}

const langPage = lang.pages.passport.user;
const langUser = lang.components.userForm;

function PassportUser({ user }: IProps) {
    const citizenships = useAppSelector((s) => s.user.citizenships);
    const nationalities = useAppSelector((s) => s.user.nationalities);
    const roles = useAppSelector((s) => s.user.roles);
    return (
        <>
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
                        {langUser.lastName + " " + langUser.firstName}: {user.lastName + " " + user.firstName}
                    </Typography>

                    <Typography>
                        {langUser.citizenship}:{" "}
                        {citizenships.find((x) => x.id === user.citizenshipId)?.title || lang.unknown}
                    </Typography>
                    <Typography>
                        {langUser.role}: {roles.find((x) => x.id === user.roleId)?.title || lang.unknown}
                    </Typography>
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
            <RoleChecker roles={[UserRolesEnum.Admins]}>
                <Box sx={{ textAlign: "right" }}>
                    <Button
                        component={Link}
                        url={`/users/${user.id}`}
                        variant="outlined"
                        startIcon={<Icon name="edit" />}
                    >
                        {lang.edit}
                    </Button>
                </Box>
            </RoleChecker>
        </>
    );
}
export default PassportUser;
