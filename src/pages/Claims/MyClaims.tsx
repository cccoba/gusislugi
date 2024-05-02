import { useState } from "react";

import lang from "lang";
import { Page } from "components";
import ProfileClaims from "./Claims";

const langPage = lang.pages.claims;

function MyClaims() {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Page
            title={langPage.title}
            isLoading={isLoading}
            icon="claims"
            backUrl="/"
        >
            <ProfileClaims />
        </Page>
    );
}
export default MyClaims;
