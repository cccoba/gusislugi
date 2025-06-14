import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Icon } from "components";
import Taxes from "pages/Taxes/Taxes";

import type { IPassportItem } from ".";

export default function PassportTaxes({ title, subTitle, userId, icon }: IPassportItem) {
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
                <Taxes userId={userId} />
            </AccordionDetails>
        </Accordion>
    );
}
