import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import lang from "lang";
import { Alert, PageOrModal } from "components";

import type { IPageOrModal } from "api/interfaces/components/Page/IPageOrModal";
import { passport, webApiResultData } from "api/data";
import type { IPassportUser } from "api/interfaces/Passport/IPassportUser";

import type { TIconName } from "components/Icon";

import PassportUser from "./User";
import PassportClaims from "./Claims";
import PassportTaxes from "./Taxes";
import PassportMedicalPolicies from "./MedicalPolicies";
import PassportWanteds from "./Wanteds";
import PassportCompanies from "./Companies";
import PassportMedicalInfo from "./MedicalInfo";
import PassportLicenses from "./Licenses";
import PassportWeapons from "./Weapons";

interface IProps extends IPageOrModal {
    idName: "guid" | "telegramLogin";
    userGuid?: string;
}
export interface IPassportItem {
    title: string;
    subTitle: string;
    userId: number;
    icon: TIconName;
}

export default function Passport({ roles, icon, idName, modalProps, userGuid }: IProps) {
    const langPage = lang.pages.passport.byGuid;
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<IPassportUser | null>(null);
    const { id = "" } = useParams();
    const { state } = useLocation();
    const [backUrl, setBackUrl] = useState("/");
    const [error, setError] = useState("");
    useEffect(() => {
        loadData();
    }, [id, userGuid]);
    useEffect(() => {
        if (state?.backUrl) {
            setBackUrl(state.backUrl);
        }
    }, [state]);
    function loadData() {
        const newUserId = userGuid || id;
        if (newUserId) {
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
    }

    return (
        <PageOrModal
            title={langPage.title}
            isLoading={isLoading}
            roles={roles}
            icon={icon}
            backUrl={backUrl}
            modalProps={modalProps}
        >
            {error ? (
                <Alert
                    type="error"
                    text={error}
                />
            ) : userData ? (
                <>
                    <PassportUser
                        user={userData.user}
                        hideEdit={!!modalProps}
                    />
                    {typeof userData.claims !== "undefined" && (
                        <PassportClaims
                            subTitle={userData.claims ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.claims.title}
                            userId={userData.user.id}
                            icon="claims"
                        />
                    )}
                    {typeof userData.taxes !== "undefined" && (
                        <PassportTaxes
                            subTitle={userData.taxes ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.taxes.title}
                            userId={userData.user.id}
                            icon="taxes"
                        />
                    )}
                    {typeof userData.medicalInfo !== "undefined" && (
                        <PassportMedicalInfo
                            subTitle={userData.medicalInfo ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.medicalInfo.title}
                            userId={userData.user.id}
                            icon="medicalInfo"
                        />
                    )}
                    {typeof userData.medicalPolicies !== "undefined" && (
                        <PassportMedicalPolicies
                            subTitle={userData.medicalPolicies ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.medicalPolicies.title}
                            userId={userData.user.id}
                            icon="medicalPolicies"
                        />
                    )}
                    {typeof userData.wanteds !== "undefined" && (
                        <PassportWanteds
                            subTitle={userData.wanteds ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.wanteds.title}
                            userId={userData.user.id}
                            type={1}
                            icon="wanteds"
                        />
                    )}
                    {typeof userData.wanteds2 !== "undefined" && (
                        <PassportWanteds
                            subTitle={userData.wanteds2 ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.wanteds2.title}
                            userId={userData.user.id}
                            type={2}
                            icon="wanteds2"
                        />
                    )}
                    {typeof userData.wanteds3 !== "undefined" && (
                        <PassportWanteds
                            subTitle={userData.wanteds3 ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.wanteds3.title}
                            userId={userData.user.id}
                            type={3}
                            icon="wanteds3"
                        />
                    )}
                    {typeof userData.companies !== "undefined" && (
                        <PassportCompanies
                            subTitle={userData.companies ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.companies.title}
                            userId={userData.user.id}
                            icon="company"
                        />
                    )}
                    {typeof userData.licenses !== "undefined" && (
                        <PassportLicenses
                            subTitle={userData.licenses ? langPage.haveData : langPage.notHaveData}
                            title={lang.pages.licenses.title}
                            userId={userData.user.id}
                            icon="licenses"
                        />
                    )}
                    {typeof userData.weapons !== "undefined" && (
                        <PassportWeapons
                            user={userData.user}
                            weaponPoints={userData.weapons.weaponPoints}
                            data={userData.weapons.history}
                            onUpdate={() => loadData()}
                        />
                    )}
                </>
            ) : null}
        </PageOrModal>
    );
}
