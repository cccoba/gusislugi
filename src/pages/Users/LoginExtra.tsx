import { useState } from "react";

import lang from "lang";
import { Alert, Form, Page } from "components";
import { useAppSelector } from "api/hooks/redux";
import getConst from "api/common/getConst";
import { setCookie } from "api/common/cookie";

export default function LoginExtra() {
    const langPage = lang.pages.login.extra;
    const [isLoading, setIsLoading] = useState(false);
    const withTelegram = useAppSelector((s) => s.components.withTelegram);
    const toExtraLogin = ({ code }: any) => {
        if (code) {
            if (getConst("env-mode") === "development") {
                window.localStorage.setItem(getConst("auth-token-name"), code);
            } else {
                setCookie(getConst("auth-token-name"), code);
            }
            window.location.href = "/";
        }
    };
    return (
        <Page
            title={langPage.title}
            isLoading={isLoading}
        >
            {withTelegram ? (
                <Alert text={langPage.webOnly} />
            ) : (
                <Form
                    values={{
                        code: "",
                    }}
                    fields={[{ name: "code", title: langPage.code, type: "text", required: true }]}
                    onSubmit={toExtraLogin}
                    submitBtnType="save"
                />
            )}
        </Page>
    );
}
