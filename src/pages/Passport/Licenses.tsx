import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Icon } from "components";
import Licenses from "pages/Licenses";

import type { IPassportItem } from ".";

export default function PassportLicenses({ title, subTitle, userId }: IPassportItem) {
    return (
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionSummary expandIcon={<Icon name="down" />}>
                {title} ( {subTitle} )
            </AccordionSummary>
            <AccordionDetails>
                <Licenses userId={userId} />
            </AccordionDetails>
        </Accordion>
    );
}
