import lang from "lang";
import { Page } from "components";

import Taxes from "./Taxes";

export default function TaxesPage() {
    const langPage = lang.pages.taxes;
    return (
        <Page
            icon="taxes"
            title={langPage.title}
            roles={[["taxes"]]}
        >
            <Taxes />
        </Page>
    );
}
