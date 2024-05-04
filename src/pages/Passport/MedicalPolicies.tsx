import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Icon } from "components";

import MedicalPolicies from "pages/MedicalPolicies";

import { IPassportItem } from ".";

function PassportMedicalPolicies({ title, subTitle, user }: IPassportItem) {
    return (
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionSummary expandIcon={<Icon name="down" />}>
                {title} ( {subTitle} )
            </AccordionSummary>
            <AccordionDetails>
                <MedicalPolicies userId={user.id} />
            </AccordionDetails>
        </Accordion>
    );
}
export default PassportMedicalPolicies;
