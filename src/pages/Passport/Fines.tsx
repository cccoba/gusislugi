import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Icon } from "components";

import Fines from "pages/Fines";

import { IPassportItem } from ".";

function PassportFines({ title, subTitle, userId }: IPassportItem) {
    return (
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionSummary expandIcon={<Icon name="down" />}>
                {title} ( {subTitle} )
            </AccordionSummary>
            <AccordionDetails>
                <Fines userId={userId} />
            </AccordionDetails>
        </Accordion>
    );
}
export default PassportFines;
