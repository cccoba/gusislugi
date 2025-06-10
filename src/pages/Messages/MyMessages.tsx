import lang from "lang";
import { Page } from "components";
import ProfileMessages from "pages/Messages/Messages";
import { isMobile } from "react-device-detect";

export default function MyMessages() {
    return (
        <Page
            title={lang.pages.messages.myTitle}
            icon="messages"
            backUrl="/"
            scrollTopBottom={isMobile ? 72 : undefined}
        >
            <ProfileMessages />
        </Page>
    );
}
