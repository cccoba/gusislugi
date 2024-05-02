import { useState } from "react";
import { Box, Card, CardActionArea, CardHeader, Grid, Typography } from "@mui/material";

import lang from "lang";
import { Icon, Link, Modal, Page, RoleChecker } from "components";

import { useAppSelector } from "api/hooks/redux";
import QrPrint from "components/QrPrint";
import dateTime from "api/common/dateTime";
import QrUserData from "components/QrPrint/QrUserData";
import { checkFlagIncludes } from "api/common/enumHelper";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";

const langPage = lang.pages.home;
interface IHomeItem {
    title: string;
    icon: string;
    url?: string;
    onClick?: () => void;
}

function Home() {
    const currentUser = useAppSelector((s) => s.user.user);
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
                <QrUserData
                    onClose={hideMyId}
                    title={langPage.myId.title}
                    user={currentUser}
                />
            )}
            <Grid
                container
                spacing={{ xs: 2, md: 3, lg: 4, xl: 5 }}
            >
                <RoleChecker roles={[["qr"]]}>
                    <HomeItem
                        url="/qrScanner"
                        title={langPage.actions.qr}
                        icon="qrScanner"
                    />
                </RoleChecker>
                {!!currentUser && (
                    <>
                        <HomeItem
                            onClick={showMyId}
                            title={langPage.actions.showId}
                            icon="id"
                        />
                        {checkFlagIncludes(currentUser?.role?.params?.users || 0, RolePermissionFlag.View) && (
                            <HomeItem
                                url="/persons"
                                title={langPage.actions.persons}
                                icon="group"
                            />
                        )}
                        <HomeItem
                            url="/profile"
                            title={langPage.actions.profile}
                            icon="person_pin"
                        />
                        <HomeItem
                            url="/myClaims"
                            title={langPage.actions.claims}
                            icon="claims"
                        />
                        <HomeItem
                            url="/myMessages"
                            title={langPage.actions.messages}
                            icon="sms"
                        />
                        <HomeItem
                            url="/sgp"
                            title={lang.pages.money.sgp.title}
                            icon="sgp"
                        />
                        <HomeItem
                            url="/myMedicalPolicies"
                            title={langPage.actions.medicalPolicies}
                            icon="medicalPolicies"
                        />
                        <HomeItem
                            url="/myTaxes"
                            title={langPage.actions.taxes}
                            icon="taxes"
                        />
                        <HomeItem
                            url="/myFines"
                            title={langPage.actions.fines}
                            icon="fines"
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
