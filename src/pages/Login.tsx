import { useState } from "react";
import lang from "lang";
import { Page } from "components";
const langPage = lang.pages.login;

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Page
            title={langPage.title}
            isLoading={isLoading}
        >
            login
        </Page>
    );
}
export default Login;
