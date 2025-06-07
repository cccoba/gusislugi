import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Icon } from "components";
import Licenses from "pages/Licenses";

import type { IPassportItem } from ".";

export default function PassportLicenses({ title, subTitle, userId, icon }: IPassportItem) {
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
                <Licenses userId={userId} />
            </AccordionDetails>
        </Accordion>
    );
}
