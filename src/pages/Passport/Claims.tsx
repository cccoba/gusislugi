import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Icon } from "components";

import Claims from "pages/Claims";

import type { IPassportItem } from ".";

function PassportClaims({ title, subTitle, userId, icon }: IPassportItem) {
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
                <Claims userId={userId} />
            </AccordionDetails>
        </Accordion>
    );
}
export default PassportClaims;
