import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import lang from "lang";
import { Alert, PageOrModal } from "components";

import { IPageOrModal } from "api/interfaces/components/Page/IPageOrModal";
import { passport, webApiResultData } from "api/data";
import { IPassportUser } from "api/interfaces/Passport/IPassportUser";
import { IUserDto } from "api/interfaces/user/IUserDto";

import PassportUser from "./User";
import PassportClaims from "./Claims";
import PassportTaxes from "./Taxes";
import PassportMedicalPolicies from "./MedicalPolicies";
import PassportWanteds from "./Wanteds";
import PassportWanteds2 from "./Wanteds2";
import PassportFines from "./Fines";
import PassportMedicalInfo from "./MedicalInfo";

const langPage = lang.pages.passport.byGuid;

interface IProps extends IPageOrModal {
    idName: "guid" | "telegramLogin";
    userGuid?: string;
}
export interface IPassportItem {
    title: string;
    subTitle: string;
    userId: number;
}

function Passport({ roles, icon, idName, modalProps, userGuid }: IProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<IPassportUser | null>(null);
    const { id = "" } = useParams();
    const { state } = useLocation();
    const [backUrl, setBackUrl] = useState("/");
    const [error, setError] = useState("");
    useEffect(() => {
        const newUserId = userGuid || id;
        if (!!newUserId) {
            const cb = idName === "telegramLogin" ? passport.getUserByTelegramLogin : passport.getUserByGuid;
            setIsLoading(true);
            cb(newUserId)
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
    }, [id, userGuid]);
    useEffect(() => {
        if (state?.backUrl) {
            setBackUrl(state.backUrl);
        }
    }, [state]);

    return (
        <PageOrModal
            title={langPage.title}
            isLoading={isLoading}
            roles={roles}
            icon={icon}
            backUrl={backUrl}
            modalProps={modalProps}
        >
            {!!error ? (
                <Alert
                    type="error"
                    text={error}
                />
            ) : !!userData ? (
                <>
                    <PassportUser
                        user={userData.user}
                        hideEdit={!!modalProps}
                    />
                    {typeof userData.claims !== "undefined" && (
                        <PassportClaims
                            subTitle={!!userData.claims ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.claims.title}
                            userId={userData.user.id}
                        />
                    )}
                    {typeof userData.taxes !== "undefined" && (
                        <PassportTaxes
                            subTitle={!!userData.taxes ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.taxes.title}
                            userId={userData.user.id}
                        />
                    )}
                    {typeof userData.fines !== "undefined" && (
                        <PassportFines
                            subTitle={!!userData.fines ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.fines.title}
                            userId={userData.user.id}
                        />
                    )}
                    {typeof userData.medicalInfo !== "undefined" && (
                        <PassportMedicalInfo
                            subTitle={!!userData.medicalInfo ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.medicalInfo.title}
                            userId={userData.user.id}
                        />
                    )}
                    {typeof userData.medicalPolicies !== "undefined" && (
                        <PassportMedicalPolicies
                            subTitle={!!userData.medicalPolicies ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.medicalPolicies.title}
                            userId={userData.user.id}
                        />
                    )}
                    {typeof userData.wanteds !== "undefined" && (
                        <PassportWanteds
                            subTitle={!!userData.wanteds ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.wanteds.title}
                            userId={userData.user.id}
                        />
                    )}
                    {typeof userData.wanteds2 !== "undefined" && (
                        <PassportWanteds2
                            subTitle={!!userData.wanteds2 ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.wanteds.title2}
                            userId={userData.user.id}
                        />
                    )}
                </>
            ) : null}
        </PageOrModal>
    );
}
export default Passport;
