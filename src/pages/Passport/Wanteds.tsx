import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Icon } from "components";
import Wanteds from "pages/Wanteds/Wanteds";

import { IPassportItem } from ".";

function PassportWanteds({ title, subTitle, userId }: IPassportItem) {
    return (
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionSummary expandIcon={<Icon name="down" />}>
                {title} ( {subTitle} )
            </AccordionSummary>
            <AccordionDetails>
                <Wanteds userId={userId} />
            </AccordionDetails>
        </Accordion>
    );
}
export default PassportWanteds;
