import { useState } from "react";
import lang from "lang";
import { Icon, Link, Modal, Page, RoleChecker } from "components";
import { UserRolesEnum } from "api/enums/UserRolesEnum";
import { Box, Card, CardActionArea, CardHeader, Grid, Typography } from "@mui/material";
import { useAppSelector } from "api/hooks/redux";
import QrPrint from "components/QrPrint";
import dateTime from "api/common/dateTime";
const langPage = lang.pages.home;
interface IHomeItem {
    title: string;
    icon: string;
    url?: string;
    onClick?: () => void;
}

function Home() {
    const currentUserGuid = useAppSelector((s) => s.user.user?.guid);
    const currentUserName = useAppSelector((s) => s.user.user?.fullName);
    const [isMyIdShowed, setIsMyIdShowed] = useState(false);
    const showMyId = () => {
        setIsMyIdShowed(true);
    };
    const hideMyId = () => {
        setIsMyIdShowed(false);
    };
    return (
        <Page
            title={langPage.title}
            icon="home"
        >
            {!!isMyIdShowed && (
                <Modal
                    open
                    responsiveWidth
                    withCloseButton
                    onClose={hideMyId}
                    title={langPage.myId.title}
                >
                    <Box sx={{ textAlign: "center" }}>
                        <QrPrint value={currentUserGuid || ""} />
                        <Typography variant="h3">{currentUserName} </Typography>
                        <Typography>{dateTime(new Date())}</Typography>
                    </Box>
                </Modal>
            )}
            <Grid
                container
                spacing={{ xs: 2, md: 3, lg: 4, xl: 5 }}
            >
                <RoleChecker roles={[UserRolesEnum.Qr]}>
                    <HomeItem
                        url="/qrScanner"
                        title={langPage.actions.qr}
                        icon="qr_code_scanner"
                    />
                </RoleChecker>
                {!!currentUserGuid && (
                    <>
                        <HomeItem
                            onClick={showMyId}
                            title={langPage.actions.showId}
                            icon="vpn_key"
                        />
                        <HomeItem
                            url="/profile"
                            title={langPage.actions.profile}
                            icon="person_pin"
                        />
                        <HomeItem
                            url="/myClaims"
                            title={langPage.actions.claims}
                            icon="warning"
                        />
                        <HomeItem
                            url="/myMessages"
                            title={langPage.actions.messages}
                            icon="sms"
                        />
                    </>
                )}
            </Grid>
        </Page>
    );
}
function HomeItem({ url, title, icon, onClick }: IHomeItem) {
    return (
        <Grid
            item
            xs={12}
            sm={6}
            xl={4}
        >
            {!!url ? (
                <Link url={url}>
                    <Card raised>
                        <CardActionArea>
                            <CardHeader
                                avatar={<Icon name={icon} />}
                                title={title}
                            />
                        </CardActionArea>
                    </Card>
                </Link>
            ) : (
                <Card raised>
                    <CardActionArea onClick={onClick}>
                        <CardHeader
                            avatar={<Icon name={icon} />}
                            title={title}
                        />
                    </CardActionArea>
                </Card>
            )}
        </Grid>
    );
}
export default Home;
