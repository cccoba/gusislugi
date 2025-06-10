import { useEffect, useState } from "react";

import lang from "lang";
import { Alert, Form, Page } from "components";
import { useAppSelector } from "api/hooks/redux";
import getConst from "api/common/getConst";
import { setCookie } from "api/common/cookie";
import { useNavigate } from "react-router-dom";

export default function LoginExtra() {
    const langPage = lang.pages.login.extra;
    const withTelegram = useAppSelector((s) => s.components.withTelegram);
    const userId = useAppSelector((s) => s.user.user?.id);
    const navigate = useNavigate();
    const toExtraLogin = ({ code }: any) => {
        if (code) {
            if (getConst("env-mode") === "development") {
                window.localStorage.setItem(getConst("auth-token-name"), code);
            } else {
                setCookie(getConst("auth-token-name"), code);
            }
            setTimeout(() => {
                window.location.reload();
            }, 300);
        }
    };
    useEffect(() => {
        if (userId) {
            navigate("/");
        }
    }, [userId]);
    return (
        <Page title={langPage.title}>
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
