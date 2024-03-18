import { useState } from "react";

import lang from "lang";
import { Page } from "components";
import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";

const langPage = lang.pages.claims;

function Claims({ roles }: IPageWithRoles) {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Page
            title={langPage.title}
            icon="warning"
            isLoading={isLoading}
            roles={roles}
        >
            111
        </Page>
    );
}
export default Claims;
