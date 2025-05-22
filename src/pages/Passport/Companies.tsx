import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Icon } from "components";
import Companies from "pages/Companies/Index";

import { IPassportItem } from ".";

export default function PassportCompanies({ title, subTitle, userId }: IPassportItem) {
    return (
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionSummary expandIcon={<Icon name="down" />}>
                {title} ( {subTitle} )
            </AccordionSummary>
            <AccordionDetails>
                <Companies userId={userId} />
            </AccordionDetails>
        </Accordion>
    );
}
