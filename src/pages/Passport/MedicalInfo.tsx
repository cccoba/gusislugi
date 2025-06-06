import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Icon } from "components";
import MedicalInfo from "pages/MedicalInfo";

import type { IPassportItem } from ".";

function PassportMedicalInfo({ title, subTitle, userId, icon }: IPassportItem) {
    return (
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionSummary expandIcon={<Icon name="down" />}>
                <Icon
                    name={icon}
                    sx={{ mr: 1 }}
                />
                {title} ( {subTitle} )
            </AccordionSummary>
            <AccordionDetails>
                <MedicalInfo userId={userId} />
            </AccordionDetails>
        </Accordion>
    );
}
export default PassportMedicalInfo;
