import lang from "lang";
import { Page } from "components";
import ProfileMessages from "pages/Messages/Messages";

export default function MyMessages() {
    return (
        <Page
            title={lang.pages.messages.myTitle}
            icon="messages"
            backUrl="/"
        >
            <ProfileMessages />
        </Page>
    );
}
