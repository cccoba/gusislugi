import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Icon } from "components";
import Companies from "pages/Companies/Index";

import type { IPassportItem } from ".";

export default function PassportCompanies({ title, subTitle, userId, icon }: IPassportItem) {
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
                <Companies userId={userId} />
            </AccordionDetails>
        </Accordion>
    );
}
