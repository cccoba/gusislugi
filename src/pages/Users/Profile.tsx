import { useState } from "react";

import lang from "lang";
import { Page } from "components";
import { useAppSelector } from "api/hooks/redux";
import UserInfo from "components/UserInfo";

const langPage = lang.pages.profile;

function Profile() {
    const [isLoading, setIsLoading] = useState(false);
    const user = useAppSelector((x) => x.user.user);
    return (
        <Page
            title={langPage.title}
            isLoading={isLoading}
            icon="person_pin"
        >
            {!!user && (
                <UserInfo
                    user={user}
                    isCurrent
                />
            )}
        </Page>
    );
}
export default Profile;
