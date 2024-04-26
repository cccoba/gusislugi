import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import lang from "lang";
import { Alert, Page } from "components";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { passport, webApiResultData } from "api/data";
import { IPassportUser } from "api/interfaces/Passport/IPassportUser";
import { IUserDto } from "api/interfaces/user/IUserDto";

import PassportUser from "./User";
import PassportClaims from "./Claims";
import PassportTaxes from "./Taxes";
import PassportMedicalPolicies from "./MedicalPolicies";
import PassportWanteds from "./Wanteds";

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
                    {typeof userData.taxes !== "undefined" && (
                        <PassportTaxes
                            subTitle={!!userData.taxes ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.taxes.title}
                            user={userData.user}
                        />
                    )}
                    {typeof userData.medicalPolicies !== "undefined" && (
                        <PassportMedicalPolicies
                            subTitle={!!userData.medicalPolicies ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.medicalPolicies.title}
                            user={userData.user}
                        />
                    )}
                    {typeof userData.wanteds !== "undefined" && (
                        <PassportWanteds
                            subTitle={!!userData.wanteds ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.wanteds.title}
                            user={userData.user}
                        />
                    )}
                </>
            ) : null}
        </Page>
    );
}
export default Passport;
