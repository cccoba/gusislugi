import { useState } from "react";
import lang from "lang";
import { Page } from "components";
const langPage = lang.pages.home;

function Home() {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Page
            title={langPage.title}
            isLoading={isLoading}
        >
            home
        </Page>
    );
}
export default Home;
