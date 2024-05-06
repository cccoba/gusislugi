import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Icon } from "components";
import Wanteds2 from "pages/Wanteds/Wanteds2";

import { IPassportItem } from ".";

function PassportWanteds2({ title, subTitle, userId }: IPassportItem) {
    return (
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionSummary expandIcon={<Icon name="down" />}>
                {title} ( {subTitle} )
            </AccordionSummary>
            <AccordionDetails>
                <Wanteds2 userId={userId} />
            </AccordionDetails>
        </Accordion>
    );
}
export default PassportWanteds2;
