import { useState } from "react";

import lang from "lang";
import { Page } from "components";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { money } from "api/data";
import useLoadApiData from "api/hooks/useLoadApiData";
import { IUserMoneyDto } from "api/interfaces/Money/IUserMoneyDto";

const langPage = lang.pages.money;

function MoneyUser({ roles, icon }: IPageWithRoles) {
    const [isLoading, setIsLoading] = useState(false);
    const { data, isLoading: initLoad, error, refetch } = useLoadApiData<IUserMoneyDto>(money.userData, []);
    return (
        <Page
            title={langPage.userTitle}
            isLoading={isLoading || initLoad}
            roles={roles}
            icon={icon}
        >
            111
        </Page>
    );
}
export default MoneyUser;
