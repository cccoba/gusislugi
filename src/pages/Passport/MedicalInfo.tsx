import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Icon } from "components";
import MedicalInfo from "pages/MedicalInfo";

import { IPassportItem } from ".";

function PassportMedicalInfo({ title, subTitle, userId }: IPassportItem) {
    return (
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionSummary expandIcon={<Icon name="down" />}>
                {title} ( {subTitle} )
            </AccordionSummary>
            <AccordionDetails>
                <MedicalInfo userId={userId} />
            </AccordionDetails>
        </Accordion>
    );
}
export default PassportMedicalInfo;
