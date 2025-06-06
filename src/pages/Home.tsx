import { useState } from "react";
import { Card, CardActionArea, CardHeader, Grid } from "@mui/material";

import { Icon, Link, Page, RoleChecker } from "components";
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
                    title={langPage.myId}
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
                        title={langPage.qr}
                        icon="qrScanner"
                    />
                </RoleChecker>
                <HomeItem
                    onClick={showMyId}
                    title={langPage.showId}
                    icon="id"
                />
                {checkFlagIncludes(currentUser?.role?.params?.users || 0, RolePermissionFlag.View) && (
                    <HomeItem
                        url="/persons"
                        title={lang.pages.users.persons}
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
                    title={lang.pages.profile.title}
                    icon="profile"
                />
                {/*<HomeItem
                    url="/links"
                    title={lang.pages.links.title}
                    icon="links"
                />*/}
                <HomeItem
                    url="/my/messages"
                    title={lang.pages.messages.title}
                    icon="messages"
                />
                <HomeItem
                    url="/my/secrets"
                    title={lang.pages.secrets.myTitle}
                    icon="secrets"
                />
                <HomeItem
                    url="/my/claims"
                    title={lang.pages.claims.myTitle}
                    icon="claims"
                />
                <HomeItem
                    url="/my/medicalPolicies"
                    title={lang.pages.medicalPolicies.myTitle}
                    icon="medicalPolicies"
                />
                <HomeItem
                    url="/my/taxes"
                    title={lang.pages.taxes.myTitle}
                    icon="taxes"
                />
                <HomeItem
                    url="/my/wanteds2"
                    title={lang.pages.wanteds2.myTitle}
                    icon="wanteds2"
                />
                {/*<HomeItem
                    url="/myFines"
                    title={lang.pages.fines.title}
                    icon="fines"
                />*/}
                <HomeItem
                    url="/my/companies"
                    title={lang.pages.companies.myTitle}
                    icon="company"
                />
                <HomeItem
                    url="/my/licenses"
                    title={lang.pages.licenses.myTitle}
                    icon="licenses"
                />
            </Grid>
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
