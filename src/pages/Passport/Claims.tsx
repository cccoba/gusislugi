import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Icon } from "components";

import Claims from "pages/Claims";

import { IPassportItem } from ".";

function PassportClaims({ title, subTitle, userId }: IPassportItem) {
    return (
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionSummary expandIcon={<Icon name="down" />}>
                {title} ( {subTitle} )
            </AccordionSummary>
            <AccordionDetails>
                <Claims userId={userId} />
            </AccordionDetails>
        </Accordion>
    );
}
export default PassportClaims;
