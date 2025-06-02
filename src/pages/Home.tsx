import { useState } from "react";
import { Card, CardActionArea, CardHeader, Grid } from "@mui/material";

import { Fieldset, Icon, Link, Page, RoleChecker } from "components";
import QrUserData from "components/QrPrint/QrUserData";
import type { TIconName } from "components/Icon";
import lang from "lang";

import { checkFlagIncludes } from "api/common/enumHelper";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";
import { useAppSelector } from "api/hooks/redux";

interface IHomeItem {
    title: string;
    icon: TIconName;
    url?: string;
    onClick?: () => void;
}

export default function Home() {
    const langPage = lang.pages.home;
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
            <Fieldset label={langPage.main}>
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
                    <HomeItem
                        onClick={showMyId}
                        title={langPage.actions.showId}
                        icon="id"
                    />
                    {checkFlagIncludes(currentUser?.role?.params?.users || 0, RolePermissionFlag.View) && (
                        <HomeItem
                            url="/persons"
                            title={langPage.actions.persons}
                            icon="users"
                        />
                    )}
                    {checkFlagIncludes(currentUser?.role?.params?.admins || 0, RolePermissionFlag.View) && (
                        <HomeItem
                            url="/users"
                            title={lang.pages.users.title}
                            icon="users"
                        />
                    )}
                    <HomeItem
                        url="/profile"
                        title={langPage.actions.profile}
                        icon="profile"
                    />
                    <HomeItem
                        url="/links"
                        title={lang.pages.links.title}
                        icon="links"
                    />
                </Grid>
            </Fieldset>
            <Fieldset label={langPage.services}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3, lg: 4, xl: 5 }}
                >
                    <HomeItem
                        url="/myMessages"
                        title={langPage.actions.messages}
                        icon="messages"
                    />
                    <HomeItem
                        url="/myClaims"
                        title={langPage.actions.claims}
                        icon="claims"
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
                    <HomeItem
                        url="/my/companies"
                        title={langPage.actions.companies}
                        icon="company"
                    />
                </Grid>
            </Fieldset>
        </Page>
    );
}
export function HomeItem({ url, title, icon, onClick }: IHomeItem) {
    return (
        <Grid
            item
            xs={12}
            sm={6}
            xl={4}
        >
            {url ? (
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
