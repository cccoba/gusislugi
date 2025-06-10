import { isMobile } from "react-device-detect";

import lang from "lang";
import { Page } from "components";

import ProfileClaims from "./Claims";

export default function MyClaims() {
    const langPage = lang.pages.claims;
    return (
        <Page
            title={langPage.myTitle}
            icon="claims"
            backUrl="/"
        >
            <ProfileClaims />
        </Page>
    );
}
