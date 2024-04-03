import { useMemo, useState } from "react";
import lang from "lang";
import { Icon, Link, Page, RoleChecker } from "components";
import { UserRolesEnum } from "api/enums/UserRolesEnum";
import { Card, CardActionArea, CardHeader, Grid } from "@mui/material";
const langPage = lang.pages.home;

function Home() {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Page
            title={langPage.title}
            isLoading={isLoading}
        >
            <Grid
                container
                spacing={{ xs: 2, md: 3, lg: 4, xl: 5 }}
            >
                <RoleChecker roles={[UserRolesEnum.Qr]}>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        xl={4}
                    >
                        <Link url="/qrScanner">
                            <Card raised>
                                <CardActionArea>
                                    <CardHeader
                                        avatar={<Icon name="qr_code_scanner" />}
                                        title={langPage.actions.qr}
                                    />
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                </RoleChecker>
            </Grid>
        </Page>
    );
}
export default Home;
