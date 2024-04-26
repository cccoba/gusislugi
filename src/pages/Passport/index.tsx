import { useEffect, useState } from "react";

import lang, { getEnumSelectValues } from "lang";
import { Alert, Page } from "components";
import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { useParams } from "react-router-dom";
import { passport, webApiResultData } from "api/data";
import { IPassportUser } from "api/interfaces/Passport/IPassportUser";
import PassportUser from "./User";
import PassportClaims from "./Claims";
import { useAppSelector } from "api/hooks/redux";
import { ClaimStatusEnum } from "api/enums/ClaimStatusEnum";
import { IUserDto } from "api/interfaces/user/IUserDto";

const langPage = lang.pages.passport.byGuid;

interface IProps extends IPageWithRoles {
    idName: "guid" | "telegramLogin";
}
export interface IPassportItem {
    title: string;
    subTitle: string;
    user: IUserDto;
}

function Passport({ roles, icon, idName }: IProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<IPassportUser | null>(null);
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
                        setUserData(result);
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
            ) : !!userData ? (
                <>
                    <PassportUser user={userData.user} />
                    {typeof userData.claims !== "undefined" && (
                        <PassportClaims
                            subTitle={!!userData.claims ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.claims.title}
                            user={userData.user}
                        />
                    )}
                </>
            ) : null}
        </Page>
    );
}
export default Passport;
