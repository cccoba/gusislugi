import { useEffect, useState } from "react";

import lang from "lang";
import { Alert, Page } from "components";
import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { useParams } from "react-router-dom";
import { passport, webApiResultData } from "api/data";
import { IPassportUser } from "api/interfaces/Passport/IPassportUser";
import PassportUser from "./User";
import PassportClaims from "./Claims";

const langPage = lang.pages.passport.byGuid;

interface IProps extends IPageWithRoles {
    idName: "guid" | "telegramLogin";
}

function Passport({ roles, icon, idName }: IProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<IPassportUser | null>(null);

    const { id = "" } = useParams();
    const [error, setError] = useState("");
    useEffect(() => {
        if (!!id) {
            const cb = idName === "telegramLogin" ? passport.getUserByTelegramLogin : passport.getUserByGuid;
            setIsLoading(true);
            cb(id)
                .then((res) => {
                    const { error, result } = webApiResultData<IPassportUser>(res);
                    if (error) {
                        throw error;
                    }
                    if (result) {
                        setUser(result);
                    }
                })
                .catch((err) => {
                    setError(err?.name === "webApiResultError" ? err.message : langPage.errors.getUserByGuid);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [id]);

    return (
        <Page
            title={langPage.title}
            isLoading={isLoading}
            roles={roles}
            icon={icon}
            backUrl={"/"}
        >
            {!!error ? (
                <Alert
                    type="error"
                    text={error}
                />
            ) : !!user ? (
                <>
                    <PassportUser user={user.user} />
                    {typeof user.claims !== "undefined" && <PassportClaims claims={user.claims} />}
                </>
            ) : null}
        </Page>
    );
}
export default Passport;
