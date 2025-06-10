import lang from "lang";
import { Page } from "components";

import { isMobile } from "react-device-detect";

import Taxes from "./Taxes";

export default function TaxesPage() {
    const langPage = lang.pages.taxes;
    return (
        <Page
            icon="taxes"
            title={langPage.title}
            backUrl={"/"}
            roles={[["taxes"]]}
        >
            <Taxes />
        </Page>
    );
}
