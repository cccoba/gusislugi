import { useState } from "react";

import lang from "lang";
import { Page } from "components";
import ProfileMessages from "pages/Messages/Messages";

const langPage = lang.pages.messages;

function MyMessages() {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Page
            title={langPage.title}
            isLoading={isLoading}
            icon="warning"
            backUrl="/"
        >
            <ProfileMessages />
        </Page>
    );
}
export default MyMessages;
