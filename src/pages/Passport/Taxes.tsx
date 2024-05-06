import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Icon } from "components";
import Taxes from "pages/Taxes";

import { IPassportItem } from ".";

function PassportTaxes({ title, subTitle, userId }: IPassportItem) {
    return (
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionSummary expandIcon={<Icon name="down" />}>
                {title} ( {subTitle} )
            </AccordionSummary>
            <AccordionDetails>
                <Taxes userId={userId} />
            </AccordionDetails>
        </Accordion>
    );
}
export default PassportTaxes;
